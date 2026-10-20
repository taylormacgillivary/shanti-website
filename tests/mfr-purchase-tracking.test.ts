import assert from "node:assert/strict";
import { createHash, createHmac } from "node:crypto";
import { test } from "node:test";
import {
  getTrackingConfig, MFR_COURSE, PurchaseTracker, receiptFromSale, receiptFromWebhook,
  saleDay, validDay, validWebhookSignature, type TrackingConfig,
} from "../src/lib/mfr-purchase-tracking";
import { POST, HEAD } from "../src/app/api/mindbody/purchases/route";
import { GET as reconcileRoute } from "../src/app/api/cron/mfr-purchases/route";

const config: TrackingConfig = {
  mindbodyKey: "test-mb", sourceName: "test", mailchimpKey: "test-mc",
  mailchimpServer: "us18", audienceId: "audience", firstPurchaseDay: "2026-09-01",
};
const webhook = (overrides: Record<string, unknown> = {}) => ({
  eventId: "clientSale.created", eventSchemaVersion: 1, messageId: "test-receipt",
  eventData: {
    siteId: 11233, saleId: 101, saleDateTime: "2026-10-14T15:00:00Z", purchasingClientId: "payer",
    items: [{ itemId: 1283, type: "Service", quantity: 1, amountPaid: 150, recipientClientId: "student" }],
    ...overrides,
  },
});
const sale = (overrides: Record<string, unknown> = {}) => ({
  Id: 101, SaleDateTime: "2026-10-14T12:00:00", ClientId: "payer", RecipientClientId: "student",
  PurchasedItems: [{ Id: "1283", IsService: true, Quantity: 1, TotalAmount: 150, Returned: false, RecipientClientId: "student" }],
  ...overrides,
});
const json = (value: unknown, status = 200) => Response.json(value, { status });

function mockService(options: {
  status?: string; tags?: string[]; email?: string; missingMember?: boolean; missingClient?: boolean;
  audienceName?: string; failTag?: boolean; pages?: unknown[][];
} = {}) {
  const calls: { url: URL; method: string; body?: unknown; headers: Headers }[] = [];
  const tagged = new Set(options.tags ?? []);
  const fetcher: typeof fetch = async (input, init) => {
    const url = new URL(String(input));
    const method = init?.method || "GET";
    const body = init?.body ? JSON.parse(String(init.body)) : undefined;
    calls.push({ url, method, body, headers: new Headers(init?.headers) });
    if (url.pathname === "/3.0/lists/audience") {
      return json({ id: "audience", name: options.audienceName ?? MFR_COURSE.audienceName });
    }
    if (url.pathname.endsWith("/client/clients")) {
      return json({ Clients: options.missingClient ? [] : [{ Id: url.searchParams.get("ClientIds"), Email: options.email ?? " Student@Example.com " }] });
    }
    if (url.pathname.endsWith("/sale/sales")) {
      const pages = options.pages ?? [[sale()]];
      const offset = Number(url.searchParams.get("Offset"));
      let count = 0;
      const page = pages.find(p => { const isPage = count === offset; count += p.length; return isPage; }) ?? [];
      return json({ Sales: page, PaginationResponse: { TotalResults: pages.flat().length } });
    }
    if (url.pathname.endsWith("/tags") && method === "POST") {
      if (options.failTag) return json({ detail: "private vendor response" }, 429);
      for (const tag of body.tags) tagged.add(tag.name);
      return new Response(null, { status: 204 });
    }
    if (url.pathname.includes("/members/")) {
      return options.missingMember ? json({}, 404) : json({ status: options.status ?? "subscribed", tags: [...tagged].map(name => ({ name })) });
    }
    throw new Error(`Unexpected test request: ${url.pathname}`);
  };
  return { fetcher, calls, tagged };
}

