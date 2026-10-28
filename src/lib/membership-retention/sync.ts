import { RetentionApi, type Member, type RetentionConfig } from "./api";
import { assess, emailHash, localTime, mergeDate, privateKey, RetentionError, SALE, type Assessment, type Purchase } from "./rules";

export interface Plan {
  key: string; member: Member; fields: Record<string, string | number>;
  tags: Record<string, boolean>; assessment?: Assessment;
}
export function planMember(purchase: Purchase, member: Member, assessment: Assessment | undefined, now: Date, hold?: string): Plan {
  const status = hold || (member.status !== "subscribed" ? `mailchimp-${member.status}` : assessment?.status || "data-review");
  const eligible = !hold && member.status === "subscribed" && assessment?.membershipEligible === true;
  const fields: Plan["fields"] = { SRSTATUS: status, SRREASON: "", SRBILLAMT: "", SRBILLDAY: "" };
  if (assessment) {
    fields.SRSTART = mergeDate(assessment.start);
    fields.SRLAST = mergeDate(assessment.last);
    fields.SRNEXT = mergeDate(assessment.next);
    fields.SRVIS21 = assessment.visits21;
    fields.SRSYNC = now.toISOString();
  }
  // Initial cohort always starts with welcome; this sync NEVER advances a send stage.
  // Delivery-aware stage advancement belongs to the separately gated dispatcher.
  if (eligible && !member.merge_fields.SRSTAGE) fields.SRSTAGE = "support-01";
  if (eligible) fields.SRREASON = assessment!.first ? "attendance-first-class" : assessment!.returning ? "attendance-return" : "";
  const earned = member.tags.some(t => t.name === SALE.tags.milestone) || assessment?.milestone === true;
  return { key: privateKey(purchase.uniqueId), member, fields, assessment,
    tags: { [SALE.tags.cohort]: true, [SALE.tags.eligible]: eligible,
      [SALE.tags.first]: eligible && assessment!.first, [SALE.tags.returning]: eligible && assessment!.returning,
      [SALE.tags.milestone]: earned } };
}
export interface SyncSummary {
  mode: "read-only" | "tags"; snapshotAt: string; emailsSent: 0;
  purchases: number; paidPurchases: number; uniqueClients: number; regular: number; studentSenior: number;
  matched: number; missingEmail: number; missingMailchimp: number; missingMindbody: number;
  sharedEmails: number; subscribed: number; eligible: number; firstClass: number; returnCheckIn: number;
  milestones: number; staffReview: number; billingReview: number; staleCohort: number;
  upcomingBookings: number; visits21Distribution: Record<string, number>;
  planned: number; applied: number; failed: number; statuses: Record<string, number>;
  failureStages: Record<string, number>; paginationRechecks: number;
  calls: { mindbody: number; mailchimp: number; writes: number };
}
async function each<T>(items: T[], worker: (item: T) => Promise<void>, concurrency = 4) {
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (next < items.length) await worker(items[next++]);
  }));
}
export async function applyPlan(api: RetentionApi, plan: Plan): Promise<void> {
  const path = `lists/${SALE.audienceId}/members/${plan.member.id}`;
  // Re-read opt-in immediately before writes. Status is never changed by this connector.
  const current = await api.member(plan.member.email_address);
  if (!current || current.id !== plan.member.id) throw new RetentionError("contact_changed");
  if (String(current.merge_fields.SRSYNC || "") > api.now.toISOString()) throw new RetentionError("newer_snapshot_exists");
  const tags = { ...plan.tags }, fields = { ...plan.fields };
  if (current.status !== "subscribed") {
    tags[SALE.tags.eligible] = false; tags[SALE.tags.first] = false; tags[SALE.tags.returning] = false;
    fields.SRREASON = ""; fields.SRSTATUS = `mailchimp-${current.status}`;
    delete fields.SRSTAGE;
  }
  // Remove eligibility before updating fields. An interrupted sync cannot leave a
  // half-written contact eligible. All tag writes suppress tag-based automations.
  await api.mc(path + "/tags", "POST", { is_syncing: true,
    tags: [{ name: SALE.tags.eligible, status: "inactive" }] });
  const changed = Object.fromEntries(Object.entries(fields).filter(([k, v]) => String(current.merge_fields[k] ?? "") !== String(v)));
  if (Object.keys(changed).length) await api.mc(path, "PATCH", { merge_fields: changed });
  await api.mc(path + "/tags", "POST", { is_syncing: true,
    tags: Object.entries(tags).map(([name, active]) => ({ name, status: active ? "active" : "inactive" })) });
}
export async function syncRetention(config: RetentionConfig, apply = false, now = new Date(), suppliedApi?: RetentionApi,
  beforeApply?: (plans: Plan[]) => Promise<void>): Promise<SyncSummary> {
  if (apply && config.mode !== "tags") throw new RetentionError("apply_requires_tags_mode");
  const api = suppliedApi || new RetentionApi(config, now);
  const result: SyncSummary = { mode: apply ? "tags" : "read-only", snapshotAt: now.toISOString(), emailsSent: 0,
    purchases: 0, paidPurchases: 0, uniqueClients: 0, regular: 0, studentSenior: 0, matched: 0,
    missingEmail: 0, missingMailchimp: 0, missingMindbody: 0, sharedEmails: 0, subscribed: 0,
    eligible: 0, firstClass: 0, returnCheckIn: 0, milestones: 0, staffReview: 0, billingReview: 0,
    staleCohort: 0, planned: 0, applied: 0, failed: 0, statuses: {}, failureStages: {}, paginationRechecks: 0,
    upcomingBookings: 0, visits21Distribution: {}, calls: api.calls };
  const failed = (error: unknown) => {
    result.failed++;
    const stage = error instanceof RetentionError ? `${error.stage}${error.status ? `_${error.status}` : ""}` : "unexpected_failure";
    result.failureStages[stage] = (result.failureStages[stage] || 0) + 1;
  };
  if (localTime(now).slice(0, 10) < SALE.firstDay) throw new RetentionError("cohort_not_open");
  await api.verifyFields();
  await api.login();
  // Complete the shared cohort and identity reads BEFORE making any writes.
  const purchases = await api.purchases();
  if (!purchases.length) throw new RetentionError("empty_cohort_review");
  const clients = await api.clients(purchases);
  const previous = await api.previousMembers();
  result.purchases = purchases.length;
  result.paidPurchases = purchases.filter(p => p.paid).length;
  result.regular = purchases.filter(p => p.paid && p.product === "1591").length;
  result.studentSenior = purchases.filter(p => p.paid && p.product === "1592").length;
  const grouped = new Map<string, Purchase[]>();
  for (const p of purchases) grouped.set(p.uniqueId, [...(grouped.get(p.uniqueId) || []), p]);
  result.uniqueClients = grouped.size;
  const emailCounts = new Map<string, number>();
  for (const uid of grouped.keys()) {
    const email = clients.get(uid)?.Email?.trim().toLowerCase();
    if (email) emailCounts.set(email, (emailCounts.get(email) || 0) + 1);
  }
  const plans: Plan[] = [], seenMembers = new Set<string>();
  await each([...grouped.values()], async group => {
    const paid = group.filter(p => p.paid);
    const selected = paid[0] || group[0];
    const p = { ...selected, ambiguous: paid.length > 1 || selected.ambiguous };
    const client = clients.get(p.uniqueId);
    if (!client) { result.missingMindbody++; return; }
    const email = client.Email?.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { result.missingEmail++; return; }
    try {
      const member = await api.member(email);
      if (!member) { result.missingMailchimp++; return; }
      // Multiple people sharing an address must not receive personalized membership notices.
      if (emailCounts.get(email)! > 1) {
        result.sharedEmails++;
        if (!seenMembers.has(member.id)) plans.push(planMember(p, member, undefined, now, "shared-email-review"));
        seenMembers.add(member.id); return;
      }
      seenMembers.add(member.id); result.matched++;
      if (member.status !== "subscribed") {
        // Archived contacts stay archived and untouched; no attempt to restore them.
        if (member.status === "archived") result.statuses["mailchimp-archived"] = (result.statuses["mailchimp-archived"] || 0) + 1;
        else plans.push(planMember(p, member, undefined, now));
        return;
      }
      result.subscribed++;
      if (!p.paid || p.ambiguous || !client.Active) {
        plans.push(planMember(p, member, undefined, now, !p.paid ? "refunded" : p.ambiguous ? "multiple-contracts-review" : "client-inactive"));
        return;
      }
      try {
        const assessment = assess(await api.snapshot(p, client), now);
        plans.push(planMember(p, member, assessment, now));
      } catch (error) {
        failed(error);
        plans.push(planMember(p, member, undefined, now, "data-review"));
      }
    } catch (error) { failed(error); }
  });
  // Also disable old addresses/deleted/refunded clients previously tagged by us.
  for (const member of previous) {
    if (seenMembers.has(member.id)) continue;
    if (member.status === "archived") continue;
    if (member.id !== emailHash(member.email_address)) throw new RetentionError("previous_member_identity");
    result.staleCohort++;
    plans.push(planMember({ uniqueId: member.id, contractId: "0", product: "1591", purchasedDay: SALE.firstDay, paid: false, ambiguous: true }, member, undefined, now, "cohort-review"));
  }
  for (const p of plans) {
    const status = String(p.fields.SRSTATUS);
    result.statuses[status] = (result.statuses[status] || 0) + 1;
    if (p.tags[SALE.tags.eligible]) {
      result.eligible++;
      if (p.tags[SALE.tags.first]) result.firstClass++;
      if (p.tags[SALE.tags.returning]) result.returnCheckIn++;
      if (!p.assessment?.billingVerified) result.billingReview++;
      if (p.assessment?.staffReview) result.staffReview++;
      if (p.assessment?.next) result.upcomingBookings++;
      const count = String(p.assessment?.visits21 ?? 0);
      result.visits21Distribution[count] = (result.visits21Distribution[count] || 0) + 1;
    }
    if (p.tags[SALE.tags.milestone]) result.milestones++;
  }
  result.planned = plans.length;
  if (apply) {
    if (beforeApply) await beforeApply(plans);
    await each(plans, async plan => {
      try { await applyPlan(api, plan); result.applied++; }
      catch (error) { failed(error); }
    });
  }
  result.paginationRechecks = api.paginationRechecks;
  return result;
}
