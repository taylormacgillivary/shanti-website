import { randomUUID } from "node:crypto";
import { RetentionApi } from "./api";
import { assess, emailHash, RetentionError, SALE } from "./rules";
import { applyPlan, planMember, type Plan } from "./sync";
import { choose, reconcile, validateState, type Candidate, type DeliveryRecord, type DeliveryState } from "./delivery-policy";
import type { Ledger } from "./delivery-ledger";
import type { DeliveryGateway, DeliveryMode } from "./delivery-mailchimp";

export interface DeliverySummary {
  mode: DeliveryMode; snapshotAt: string; ledgerReady: boolean; approvedCopyVerified: boolean;
  considered: number; due: number; acceptedTriggers: number; confirmedReceipts: number;
  held: Record<string, number>; failures: number; failureStages: Record<string, number>;
}
export async function deliverOne(plan: Plan, api: RetentionApi, ledger: Ledger, gateway: DeliveryGateway,
  mode: DeliveryMode, now: Date, clock: () => Date = () => new Date()): Promise<{ reason: string; candidate?: Candidate; accepted?: boolean; confirmed?: number }> {
  const a = plan.assessment;
  if (!a?.membershipEligible || !a.start) return { reason: "ineligible" };
  if (!/^[a-f0-9]{32}$/.test(plan.member.id)) throw new RetentionError("delivery_member_identity");
  const empty: DeliveryState = { version: 1, memberId: plan.member.id, start: a.start, records: [] };
  let stored = await ledger.read(plan.key, empty);
  validateState(stored.state, plan.member.id, a.start);
  const receipts = await gateway.receipts(plan.member);
  let state = reconcile(stored.state, receipts, now);
  const confirmed = state.records.filter(r => r.status === "confirmed").length
    - stored.state.records.filter(r => r.status === "confirmed").length;
  if (mode === "live" && confirmed) {
    const etag = await ledger.save(plan.key, state, stored.etag);
    if (!etag) return { reason: "concurrent_worker" };
    stored = { state, etag };
  }
  const selected = choose(plan, state, receipts, now);
  if (mode === "preview" || !selected.candidate) return { ...selected, confirmed };
  const candidate = selected.candidate;
  const claim: DeliveryRecord = { ...candidate, claimId: randomUUID(), claimedAt: clock().toISOString(), status: "claimed" };
  state = { ...state, records: [...state.records.filter(r => !(r.status === "aborted"
    && r.message === candidate.message && r.episode === candidate.episode)), claim] };
  let etag = await ledger.save(plan.key, state, stored.etag);
  if (!etag) return { reason: "concurrent_worker" };
  const finish = async (status: DeliveryRecord["status"]) => {
    claim.status = status;
    const saved = await ledger.save(plan.key, state, etag);
    if (!saved) throw new RetentionError("claim_update_conflict");
    etag = saved;
  };
  try {
    // Recheck the actual Mindbody state after any wait/claim. This includes
    // new bookings, attendance, termination and the manually recorded hold tag.
    if (!plan.source) throw new RetentionError("delivery_source_missing");
    const instant = clock();
    const member = await api.member(plan.member.email_address);
    if (!member || member.id !== plan.member.id) { await finish("aborted"); return { reason: "contact_changed" }; }
    const client = (await api.clients([plan.source.purchase])).get(plan.source.purchase.uniqueId);
    if (!client || client.Id !== plan.source.client.Id || !client.Email || emailHash(client.Email) !== member.id) {
      await finish("aborted"); return { reason: "client_changed" };
    }
    const fresh = { ...planMember(plan.source.purchase, member,
      assess(await api.snapshot(plan.source.purchase, client), instant), instant), source: { ...plan.source, client } };
    // Ignore our own unattempted claim while deciding whether the original
    // candidate is still due; all prior actual sends still apply.
    const checked = choose(fresh, { ...state, records: state.records.filter(r => r.claimId !== claim.claimId) }, receipts, instant);
    if (!checked.candidate || checked.candidate.message !== candidate.message || checked.candidate.episode !== candidate.episode) {
      await finish("aborted"); return { reason: "state_changed_before_trigger" };
    }
    if (candidate.message.startsWith("support-")) fresh.fields.SRSTAGE = candidate.message;
    if (candidate.message === "attendance-first-class" || candidate.message === "attendance-return") fresh.fields.SRREASON = candidate.message;
    await applyPlan(api, fresh);
    const ready = await api.member(member.email_address);
    const isSupport = candidate.message.startsWith("support-");
    if (!ready || ready.status !== "subscribed" || ready.tags.some(t => t.name === SALE.manualHoldTag)
      || !ready.tags.some(t => t.name === SALE.tags.eligible)
      || (isSupport && ready.merge_fields.SRSTAGE !== candidate.message)
      || (!isSupport && candidate.message !== "attendance-celebration" && ready.merge_fields.SRREASON !== candidate.message)) {
      await finish("aborted"); return { reason: "routing_changed_before_trigger" };
    }
    // Persist the uncertain state BEFORE crossing the non-idempotent boundary.
    // A crash or HTTP timeout can never cause an automatic repeat.
    await finish("uncertain");
    await gateway.trigger(candidate.message, ready);
    try { await finish("accepted"); }
    catch { return { reason: "accepted_ledger_review", candidate, accepted: true, confirmed }; }
    return { reason: "accepted_waiting_for_sent_receipt", candidate, accepted: true, confirmed };
  } catch (error) {
    // A pre-trigger crash may also leave a claim for review. Do not infer
    // non-delivery from missing history or automatically clear a stuck claim.
    throw error;
  }
}
export async function dispatch(plans: Plan[], api: RetentionApi, ledger: Ledger, gateway: DeliveryGateway,
  mode: DeliveryMode, now: Date): Promise<DeliverySummary> {
  const result: DeliverySummary = { mode, snapshotAt: now.toISOString(), ledgerReady: false, approvedCopyVerified: false,
    considered: 0, due: 0, acceptedTriggers: 0, confirmedReceipts: 0, held: {}, failures: 0, failureStages: {} };
  await ledger.probe(); result.ledgerReady = true;
  await gateway.preflight(); result.approvedCopyVerified = true;
  const deadline = Date.now() + 210000;
  let index = 0;
  await Promise.all(Array.from({ length: Math.min(4, plans.length) }, async () => {
    while (index < plans.length) {
      if (Date.now() > deadline) {
        result.held.budget_deferred = (result.held.budget_deferred || 0) + plans.length - index;
        index = plans.length; return;
      }
      const plan = plans[index++];
      result.considered++;
      try {
        const item = await deliverOne(plan, api, ledger, gateway, mode, now);
        if (item.candidate) result.due++;
        if (item.accepted) result.acceptedTriggers++;
        result.confirmedReceipts += item.confirmed || 0;
        result.held[item.reason] = (result.held[item.reason] || 0) + 1;
        if (item.reason === "pending_delivery_review" || item.reason === "accepted_ledger_review") {
          result.failures++;
          result.failureStages[item.reason] = (result.failureStages[item.reason] || 0) + 1;
        }
      } catch (error) {
        result.failures++;
        const stage = error instanceof RetentionError ? error.stage : "delivery_provider_failure";
        result.failureStages[stage] = (result.failureStages[stage] || 0) + 1;
      }
    }
  }));
  return result;
}