test("signature requires the exact raw body and matching Mindbody secret", () => {
  const body = JSON.stringify(webhook());
  const signature = `sha256=${createHmac("sha256", "secret").update(body).digest("base64")}`;
  assert.equal(validWebhookSignature(body, signature, "secret"), true);
  assert.equal(validWebhookSignature(`${body} `, signature, "secret"), false);
  assert.equal(validWebhookSignature(body, signature, "wrong"), false);
  assert.equal(validWebhookSignature(body, null, "secret"), false);
  assert.equal(validWebhookSignature(body, "sha256=x", "secret"), false);
});

test("course configuration fails closed for missing cutoff, wrong business, and invalid dates", () => {
  const env = {
    MINDBODY_SITE_ID: "11233", MINDBODY_API_KEY: "key", MAILCHIMP_API_KEY: "key",
    MAILCHIMP_SERVER_PREFIX: "us18", MAILCHIMP_NEWSLETTER_AUDIENCE_ID: "audience", MFR_PURCHASES_SINCE: "2026-09-01",
  };
  assert.equal(getTrackingConfig(env).firstPurchaseDay, "2026-09-01");
  assert.throws(() => getTrackingConfig({ ...env, MFR_PURCHASES_SINCE: "" }));
  assert.throws(() => getTrackingConfig({ ...env, MINDBODY_SITE_ID: "999" }));
  assert.throws(() => getTrackingConfig({ ...env, MAILCHIMP_SERVER_PREFIX: "bad.example" }));
  assert.throws(() => getTrackingConfig({ ...env, MFR_PURCHASES_SINCE: "2027-02-01" }));
  assert.equal(validDay("2026-02-30"), false);
});

test("sale cutoff uses Halifax calendar dates for UTC webhooks and business-local API dates", () => {
  assert.equal(saleDay("2026-09-01T01:00:00Z"), "2026-08-31");
  assert.equal(saleDay("2026-09-01T03:00:00Z"), "2026-09-01");
  assert.equal(saleDay("2027-02-01T03:59:59Z"), "2027-01-31");
  assert.equal(saleDay("2026-09-01T00:00:00"), "2026-09-01");
  assert.throws(() => saleDay("2026-02-30T00:00:00Z"));
});

test("webhook tags the course recipient, not a different payer", () => {
  assert.deepEqual(receiptFromWebhook(webhook(), config)?.recipients, ["student"]);
  assert.deepEqual(receiptFromSale(sale(), config)?.recipients, ["student"]);
});

for (const [productId, amount] of [[1344, 695], [1285, 795]]) {
  test(`full-payment option ${productId} qualifies in notifications and historical receipts without a deposit`, () => {
    const item = { itemId: productId, type: "Service", quantity: 1, amountPaid: amount, recipientClientId: "student" };
    const ledgerItem = { Id: String(productId), IsService: true, Quantity: 1, TotalAmount: amount, RecipientClientId: "student" };
    assert.deepEqual(receiptFromWebhook(webhook({ items: [item] }), config)?.recipients, ["student"]);
    assert.deepEqual(receiptFromSale(sale({ PurchasedItems: [ledgerItem] }), config)?.recipients, ["student"]);
    assert.equal(receiptFromSale(sale({ PurchasedItems: [{ ...ledgerItem, Returned: true }] }), config), null);
    assert.equal(receiptFromWebhook(webhook({ items: [{ ...item, quantity: -1, amountPaid: -amount }] }), config), null);
    assert.equal(receiptFromWebhook(webhook({ items: [{ ...item, type: "Product" }] }), config), null);
    assert.equal(receiptFromWebhook(webhook({ saleDateTime: "2026-08-31T12:00:00Z", items: [item] }), config), null);
    assert.ok(receiptFromWebhook(webhook({ items: [{ ...item, amountPaid: 0 }] }), config));
  });
}

test("receipt recipient falls back to payer only when no recipient is supplied", () => {
  const event = webhook({ items: [{ itemId: 1283, type: "Service", quantity: 1, amountPaid: 150 }] });
  assert.deepEqual(receiptFromWebhook(event, config)?.recipients, ["payer"]);
});

