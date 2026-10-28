import test from "node:test";
import assert from "node:assert/strict";
import { assess, addDays, addMonths, localTime, mindbodyDay, dayGap, mergeDate, emailHash, SALE, RetentionError, type Snapshot, type Visit, type Purchase } from "../src/lib/membership-retention/rules";
import { getConfig, RetentionApi, type RetentionConfig, type Member } from "../src/lib/membership-retention/api";
import { planMember, applyPlan, syncRetention } from "../src/lib/membership-retention/sync";

const config: RetentionConfig = { mode: "tags", mindbodyKey: "test", sourceName: "test", username: "test", password: "test", mailchimpKey: "test" };
const purchase: Purchase = { uniqueId: "100000001", contractId: "123", product: "1591", purchasedDay: "2026-10-20", paid: true, ambiguous: false };
const client = { Id: "custom-42", UniqueId: 100000001, Email: "student@example.test", Active: true };
const now = new Date("2026-10-28T15:00:00Z");
function visit(day: string, id = 1, overrides: Partial<Visit> = {}): Visit {
  return { Id: id, ClassId: id, ClientId: client.Id, ClientUniqueId: client.UniqueId, SiteId: 11233,
    StartDateTime: `${day}T09:00:00`, EndDateTime: `${day}T10:00:00`, TypeGroup: 22,
    SignedIn: true, Missed: false, LateCancelled: false, AppointmentStatus: "NoShow", ...overrides };
}
function snapshot(overrides: Partial<Snapshot> = {}): Snapshot {
  return { purchase: { ...purchase }, client: { ...client }, contracts: [{ Id: 123, ContractID: 184, SiteId: 11233,
    StartDate: "2026-10-20T00:00:00", EndDate: "2026-12-20T00:00:00", AutopayStatus: "Active", TerminationDate: null }], visits: [], schedule: [], ...overrides };
}
function member(overrides: Partial<Member> = {}): Member {
  return { id: emailHash(client.Email), email_address: client.Email, status: "subscribed", merge_fields: {}, tags: [], ...overrides };
}
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), { status });
function paged(field: string, values: unknown[], offset = 0, total = values.length) {
  return { [field]: values, PaginationResponse: { RequestedOffset: offset, TotalResults: total } };
}

