import test from "node:test";
import assert from "node:assert/strict";
import { assess, emailHash, privateKey, SALE, type Snapshot, type Visit } from "../src/lib/membership-retention/rules";
import { RetentionApi, type Member, type RetentionConfig } from "../src/lib/membership-retention/api";
import { applyPlan, planMember, type Plan } from "../src/lib/membership-retention/sync";
import { choose, reconcile, MESSAGES, type DeliveryState, type Receipt, type Message } from "../src/lib/membership-retention/delivery-policy";
import { deliverOne, dispatch } from "../src/lib/membership-retention/delivery";
import { deliveryMode, MailchimpDeliveryGateway, type DeliveryGateway } from "../src/lib/membership-retention/delivery-mailchimp";
import type { Ledger, Versioned } from "../src/lib/membership-retention/delivery-ledger";
import approved from "../src/lib/membership-retention/approved-emails.json";

const config: RetentionConfig = { mode: "tags", mindbodyKey: "test", sourceName: "test",
  username: "test", password: "test", mailchimpKey: "test" };
const now = new Date("2026-10-29T15:00:00Z");
const purchase = { uniqueId: "1001", contractId: "123", product: "1591", purchasedDay: "2026-10-20", paid: true, ambiguous: false };
const client = { Id: "custom-1001", UniqueId: 1001, Email: "invented@example.test", Active: true };
const initialMember: Member = { id: emailHash(client.Email), email_address: client.Email,
  status: "subscribed", merge_fields: {}, tags: [] };
const visit = (day: string, id = 1): Visit => ({ Id: id, ClassId: id, ClientUniqueId: 1001, SiteId: 11233,
  StartDateTime: day + "T09:00:00", EndDateTime: day + "T10:00:00", SignedIn: true,
  Missed: false, LateCancelled: false, TypeGroup: 22 });
function snapshot(): Snapshot {
  return { purchase, client, contracts: [{ Id: 123, ContractID: 184, SiteId: 11233, StartDate: "2026-10-20T00:00:00",
    EndDate: "2026-12-20T00:00:00", AutopayStatus: "Active", TerminationDate: null }], visits: [], schedule: [] };
}
function plan(at = now, s = snapshot(), member = structuredClone(initialMember)): Plan {
  return { ...planMember(purchase, member, assess(s, at), at), source: { purchase, client: s.client } };
}
function empty(): DeliveryState { return { version: 1, memberId: initialMember.id, start: "2026-10-20", records: [] }; }
const receipt = (message: Message, sentAt: string): Receipt => ({ message, sentAt });
const support = (count: number): Receipt[] => Array.from({ length: count }, (_, i) =>
  receipt(("support-0" + (i + 1)) as Message, "2026-10-20T10:00:00Z"));
class MemoryLedger implements Ledger {
  data = new Map<string, Versioned>(); serial = 0; writes = 0;
  async read(key: string, blank: DeliveryState) { return structuredClone(this.data.get(key) || { state: blank }); }
  async save(key: string, state: DeliveryState, etag?: string) {
    if (this.data.get(key)?.etag !== etag) return undefined;
    const next = String(++this.serial); this.writes++;
    this.data.set(key, { state: structuredClone(state), etag: next }); return next;
  }
  async probe() {}
}
class FakeApi extends RetentionApi {
  current = structuredClone(initialMember); currentSnapshot = snapshot();
  constructor() { super(config, now); }
  async member() { return structuredClone(this.current); }
  async clients() { return new Map([[purchase.uniqueId, this.currentSnapshot.client]]); }
  async snapshot() { return structuredClone(this.currentSnapshot); }
  async mc(path: string, method = "GET", value?: unknown): Promise<unknown> {
    assert.notEqual(method, "GET");
    const body = value as { merge_fields?: Record<string, string | number>; is_syncing?: boolean; tags?: { name: string; status: string }[] };
    if (method === "PATCH") Object.assign(this.current.merge_fields, body.merge_fields);
    else {
      assert.equal(body.is_syncing, true);
      for (const t of body.tags!) {
        this.current.tags = this.current.tags.filter(x => x.name !== t.name);
        if (t.status === "active") this.current.tags.push({ name: t.name });
      }
    }
    return null;
  }
}
function gateway(history: Receipt[] = [], trigger: DeliveryGateway["trigger"] = async () => {}) {
  return { preflight: async () => {}, receipts: async () => history, trigger };
}