test("non-MFR, wrong-business, old and future-intake receipts are ignored", () => {
  assert.equal(receiptFromWebhook(webhook({ siteId: 999 }), config), null);
  assert.equal(receiptFromWebhook({ ...webhook(), eventId: "client.updated" }, config), null);
  assert.equal(receiptFromWebhook(webhook({ saleDateTime: "2026-08-31T12:00:00Z" }), config), null);
  assert.equal(receiptFromWebhook(webhook({ saleDateTime: "2027-02-01T12:00:00Z" }), config), null);
  assert.equal(receiptFromWebhook(webhook({ items: [{ itemId: 1594, type: "Service", quantity: 1, amountPaid: 40 }] }), config), null);
  assert.equal(receiptFromWebhook(webhook({ items: [{ itemId: 1123, type: "Service", quantity: 1, amountPaid: 545 }] }), config), null);
  assert.equal(receiptFromWebhook(webhook({ items: [{ itemId: 1283, type: "Product", quantity: 1, amountPaid: 150 }] }), config), null);
});

test("refunds and negative quantities do not add registration tags", () => {
  assert.equal(receiptFromSale(sale({ PurchasedItems: [{ Id: 1283, IsService: true, Quantity: 1, TotalAmount: 150, Returned: true }] }), config), null);
  assert.equal(receiptFromSale(sale({ PurchasedItems: [{ Id: 1283, IsService: true, Quantity: -1, TotalAmount: -150 }] }), config), null);
  assert.equal(receiptFromWebhook(webhook({ items: [{ itemId: 1283, type: "Service", quantity: -1, amountPaid: -150 }] }), config), null);
});

test("valid zero-price discounted registrations are accepted", () => {
  assert.ok(receiptFromWebhook(webhook({ items: [{ itemId: 1283, type: "Service", quantity: 1, amountPaid: 0 }] }), config));
});

test("malformed target receipts fail rather than silently disappear", () => {
  assert.throws(() => receiptFromWebhook(webhook({ items: "invalid" }), config));
  assert.throws(() => receiptFromWebhook({ ...webhook(), eventSchemaVersion: 2 }, config));
  assert.throws(() => receiptFromSale(sale({ SaleDateTime: "invalid" }), config));
});

test("tag writes normalize email and do not change subscription status, launch tags, or automations", async () => {
  const mock = mockService({ status: "unsubscribed" });
  assert.equal((await new PurchaseTracker(config, mock.fetcher).syncClient("student")).status, "tagged");
  const writes = mock.calls.filter(c => c.method !== "GET");
  assert.equal(writes.length, 1);
  const hash = createHash("md5").update("student@example.com").digest("hex");
  assert.equal(writes[0].url.pathname, `/3.0/lists/audience/members/${hash}/tags`);
  assert.deepEqual(writes[0].body, { tags: [{ name: MFR_COURSE.registeredTag, status: "active" }] });
});

test("duplicate notifications are idempotent", async () => {
  const mock = mockService();
  const tracker = new PurchaseTracker(config, mock.fetcher);
  const receipt = receiptFromWebhook(webhook(), config)!;
  assert.equal((await tracker.syncReceipts([receipt, receipt])).tagged, 1);
  assert.equal((await tracker.syncReceipts([receipt])).already_tagged, 1);
  assert.equal(mock.calls.filter(c => c.method === "POST").length, 1);
});

test("missing contacts are flagged; no new marketing subscription is created", async () => {
  const mock = mockService({ missingMember: true });
  assert.equal((await new PurchaseTracker(config, mock.fetcher).syncClient("student")).status, "not_in_audience");
  assert.equal(mock.calls.filter(c => c.method !== "GET").length, 0);
});

test("clients without an email are flagged without attempting a Mailchimp member write", async () => {
  const mock = mockService({ email: "" });
  assert.equal((await new PurchaseTracker(config, mock.fetcher).syncClient("student")).status, "missing_email");
  assert.equal(mock.calls.filter(c => c.method !== "GET").length, 0);
});