test("Halifax calendar rules survive DST and use actual calendar months", () => {
  assert.equal(localTime("2026-11-01T04:30:00Z"), "2026-11-01T01:30:00");
  assert.equal(localTime("2026-11-01T05:30:00Z"), "2026-11-01T01:30:00");
  assert.equal(dayGap("2026-10-28", "2026-11-04"), 7);
  assert.equal(addDays("2026-10-28", 7), "2026-11-04");
  assert.equal(addMonths("2026-10-31", 4), "2027-02-28");
  assert.equal(mergeDate("2026-10-28"), "10/28/2026");
  assert.throws(() => localTime("2026-02-30T12:00:00"));
  // Public V6 sales append Z to BUSINESS-LOCAL dates. Midnight sale day must not shift.
  assert.equal(mindbodyDay("2026-10-20T00:23:58Z"), "2026-10-20");
});
test("first-class support starts on day 7; a booking suppresses it", () => {
  assert.equal(assess(snapshot(), new Date("2026-10-26T15:00:00Z")).first, false);
  assert.equal(assess(snapshot(), new Date("2026-10-27T15:00:00Z")).first, true);
  assert.equal(assess(snapshot({ schedule: [visit("2026-10-29")] }), now).first, false);
  assert.equal(assess(snapshot({ schedule: [visit("2026-10-29", 1, { WaitlistInfo: { WaitlistId: 77 } })] }), now).first, true);
});
test("day 9 attendance resets the absence clock; day 14 is not a second nudge", () => {
  const s = snapshot({ visits: [visit("2026-10-29")] });
  const day14 = assess(s, new Date("2026-11-03T15:00:00Z"));
  assert.equal(day14.first, false); assert.equal(day14.returning, false);
  assert.equal(assess(s, new Date("2026-11-12T15:00:00Z")).returning, true);
  assert.equal(assess(snapshot(), new Date("2026-11-03T15:00:00Z")).staffReview, true);
});
test("future signed-in classes, no-shows, cancellations and Pilates do not count", () => {
  const visits = [visit("2026-10-29"), visit("2026-10-22", 2, { Missed: true }),
    visit("2026-10-23", 3, { LateCancelled: true }), visit("2026-10-24", 4, { TypeGroup: 52 }),
    visit("2026-10-25", 5, { SignedIn: false }), visit("2026-10-26", 6, { ClassId: null }),
    visit("2026-10-27", 7, { Missed: true })];
  assert.equal(assess(snapshot({ visits }), now).visits21, 0);
});
test("real class visit shape ignores the appointment-only NoShow default", () => {
  const s = snapshot({ visits: [visit("2026-10-24"), visit("2026-10-26", 2)],
    schedule: [visit("2026-10-28", 3, { StartDateTime: "2026-10-28T17:30:00", EndDateTime: "2026-10-28T18:30:00",
      WaitlistInfo: { WaitlistId: null, WaitlistOrderNumber: null } })] });
  const a = assess(s, now);
  assert.equal(a.visits21, 2); assert.equal(a.last, "2026-10-26"); assert.equal(a.next, "2026-10-28");
  assert.equal(a.first, false);
});
test("an ongoing first class suppresses the nudge but only counts once it finishes", () => {
  const ongoing = visit("2026-10-28", 3, { StartDateTime: "2026-10-28T11:30:00", EndDateTime: "2026-10-28T12:30:00" });
  const a = assess(snapshot({ visits: [ongoing], schedule: [ongoing] }), now);
  assert.equal(a.visits21, 0); assert.equal(a.first, false); assert.equal(a.next, "2026-10-28");
});
test("5 classes within first 21 days earns celebration even if sync runs later", () => {
  const visits = ["2026-10-20", "2026-10-23", "2026-10-25", "2026-11-05", "2026-11-09"].map((d, i) => visit(d, i + 1));
  const a = assess(snapshot({ visits: [...visits, visits[0], { ...visits[0], Id: 77 }, visit("2026-11-10", 9)] }), new Date("2026-11-12T15:00:00Z"));
  assert.equal(a.visits21, 5); assert.equal(a.milestone, true);
  assert.equal(assess(snapshot({ visits: visits.slice(0, 4) }), new Date("2026-11-12T15:00:00Z")).milestone, false);
});
test("refunded, cancelled, inactive, unmatched and ambiguous contracts are held", () => {
  assert.equal(assess(snapshot({ purchase: { ...purchase, paid: false } }), now).membershipEligible, false);
  assert.equal(assess(snapshot({ purchase: { ...purchase, ambiguous: true } }), now).membershipEligible, false);
  const s = snapshot(); s.contracts[0].TerminationDate = "2027-02-20T00:00:00";
  assert.equal(assess(s, now).status, "cancelled");
  assert.equal(assess(snapshot({ client: { ...client, Active: false } }), now).membershipEligible, false);
  assert.equal(assess(snapshot({ contracts: [] }), now).status, "contract-review");
  assert.equal(assess(snapshot(), new Date("2026-12-20T15:00:00Z")).status, "continuation-review");
  assert.equal(assess(snapshot(), now).billingVerified, false);
});
test("every eligible current buyer starts at welcome, with no automatic stage advancement", () => {
  const a = assess(snapshot(), now);
  assert.equal(planMember(purchase, member(), a, now).fields.SRSTAGE, "support-01");
  assert.equal(planMember(purchase, member({ merge_fields: { SRSTAGE: "support-03" } }), a, now).fields.SRSTAGE, undefined);
  const unsub = planMember(purchase, member({ status: "unsubscribed" }), a, now);
  assert.equal(unsub.tags[SALE.tags.eligible], false);
  assert.equal(unsub.fields.SRSTAGE, undefined);
  assert.equal(unsub.fields.SRBILLAMT, "");
});
test("data failures remove dynamic eligibility without fabricating zero attendance", () => {
  const p = planMember(purchase, member({ merge_fields: { SRVIS21: 4, SRSYNC: "old" }, tags: [{ name: SALE.tags.milestone }] }), undefined, now, "data-review");
  assert.equal(p.fields.SRVIS21, undefined); assert.equal(p.fields.SRSYNC, undefined);
  assert.equal(p.tags[SALE.tags.eligible], false); assert.equal(p.tags[SALE.tags.first], false);
  assert.equal(p.tags[SALE.tags.milestone], true);
});
test("staff credentials and exact Shanti account are required", () => {
  assert.throws(() => getConfig({ MINDBODY_SITE_ID: "other" }), RetentionError);
  assert.throws(() => getConfig({ MINDBODY_SITE_ID: "11233", MAILCHIMP_NEWSLETTER_AUDIENCE_ID: "other" }), RetentionError);
});
test("production requires dedicated credentials and cannot use the legacy shared-login fallback", () => {
  const env = { VERCEL_ENV: "production", MINDBODY_SITE_ID: "11233", MAILCHIMP_NEWSLETTER_AUDIENCE_ID: "20f894ac06",
    MAILCHIMP_SERVER_PREFIX: "us18", MINDBODY_API_KEY: "test", MAILCHIMP_API_KEY: "test", MINDBODY_USERNAME: "old", MINDBODY_PASSWORD: "old" };
  assert.throws(() => getConfig(env), /missing_RETENTION_MINDBODY_USERNAME/);
  assert.equal(getConfig({ ...env, RETENTION_MINDBODY_USERNAME: "dedicated", RETENTION_MINDBODY_PASSWORD: "test" }).username, "dedicated");
});
test("purchases use item recipient and purchased instance, net returns and ambiguous repeat purchases", async () => {
  const sale = (id: number, uid: number, item: object) => ({ Id: id, ClientId: 99, RecipientClientId: 88,
    SaleDateTime: "2026-10-20T00:23:58Z", PurchasedItems: [{ Id: 1591, IsService: true, ContractId: 123,
      RecipientClientId: uid, Quantity: 1, TotalAmount: 21.66, Returned: false, ...item }] });
  const api = new RetentionApi(config, now, async () => json(paged("Sales", [sale(1, 7, {}),
    sale(2, 8, { Returned: true }), sale(3, 9, {}), sale(4, 9, { ContractId: 124 })])));
  const p = await api.purchases();
  assert.equal(p[0].uniqueId, "7"); assert.equal(p[0].contractId, "123");
  assert.equal(p[1].paid, false); assert.equal(p[2].ambiguous, true);
});
test("unique-ID batches are resolved rather than confusing custom ClientId with RSSID", async () => {
  let requested = "";
  const api = new RetentionApi(config, now, async url => {
    requested = String(url); return json(paged("Clients", [client]));
  });
  const mapped = await api.clients([purchase]);
  assert.equal(mapped.get(purchase.uniqueId)?.Id, "custom-42");
  assert.match(requested, /UniqueIds%5B0%5D=100000001/);
  assert.doesNotMatch(requested, /ClientIds/);
});
test("incomplete or changing pagination fails closed, rather than yielding zero visits", async () => {
  let calls = 0;
  const api = new RetentionApi(config, now, async () => {
    calls++;
    return json(paged("Visits", calls === 1 ? [{ Id: 1 }] : [], calls === 1 ? 0 : 1, 2));
  });
  await assert.rejects(api.pages("client/clientvisits", "Visits", {}), /incomplete_pagination/);
  const errorApi = new RetentionApi(config, now, async () => new Response("private upstream error", { status: 500 }));
  await assert.rejects(errorApi.pages("client/clientvisits", "Visits", {}), /mindbody_clientvisits_request \(500\)/);
});
test("inflated sales total requires an independent full-page ID reconciliation", async () => {
  let calls = 0;
  const api = new RetentionApi(config, now, async () => {
    calls++;
    if (calls === 1) return json(paged("Sales", [{ Id: 1 }], 0, 2));
    if (calls === 2) return json(paged("Sales", [], 1, 0));
    return json(paged("Sales", [{ Id: 1 }], 0, 2));
  });
  assert.deepEqual(await api.pages("sale/sales", "Sales", {}), [{ Id: 1 }]);
  assert.equal(api.paginationRechecks, 1);
});
test("tag segments with stale zero totals are paged to empty and include unsubscribed contacts", async () => {
  let calls = 0;
  const api = new RetentionApi(config, now, async url => {
    assert.match(String(url), /include_unsubscribed=true/);
    calls++;
    return json({ total_items: 0, members: calls === 1 ? [member()] : [] });
  });
  assert.equal((await api.previousMembers()).length, 1);
  assert.equal(calls, 2);
});
test("write allowlist blocks email sends, subscription changes and unrelated tags", async () => {
  const api = new RetentionApi(config, now, async () => new Response(null, { status: 204 }));
  await assert.rejects(api.mc("customer-journeys/journeys/3749/steps/29681/actions/trigger", "POST", {}), /write_not_allowed/);
  await assert.rejects(api.mc(`lists/${SALE.audienceId}/members/${member().id}`, "PATCH", { status: "subscribed" }), /unsafe_member_write/);
  await assert.rejects(api.mc(`lists/${SALE.audienceId}/members/${member().id}`, "PATCH", { merge_fields: { FNAME: "changed" } }), /unsafe_member_write/);
  await assert.rejects(api.mc(`lists/${SALE.audienceId}/members/${member().id}/tags`, "POST", { tags: [{ name: SALE.tags.cohort, status: "active" }] }), /unsafe_tag_write/);
  const readOnly = new RetentionApi({ ...config, mode: "read-only" }, now);
  await assert.rejects(readOnly.mc(`lists/${SALE.audienceId}/members/${member().id}`, "PATCH", { merge_fields: {} }), /writes_disabled/);
});
test("eligibility removed first, tags suppress automations, opt-out is rechecked at write time", async () => {
  const writes: { method: string; body: Record<string, unknown> }[] = [];
  const api = new RetentionApi(config, now, async (_url, init) => {
    if (init?.method === "GET") return json(member({ status: "unsubscribed" }));
    writes.push({ method: init!.method!, body: JSON.parse(String(init!.body)) });
    return init?.method === "PATCH" ? json({}) : new Response(null, { status: 204 });
  });
  await applyPlan(api, planMember(purchase, member(), assess(snapshot(), now), now));
  assert.equal(writes[0].body.is_syncing, true);
  assert.deepEqual(writes[0].body.tags, [{ name: SALE.tags.eligible, status: "inactive" }]);
  for (const w of writes) assert.equal(w.body.status, undefined);
  const final = writes[writes.length - 1].body.tags as { name: string; status: string }[];
  assert.equal(final.find(t => t.name === SALE.tags.eligible)?.status, "inactive");
});
test("read-only full reconciliation performs zero writes; errors do not leak private payloads", async () => {
  class FakeApi extends RetentionApi {
    override async verifyFields() {} override async login() {}
    override async purchases() { return [purchase]; }
    override async clients() { return new Map([[purchase.uniqueId, client]]); }
    override async previousMembers() { return []; }
    override async member() { return member(); }
    override async snapshot() { return snapshot(); }
    override async mc(): Promise<unknown> { throw new Error("MUTATION ATTEMPT"); }
  }
  const result = await syncRetention(config, false, now, new FakeApi(config, now));
  assert.equal(result.eligible, 1); assert.equal(result.applied, 0); assert.equal(result.calls.writes, 0); assert.equal(result.emailsSent, 0);
  assert.doesNotMatch(JSON.stringify(result), /student@example|custom-42|100000001/);
});
test("a refunded/replaced purchase selects the single paid contract; unsubscribed/archived contacts stay out", async () => {
  class FakeApi extends RetentionApi {
    override async verifyFields() {} override async login() {}
    override async purchases() { return [{ ...purchase, contractId: "122", paid: false }, purchase]; }
    override async clients() { return new Map([[purchase.uniqueId, client]]); }
    override async previousMembers() { return []; }
    override async member() { return member(); }
    override async snapshot(p: Purchase) { assert.equal(p.contractId, "123"); return snapshot(); }
  }
  const result = await syncRetention(config, false, now, new FakeApi(config, now));
  assert.equal(result.eligible, 1); assert.equal(result.purchases, 2); assert.equal(result.paidPurchases, 1);
});
test("cron rejects unauthorized calls and preview/off modes make no API requests", async () => {
  const { GET } = await import("../src/app/api/cron/membership-retention/route");
  const prior = { secret: process.env.CRON_SECRET, env: process.env.VERCEL_ENV, mode: process.env.MEMBERSHIP_RETENTION_MODE };
  process.env.CRON_SECRET = "test-secret";
  try {
    assert.equal((await GET(new Request("https://example.test"))).status, 401);
    process.env.VERCEL_ENV = "preview"; process.env.MEMBERSHIP_RETENTION_MODE = "tags";
    const response = await GET(new Request("https://example.test", { headers: { authorization: "Bearer test-secret" } }));
    assert.equal(response.status, 200); assert.deepEqual(await response.json(), { status: "disabled", emailsSent: 0 });
  } finally {
    for (const [key, value] of Object.entries({ CRON_SECRET: prior.secret, VERCEL_ENV: prior.env, MEMBERSHIP_RETENTION_MODE: prior.mode })) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});