test("all current eligible buyers receive welcome first, including late current-cohort entry", () => {
  assert.equal(choose(plan(), empty(), [], now).candidate?.message, "support-01");
  assert.equal(choose(plan(new Date("2026-12-15T15:00:00Z")), empty(), [], new Date("2026-12-15T15:00:00Z")).candidate?.message, "support-01");
});
test("membership-age schedule routes revised topics on days 21, 42, 56 and 77", () => {
  for (const [date, completed, message] of [
    ["2026-11-09", 1, undefined], ["2026-11-10", 1, "support-02"],
    ["2026-12-01", 2, "support-03"], ["2026-12-15", 3, "support-04"],
    ["2027-01-05", 4, "support-05"],
  ] as const) {
    const t = new Date(date + "T15:00:00Z");
    const p = plan(t); p.assessment!.first = false;
    assert.equal(choose(p, empty(), support(completed), t).candidate?.message, message);
  }
});
test("final email is two weeks before four calendar months; monthly renewal does not restart this programme", () => {
  const before = new Date("2027-02-05T15:00:00Z"), due = new Date("2027-02-06T15:00:00Z");
  assert.equal(choose(plan(before), empty(), support(5), before).candidate, undefined);
  assert.equal(choose(plan(due), empty(), support(5), due).candidate?.message, "support-06");
  assert.equal(choose(plan(new Date("2027-02-20T15:00:00Z")), empty(), support(6), new Date("2027-02-20T15:00:00Z")).candidate, undefined);
});
test("staff-created continuation is recognized through four months; termination and suspension still stop messages", () => {
  const s = snapshot(), t = new Date("2027-01-05T15:00:00Z");
  s.contracts[0].AutopayStatus = "Inactive";
  assert.equal(assess(s, t).membershipEligible, true);
  s.contracts[0].AutopayStatus = "Suspended";
  assert.equal(assess(s, t).membershipEligible, false);
  s.contracts[0].AutopayStatus = "Active"; s.contracts[0].TerminationDate = "2027-01-01";
  assert.equal(assess(s, t).membershipEligible, false);
});
test("72-hour spacing uses actual sends, including DST changes and exact boundary", () => {
  const last = receipt("attendance-celebration", "2026-10-26T15:00:01Z");
  assert.equal(choose(plan(), empty(), [last], now).reason, "shared_72h_spacing");
  last.sentAt = "2026-10-26T15:00:00Z";
  assert.equal(choose(plan(), empty(), [last], now).candidate?.message, "support-01");
});
test("welcome is never repeated from persistent stage fields or after a confirmed provider send", () => {
  const p = plan(); p.member.merge_fields.SRSTAGE = "support-01";
  assert.notEqual(choose(p, empty(), support(1), now).candidate?.message, "support-01");
});
test("first-class nudge sends once before day 14; an upcoming booking suppresses it", () => {
  assert.equal(choose(plan(), empty(), support(1), now).candidate?.message, "attendance-first-class");
  const s = snapshot(); s.schedule = [visit("2026-10-30")];
  assert.equal(choose(plan(now, s), empty(), support(1), now).candidate, undefined);
  const t = new Date("2026-11-03T15:00:00Z");
  assert.equal(choose(plan(t), empty(), support(1), t).reason, "no_first_class_staff_review");
});
test("return attendance resets the lapse; persistent no-attendance does not re-send", () => {
  const s = snapshot(); s.visits = [visit("2026-10-21")];
  const t = new Date("2026-11-04T15:00:00Z");
  assert.equal(choose(plan(t, s), empty(), support(1), t).candidate?.message, "attendance-return");
  const history = [...support(1), receipt("attendance-return", "2026-11-04T15:00:00Z")];
  const later = new Date("2026-11-20T15:00:00Z");
  // Remove other due support stages to isolate lapse behavior.
  assert.notEqual(choose(plan(later, s), empty(), [...history, ...support(2)], later).candidate?.message, "attendance-return");
  s.visits.push(visit("2026-11-05", 2));
  assert.equal(choose(plan(later, s), empty(), [...history, ...support(2)], later).candidate?.message, "attendance-return");
});
test("five completed classes earn one celebration, after shared spacing", () => {
  const s = snapshot(); s.visits = ["2026-10-20", "2026-10-21", "2026-10-22", "2026-10-24", "2026-10-27"].map((day, i) => visit(day, i + 1));
  assert.equal(choose(plan(now, s), empty(), support(1), now).candidate?.message, "attendance-celebration");
  assert.equal(choose(plan(now, s), empty(), [...support(1), receipt("attendance-celebration", "2026-10-25T15:00:00Z")], now).candidate, undefined);
});
test("attending later on the same day as a nudge opens a new lapse episode", () => {
  const s = snapshot(); s.visits = [visit("2026-11-04")];
  const later = new Date("2026-11-20T15:00:00Z");
  const history = [...support(2), receipt("attendance-return", "2026-11-04T10:00:00Z")];
  assert.equal(choose(plan(later, s), empty(), history, later).candidate?.message, "attendance-return");
});
test("staff hold added after planning is respected at tag write time", async () => {
  const api = new FakeApi();
  api.current.tags.push({ name: SALE.manualHoldTag });
  await applyPlan(api, plan());
  assert.equal(api.current.merge_fields.SRSTATUS, "staff-hold");
  assert.equal(api.current.tags.some(t => t.name === SALE.tags.eligible), false);
  assert.equal(api.current.tags.some(t => t.name === SALE.manualHoldTag), true);
});
test("manual staff hold survives daily sync logic, without changing subscription", () => {
  const member = structuredClone(initialMember); member.tags.push({ name: SALE.manualHoldTag });
  const p = plan(now, snapshot(), member);
  assert.equal(p.tags[SALE.tags.eligible], false); assert.equal(p.fields.SRSTATUS, "staff-hold");
  assert.equal(member.status, "subscribed");
});
test("uncertain or accepted triggers block other flows until an actual sent receipt", () => {
  const state = empty();
  state.records.push({ message: "support-01", episode: "support-01", claimedAt: "2026-10-28T15:00:00.500Z",
    claimId: "one", status: "accepted" });
  assert.equal(choose(plan(), state, [], now).reason, "pending_delivery_review");
  assert.equal(reconcile(state, [], now).records[0].status, "accepted");
  assert.equal(reconcile(state, [receipt("support-01", "2026-10-28T15:00:00Z")], now).records[0].status, "confirmed");
});
test("preview computes candidates without member writes, triggers or individual ledger writes", async () => {
  const ledger = new MemoryLedger(), api = new FakeApi(); let triggers = 0;
  const report = await dispatch([plan()], api, ledger, gateway([], async () => { triggers++; }), "preview", now);
  assert.equal(report.due, 1); assert.equal(triggers, 0); assert.equal(ledger.writes, 0);
  assert.deepEqual(api.current.merge_fields, {});
});
test("simultaneous workers can claim a member only once across all flows", async () => {
  const ledger = new MemoryLedger(), api = new FakeApi(); let triggers = 0;
  const provider = gateway([], async () => { triggers++; });
  const results = await Promise.all([deliverOne(plan(), api, ledger, provider, "live", now, () => now),
    deliverOne(plan(), api, ledger, provider, "live", now, () => now)]);
  assert.equal(triggers, 1);
  assert.equal(results.filter(r => r.accepted).length, 1);
});
test("a trigger timeout or worker crash cannot cause an automatic retry next run", async () => {
  const ledger = new MemoryLedger(), api = new FakeApi(); let triggers = 0;
  const provider = gateway([], async () => { triggers++; throw new Error("timeout after possible send"); });
  await assert.rejects(deliverOne(plan(), api, ledger, provider, "live", now, () => now));
  assert.equal((await deliverOne(plan(), api, ledger, provider, "live", now, () => now)).reason, "pending_delivery_review");
  assert.equal(triggers, 1);
});
test("membership cancellation after selection aborts before API entry", async () => {
  const ledger = new MemoryLedger(), api = new FakeApi(); let triggers = 0;
  api.currentSnapshot.contracts[0].TerminationDate = "2026-10-29";
  const item = await deliverOne(plan(), api, ledger, gateway([], async () => { triggers++; }), "live", now, () => now);
  assert.equal(item.reason, "state_changed_before_trigger"); assert.equal(triggers, 0);
});
test("unsubscribe or staff hold immediately before send aborts", async () => {
  for (const state of ["unsubscribed", "hold"]) {
    const ledger = new MemoryLedger(), api = new FakeApi(); let triggers = 0;
    if (state === "hold") api.current.tags.push({ name: SALE.manualHoldTag }); else api.current.status = state;
    await deliverOne(plan(), api, ledger, gateway([], async () => { triggers++; }), "live", now, () => now);
    assert.equal(triggers, 0);
  }
});
test("wrong subscriber or start-date ledger is held instead of reusing send history", async () => {
  const ledger = new MemoryLedger(), api = new FakeApi();
  ledger.data.set(privateKey(purchase.uniqueId), { state: { ...empty(), memberId: "another" }, etag: "1" });
  await assert.rejects(deliverOne(plan(), api, ledger, gateway(), "live", now), /delivery_identity_review/);
});
test("mode is preview by default; live requires the exact approved content revision", () => {
  assert.equal(deliveryMode({}), "preview");
  assert.throws(() => deliveryMode({ MEMBERSHIP_RETENTION_DELIVERY_MODE: "live" }), /not_approved/);
  assert.equal(deliveryMode({ MEMBERSHIP_RETENTION_DELIVERY_MODE: "live", RETENTION_DELIVERY_APPROVED_REVISION: approved.revision }), "live");
});
test("preview gateway cannot trigger even a known production journey", async () => {
  let calls = 0;
  const g = new MailchimpDeliveryGateway(new FakeApi(), "preview", async () => { calls++; return new Response(null, { status: 204 }); });
  await assert.rejects(g.trigger("support-01", initialMember), /trigger_not_allowed/);
  assert.equal(calls, 0);
});
test("receipt feed accepts only actual sent events with matching contact and campaign", async () => {
  const data = { list_id: SALE.audienceId, email_id: initialMember.id,
    activity: [{ activity_type: "sent", campaign_id: MESSAGES["support-01"].campaign, created_at_timestamp: "2026-10-28T15:00:00Z" }] };
  let calls = 0;
  const api = new RetentionApi(config, now, async () => new Response(JSON.stringify(calls++ ? { ...data, activity: [] } : data)));
  const receipts = await new MailchimpDeliveryGateway(api, "preview").receipts(initialMember);
  assert.deepEqual(receipts, [receipt("support-01", "2026-10-28T15:00:00Z")]);
});
test("repeated receipt pages, foreign identities and non-send events fail closed", async () => {
  const base = { list_id: SALE.audienceId, email_id: initialMember.id,
    activity: [{ activity_type: "sent", campaign_id: "unrelated", created_at_timestamp: "2026-10-28T15:00:00Z" }] };
  for (const data of [base, { ...base, email_id: "other" }, { ...base, activity: [{ ...base.activity[0], activity_type: "open" }] }]) {
    const api = new RetentionApi(config, now, async () => new Response(JSON.stringify(data)));
    await assert.rejects(new MailchimpDeliveryGateway(api, "preview").receipts(initialMember));
  }
});
test("delivery endpoint rejects unauthorized calls; previews and off mode make no vendor requests", async () => {
  const { GET } = await import("../src/app/api/cron/membership-retention-delivery/route");
  const original = { secret: process.env.CRON_SECRET, env: process.env.VERCEL_ENV, mode: process.env.MEMBERSHIP_RETENTION_DELIVERY_MODE };
  const oldFetch = global.fetch; let calls = 0;
  global.fetch = async () => { calls++; throw new Error("No network allowed"); };
  try {
    process.env.CRON_SECRET = "test-secret"; process.env.VERCEL_ENV = "production";
    assert.equal((await GET(new Request("https://example.test/api/cron/membership-retention-delivery"))).status, 401);
    const request = () => new Request("https://example.test/api/cron/membership-retention-delivery", { headers: { authorization: "Bearer test-secret" } });
    process.env.VERCEL_ENV = "preview";
    assert.equal((await (await GET(request())).json()).status, "disabled");
    process.env.VERCEL_ENV = "production"; process.env.MEMBERSHIP_RETENTION_DELIVERY_MODE = "off";
    assert.equal((await (await GET(request())).json()).status, "disabled");
    assert.equal(calls, 0);
  } finally {
    global.fetch = oldFetch;
    for (const [key, value] of Object.entries({ CRON_SECRET: original.secret, VERCEL_ENV: original.env, MEMBERSHIP_RETENTION_DELIVERY_MODE: original.mode })) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});