test("wrong Mailchimp audience blocks all tag writes", async () => {
  const mock = mockService({ audienceName: "YTT Local" });
  await assert.rejects(() => new PurchaseTracker(config, mock.fetcher).syncClient("student"), /wrong_mailchimp_audience/);
  assert.equal(mock.calls.filter(c => c.method !== "GET").length, 0);
});

test("dry runs perform no writes", async () => {
  const mock = mockService();
  const result = await new PurchaseTracker(config, mock.fetcher).reconcile(true, new Date("2026-10-14T12:00:00Z"));
  assert.equal(result.would_tag, 1);
  assert.equal(result.tagged, 0);
  assert.equal(mock.calls.filter(c => c.method !== "GET").length, 0);
});

test("daily reconciliation paginates the full intake window and catches missing notifications", async () => {
  const mock = mockService({ pages: [
    [sale({ Id: 101 })],
    [sale({ Id: 102, PurchasedItems: [{ Id: 1344, IsService: true, Quantity: 1, TotalAmount: 695, RecipientClientId: "student-2" }] })],
    [sale({ Id: 103, PurchasedItems: [{ Id: 1285, IsService: true, Quantity: 1, TotalAmount: 795, RecipientClientId: "student-3" }] })],
  ] });
  const result = await new PurchaseTracker(config, mock.fetcher).reconcile(false, new Date("2026-10-14T12:00:00Z"));
  assert.equal(result.receipts, 3);
  assert.equal(result.recipients, 3);
  const calls = mock.calls.filter(c => c.url.pathname.endsWith("/sale/sales"));
  assert.equal(calls.length, 3);
  assert.equal(calls[1].url.searchParams.get("Offset"), "1");
  assert.equal(calls[2].url.searchParams.get("Offset"), "2");
  assert.equal(calls[0].url.searchParams.get("StartSaleDateTime"), "2026-09-01T00:00:00");
});

test("upstream failures remain retryable and do not produce successful tag counts", async () => {
  const mock = mockService({ failTag: true });
  const result = await new PurchaseTracker(config, mock.fetcher).syncReceipts([receiptFromWebhook(webhook(), config)!]);
  assert.equal(result.failed, 1);
  assert.equal(result.tagged, 0);
});

test("no writes occur after request deadline", async () => {
  const mock = mockService();
  await assert.rejects(() => new PurchaseTracker(config, mock.fetcher, { timeoutMs: 0 }).syncClient("student"), /deadline_exceeded/);
  assert.equal(mock.calls.length, 0);
});

test("public webhook and cron reject unauthenticated calls without external requests", async () => {
  const previous = { enabled: process.env.MFR_PURCHASE_TRACKING_ENABLED, key: process.env.MINDBODY_WEBHOOK_SIGNATURE_KEY, cron: process.env.CRON_SECRET };
  process.env.MFR_PURCHASE_TRACKING_ENABLED = "true";
  process.env.MINDBODY_WEBHOOK_SIGNATURE_KEY = "secret";
  process.env.CRON_SECRET = "cron-secret";
  try {
    assert.equal(HEAD().status, 200);
    assert.equal((await POST(new Request("https://example.test/api/mindbody/purchases", { method: "POST", body: JSON.stringify(webhook()) }))).status, 401);
    assert.equal((await reconcileRoute(new Request("https://example.test/api/cron/mfr-purchases"))).status, 401);
    assert.equal((await POST(new Request("https://example.test/api/mindbody/purchases", { method: "POST", headers: { "content-length": "200000" }, body: "x" }))).status, 413);
  } finally {
    for (const [key, value] of Object.entries({ MFR_PURCHASE_TRACKING_ENABLED: previous.enabled, MINDBODY_WEBHOOK_SIGNATURE_KEY: previous.key, CRON_SECRET: previous.cron })) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
});

async function withRouteEnvironment(run: () => Promise<void>) {
  const values: Record<string, string> = {
    MINDBODY_SITE_ID: "11233", MINDBODY_API_KEY: "test-mb", MAILCHIMP_API_KEY: "test-mc",
    MAILCHIMP_SERVER_PREFIX: "us18", MAILCHIMP_NEWSLETTER_AUDIENCE_ID: "audience",
    MFR_PURCHASES_SINCE: "2026-09-01", MFR_PURCHASE_TRACKING_ENABLED: "true",
    MINDBODY_WEBHOOK_SIGNATURE_KEY: "secret", CRON_SECRET: "cron-secret",
  };
  const previous = Object.fromEntries(Object.keys(values).map(key => [key, process.env[key]]));
  Object.assign(process.env, values);
  try { await run(); } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
  }
}

