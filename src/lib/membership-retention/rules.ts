import { createHash } from "node:crypto";
import { validDay } from "../mfr-purchase-tracking";

export const SALE = {
  siteId: "11233", audienceId: "20f894ac06", server: "us18",
  firstDay: "2026-10-20", lastIntakeDay: "2026-10-28",
  products: { "1591": 184, "1592": 185 } as Record<string, number>,
  // Verified against GET site/programs. Pilates is 52, workshops/enrolments are excluded.
  yogaPrograms: [22, 28, 44, 47],
  tags: {
    cohort: "sale-2026-10", eligible: "sale-retention-eligible",
    first: "sale-needs-first-class", returning: "sale-return-check-in",
    milestone: "sale-practice-milestone",
  },
} as const;

export class RetentionError extends Error {
  constructor(public readonly stage: string, public readonly status?: number) {
    super(`Membership retention: ${stage}${status ? ` (${status})` : ""}`);
  }
}
export function failure(error: unknown): string {
  return error instanceof RetentionError ? error.message : "Membership retention: unexpected_failure";
}
export function localTime(value: string | Date): string {
  if (typeof value === "string" && !/(?:Z|[+-]\d\d:\d\d)$/.test(value)) {
    if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?$/.test(value)
      || !validDay(value.slice(0, 10)) || +value.slice(11, 13) > 23
      || +value.slice(14, 16) > 59 || +value.slice(17, 19) > 59) throw new RetentionError("invalid_local_time");
    return value.slice(0, 19);
  }
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new RetentionError("invalid_time");
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Halifax", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  }).formatToParts(date);
  const p = (key: string) => parts.find(x => x.type === key)?.value;
  return `${p("year")}-${p("month")}-${p("day")}T${p("hour")}:${p("minute")}:${p("second")}`;
}
/** Public V6 fields are business-local wall time, even where Sales appends Z.
 * Unlike UTC webhooks, converting these API fields shifts midnight sales a day.
 * https://developers.mindbodyonline.com/ui/documentation/public-api
 * #/http/mindbody-public-api-v6-0/handling-dates-and-times
 */
