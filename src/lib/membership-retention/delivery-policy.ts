import { addDays, addMonths, dayGap, localTime, RetentionError, SALE } from "./rules";
import type { Plan } from "./sync";

export const MESSAGES = {
  "support-01": { campaign: "d935a58b22", journey: 3749, step: 29681, day: 0 },
  "support-02": { campaign: "35203e080a", journey: 3749, step: 29681, day: 21 },
  "support-03": { campaign: "c06e6ad2d6", journey: 3749, step: 29681, day: 42 },
  "support-04": { campaign: "693e2b3c4a", journey: 3749, step: 29681, day: 56 },
  "support-05": { campaign: "58132830a8", journey: 3749, step: 29681, day: 77 },
  "support-06": { campaign: "6b1132925e", journey: 3749, step: 29681, day: null },
  "attendance-first-class": { campaign: "cfbd435561", journey: 3750, step: 29694, day: null },
  "attendance-return": { campaign: "57ee56f80a", journey: 3750, step: 29694, day: null },
  "attendance-celebration": { campaign: "3ff26db48b", journey: 3751, step: 29699, day: null },
} as const;
export type Message = keyof typeof MESSAGES;
export interface Receipt { message: Message; sentAt: string }
export interface DeliveryRecord {
  message: Message; episode: string; claimedAt: string; claimId: string;
  status: "claimed" | "accepted" | "uncertain" | "confirmed" | "aborted";
  sentAt?: string;
}
export interface DeliveryState {
  version: 1; memberId: string; start: string; records: DeliveryRecord[];
}
export interface Candidate { message: Message; episode: string }
export function isMessage(value: string): value is Message { return Object.hasOwn(MESSAGES, value); }
export function validInstant(value: string): boolean {
  return /^\d{4}-\d\d-\d\dT/.test(value) && /(?:Z|[+-]\d\d:\d\d)$/.test(value)
    && Number.isFinite(Date.parse(value));
}
export function validateState(value: DeliveryState, memberId: string, start: string): void {
  if (value.version !== 1 || value.memberId !== memberId || value.start !== start
    || !Array.isArray(value.records) || value.records.length > 300) throw new RetentionError("delivery_identity_review");
  for (const r of value.records) {
    if (!isMessage(r.message) || !r.claimId || !r.episode || !validInstant(r.claimedAt)
      || !["claimed", "accepted", "uncertain", "confirmed", "aborted"].includes(r.status)
      || (r.status === "confirmed" && (!r.sentAt || !validInstant(r.sentAt)))) throw new RetentionError("delivery_state_review");
  }
}
export function reconcile(state: DeliveryState, receipts: Receipt[], now: Date): DeliveryState {
  const copy = structuredClone(state);
  for (const r of copy.records) {
    if (!["claimed", "accepted", "uncertain"].includes(r.status)) continue;
    const sent = receipts.filter(x => x.message === r.message
      // Provider timestamps may be rounded to whole seconds.
      && Date.parse(x.sentAt) >= Date.parse(r.claimedAt) - 2000
      && Date.parse(x.sentAt) <= now.getTime()).sort((a, b) => a.sentAt.localeCompare(b.sentAt))[0];
    if (sent) { r.status = "confirmed"; r.sentAt = sent.sentAt; }
  }
  return copy;
}
export function choose(plan: Plan, state: DeliveryState, receipts: Receipt[], now: Date,
  decisionDay?: string): { candidate?: Candidate; reason: string } {
  const a = plan.assessment, today = localTime(now).slice(0, 10);
  if (!a?.membershipEligible || !a.start || plan.member.status !== "subscribed"
    || !plan.tags[SALE.tags.eligible]) return { reason: "ineligible" };
  validateState(state, plan.member.id, a.start);
  if (today >= addMonths(a.start, 4)) return { reason: "programme_complete" };
  if (state.records.some(r => ["claimed", "accepted", "uncertain"].includes(r.status))) return { reason: "pending_delivery_review" };
  const history = [...receipts, ...state.records.filter(r => r.status === "confirmed")
    .map(r => ({ message: r.message, sentAt: r.sentAt! }))];
  if (history.some(r => !validInstant(r.sentAt) || Date.parse(r.sentAt) > now.getTime())) throw new RetentionError("invalid_delivery_history");
  if (history.some(r => now.getTime() - Date.parse(r.sentAt) < 72 * 3600000)) return { reason: "shared_72h_spacing" };
  const sent = (m: Message) => history.filter(r => r.message === m);
  // Always send welcome once, including returning students; no import-relative clock.
  for (let i = 1; i <= 6; i++) {
    const message = ("support-0" + i) as Message;
    if (sent(message).length) continue;
    const offset = MESSAGES[message].day;
    const due = message === "support-06" ? (decisionDay || a.commitmentEnd) && addDays((decisionDay || a.commitmentEnd)!, -14)
      : offset != null ? addDays(a.start, offset) : undefined;
    if (due && today >= due) return { candidate: { message, episode: message }, reason: "support_due" };
    break;
  }
  if (a.milestone && !sent("attendance-celebration").length)
    return { candidate: { message: "attendance-celebration", episode: "first-21-days" }, reason: "milestone" };
  const attendance = history.filter(r => MESSAGES[r.message].journey === 3750);
  if (attendance.some(r => now.getTime() - Date.parse(r.sentAt) < 14 * 86400000)) return { reason: "attendance_14d_reentry" };
  const age = dayGap(a.start, today);
  if (a.first && age >= 7 && age < 14 && !sent("attendance-first-class").length)
    return { candidate: { message: "attendance-first-class", episode: "first-class" }, reason: "first_class_due" };
  if (a.returning && a.last) {
    const last = a.lastAt || a.last + "T00:00:00";
    if (!sent("attendance-return").some(r => localTime(r.sentAt) >= last))
      return { candidate: { message: "attendance-return", episode: "since-" + last }, reason: "return_due" };
  }
  if (a.staffReview) return { reason: "no_first_class_staff_review" };
  return { reason: sent("support-05").length && !decisionDay ? "decision_date_review" : "not_due" };
}