function signedRequest(payload: unknown): Request {
  const body = JSON.stringify(payload);
  return new Request("https://example.test/api/mindbody/purchases", {
    method: "POST", body,
    headers: { "x-mindbody-signature": `sha256=${createHmac("sha256", "secret").update(body).digest("base64")}` },
  });
}

test("signed webhook processes a purchase through the complete route", async () => {
  await withRouteEnvironment(async () => {
    const previous = globalThis.fetch;
    const mock = mockService();
    globalThis.fetch = mock.fetcher;
    try {
      const response = await POST(signedRequest(webhook()));
      assert.equal(response.status, 200);
      assert.equal((await response.json()).tagged, 1);
      assert.equal(mock.calls.filter(c => c.method === "POST").length, 1);
    } finally { globalThis.fetch = previous; }
  });
});

for (const [productId, amount] of [[1344, 695], [1285, 795]]) {
  test(`signed full-payment webhook ${productId} applies the registered tag and is safe to retry`, async () => {
    await withRouteEnvironment(async () => {
      const previous = globalThis.fetch;
      const mock = mockService();
      globalThis.fetch = mock.fetcher;
      try {
        const event = webhook({ items: [{ itemId: productId, type: "Service", quantity: 1, amountPaid: amount, recipientClientId: "student" }] });
        const first = await POST(signedRequest(event));
        assert.equal(first.status, 200);
        assert.equal((await first.json()).tagged, 1);
        const retry = await POST(signedRequest(event));
        assert.equal(retry.status, 200);
        assert.equal((await retry.json()).already_tagged, 1);
        assert.equal(mock.calls.filter(c => c.method === "POST").length, 1);
        assert.ok(mock.tagged.has("MFR YTT 2027 - Registered"));
      } finally { globalThis.fetch = previous; }
    });
  });
}

test("signed unrelated or wrong-site events are acknowledged without any vendor requests", async () => {
  await withRouteEnvironment(async () => {
    const previous = globalThis.fetch;
    const mock = mockService();
    globalThis.fetch = mock.fetcher;
    try {
      assert.equal((await POST(signedRequest({ ...webhook(), eventId: "client.updated" }))).status, 204);
      assert.equal((await POST(signedRequest(webhook({ siteId: 999 })))).status, 204);
      assert.equal(mock.calls.length, 0);
    } finally { globalThis.fetch = previous; }
  });
});

test("signed webhook returns a retryable failure when Mailchimp rejects the tag", async () => {
  await withRouteEnvironment(async () => {
    const previous = globalThis.fetch;
    globalThis.fetch = mockService({ failTag: true }).fetcher;
    try { assert.equal((await POST(signedRequest(webhook()))).status, 503); }
    finally { globalThis.fetch = previous; }
  });
});

test("feature flag prevents signed webhook and authenticated cron from writing", async () => {
  await withRouteEnvironment(async () => {
    process.env.MFR_PURCHASE_TRACKING_ENABLED = "false";
    const previous = globalThis.fetch;
    const mock = mockService();
    globalThis.fetch = mock.fetcher;
    try {
      assert.equal((await POST(signedRequest(webhook()))).status, 503);
      assert.equal((await reconcileRoute(new Request("https://example.test/api/cron/mfr-purchases", { headers: { authorization: "Bearer cron-secret" } }))).status, 503);
      assert.equal(mock.calls.length, 0);
    } finally { globalThis.fetch = previous; }
  });
});