export function mindbodyTime(value: string): string {
  return localTime(value.replace(/(?:Z|[+-]\d\d:\d\d)$/, ""));
}
export function mindbodyDay(value: string): string { return mindbodyTime(value).slice(0, 10); }
export function addDays(day: string, days: number): string {
  if (!validDay(day)) throw new RetentionError("invalid_day");
  return new Date(Date.parse(`${day}T12:00:00Z`) + days * 86400000).toISOString().slice(0, 10);
}
export function addMonths(day: string, months: number): string {
  if (!validDay(day)) throw new RetentionError("invalid_day");
  const d = new Date(`${day}T12:00:00Z`);
  const dayOfMonth = d.getUTCDate();
  d.setUTCDate(1); d.setUTCMonth(d.getUTCMonth() + months);
  const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(dayOfMonth, last));
  return d.toISOString().slice(0, 10);
}
export function dayGap(first: string, last: string): number {
  if (!validDay(first) || !validDay(last)) throw new RetentionError("invalid_day_gap");
  return Math.round((Date.parse(last + "T12:00:00Z") - Date.parse(first + "T12:00:00Z")) / 86400000);
}
export function mergeDate(day?: string): string {
  return day ? `${day.slice(5, 7)}/${day.slice(8, 10)}/${day.slice(0, 4)}` : "";
}
export function emailHash(email: string): string {
  return createHash("md5").update(email.trim().toLowerCase()).digest("hex");
}
export function privateKey(uid: string): string {
  return createHash("sha256").update(`${SALE.siteId}:sale-2026-10:${uid}`).digest("hex");
}
export interface Purchase {
  uniqueId: string; contractId: string; product: string; purchasedDay: string;
  paid: boolean; ambiguous: boolean;
}
export interface Visit {
  Id?: number | string; ClientUniqueId?: number; ClientId?: string; SiteId?: number;
  ClassId?: number | null; StartDateTime: string; EndDateTime: string;
  SignedIn?: boolean; Missed?: boolean; LateCancelled?: boolean;
  AppointmentStatus?: string; TypeGroup?: number;
  WaitlistInfo?: { WaitlistId?: number | null; WaitlistOrderNumber?: number | null } | null;
  Service?: { Returned?: boolean; Program?: { Id?: number; ScheduleType?: string } } | null;
}
export interface Contract {
  Id: number; ContractID: number; StartDate: string; EndDate: string;
  SiteId: number; TerminationDate?: string | null; AutopayStatus?: string;
  UpcomingAutopayEvents?: { ScheduleDate: string; Subtotal: number; ProductId?: number }[];
}
export interface Client {
  Id: string; UniqueId: number; Email?: string; Active: boolean;
}
export interface Snapshot {
  purchase: Purchase; client: Client; contracts: Contract[]; visits: Visit[]; schedule: Visit[];
}
export interface Assessment {
  status: string; membershipEligible: boolean; first: boolean; returning: boolean;
  milestone: boolean; staffReview: boolean; visits21: number;
  start?: string; last?: string; next?: string; billingVerified: boolean;
}
function yoga(visit: Visit): boolean {
  const program = visit.Service?.Program?.Id ?? visit.TypeGroup;
  return !!visit.ClassId && SALE.yogaPrograms.includes(program as never)
    && visit.Missed === false && visit.LateCancelled === false
    && visit.Service?.Returned !== true;
  // AppointmentStatus applies to appointments, not classes. Live class rows
  // default to "NoShow" even with SignedIn=true, Missed=false and no cancellation.
}
export function assess(snapshot: Snapshot, now: Date): Assessment {
  const { purchase, client } = snapshot;
  const empty: Assessment = { status: "review", membershipEligible: false, first: false,
    returning: false, milestone: false, staffReview: false, visits21: 0, billingVerified: false };
  if (!purchase.paid) return { ...empty, status: "refunded" };
  if (purchase.ambiguous) return { ...empty, status: "multiple-contracts-review" };
  const contracts = snapshot.contracts.filter(c => String(c.Id) === purchase.contractId
    && c.ContractID === SALE.products[purchase.product] && String(c.SiteId) === SALE.siteId);
  if (contracts.length !== 1) return { ...empty, status: "contract-review" };
  const contract = contracts[0];
  const start = mindbodyDay(contract.StartDate), end = mindbodyDay(contract.EndDate);
  const clock = localTime(now), today = clock.slice(0, 10);
  if (end <= start || start < SALE.firstDay || start > addDays(SALE.lastIntakeDay, 31)) {
    return { ...empty, status: "start-date-review" };
  }
  const completed = new Map<string, Visit>();
  for (const v of snapshot.visits) {
    const begin = mindbodyTime(v.StartDateTime), finish = mindbodyTime(v.EndDateTime);
    if (yoga(v) && v.SignedIn === true && begin.slice(0, 10) >= start && finish <= clock && finish > begin) {
      if (v.Id == null) throw new RetentionError("missing_visit_id");
      completed.set(`${v.ClassId}:${begin}`, v);
    }
  }
  const visits = [...completed.values()].sort((a, b) => mindbodyTime(a.StartDateTime).localeCompare(mindbodyTime(b.StartDateTime)));
  const visits21 = visits.filter(v => mindbodyTime(v.StartDateTime).slice(0, 10) < addDays(start, 21)).length;
  const last = visits.length ? mindbodyDay(visits[visits.length - 1].StartDateTime) : undefined;
  const future = snapshot.schedule.filter(v => yoga(v) && mindbodyTime(v.EndDateTime) > clock
    && v.WaitlistInfo?.WaitlistId == null
    && mindbodyDay(v.StartDateTime) >= start
    && v.WaitlistInfo?.WaitlistOrderNumber == null).sort((a, b) => mindbodyTime(a.StartDateTime).localeCompare(mindbodyTime(b.StartDateTime)));
  const next = future.length ? mindbodyDay(future[0].StartDateTime) : undefined;
  const base = { ...empty, start, last, next, visits21, milestone: visits21 >= 5 };
  if (!client.Active) return { ...base, status: "client-inactive" };
  if (contract.TerminationDate) return { ...base, status: "cancelled" };
  if (contract.AutopayStatus !== "Active") return { ...base, status: "membership-review" };
  if (today < start) return { ...base, status: "not-started" };
  // Intro contracts end after two months, not four. Never assume an unseen continuation exists.
  if (today >= end) return { ...base, status: "continuation-review" };
  const first = !last && dayGap(start, today) >= 7 && !next;
  const returning = !!last && dayGap(last, today) >= 14 && !next;
  return { ...base, status: "active", membershipEligible: true, first, returning,
    staffReview: !last && dayGap(start, today) >= 14 && !next };
}
