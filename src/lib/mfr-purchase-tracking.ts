import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const MFR_COURSE = {
  siteId: "11233",
  productIds: ["1283", "1344", "1285"], // Deposit, early-bird full payment, regular full payment.
  audienceName: "Shanti Yoga All Emails",
  registeredTag: "MFR YTT 2027 - Registered",
  lastPurchaseDay: "2027-01-31",
} as const;

const registrationProductIds = new Set<string>(MFR_COURSE.productIds);

export interface TrackingConfig {
  mindbodyKey: string;
  sourceName: string;
  mailchimpKey: string;
  mailchimpServer: string;
  audienceId: string;
  firstPurchaseDay: string;
}

export class TrackingError extends Error {
  constructor(public readonly stage: string, public readonly status?: number) {
    super(`MFR purchase tracking: ${stage}${status ? ` (${status})` : ""}`);
  }
}

export function validDay(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
    && Number.isFinite(Date.parse(`${value}T00:00:00Z`))
    && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
}

export function getTrackingConfig(env: Record<string, string | undefined> = process.env): TrackingConfig {
  const required = (name: string) => {
    const value = env[name]?.trim();
    if (!value) throw new TrackingError(`missing_${name}`);
    return value;
  };
  if (required("MINDBODY_SITE_ID") !== MFR_COURSE.siteId) {
    throw new TrackingError("wrong_mindbody_site");
  }
  const firstPurchaseDay = required("MFR_PURCHASES_SINCE");
  if (!validDay(firstPurchaseDay) || firstPurchaseDay > MFR_COURSE.lastPurchaseDay) {
    throw new TrackingError("invalid_purchase_start_day");
  }
  const mailchimpServer = required("MAILCHIMP_SERVER_PREFIX");
  if (!/^us\d+$/.test(mailchimpServer)) throw new TrackingError("invalid_mailchimp_server");
  const audienceId = required("MAILCHIMP_NEWSLETTER_AUDIENCE_ID");
  if (!/^[a-zA-Z0-9]+$/.test(audienceId)) throw new TrackingError("invalid_audience_id");
  return {
    mindbodyKey: required("MINDBODY_API_KEY"),
    sourceName: env.MINDBODY_API_SOURCE_NAME || "ShantiMFRPurchaseTracking",
    mailchimpKey: required("MAILCHIMP_API_KEY"),
    mailchimpServer,
    audienceId,
    firstPurchaseDay,
  };
}

export function secureEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function validWebhookSignature(body: string, signature: string | null, key: string): boolean {
  if (!key || !signature) return false;
  const expected = `sha256=${createHmac("sha256", key).update(body, "utf8").digest("base64")}`;
  return secureEqual(signature, expected);
}

/** Mindbody's Public API uses business-local dates; webhooks use UTC dates. */
export function saleDay(value: string): string {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/.test(value)) {
    throw new TrackingError("invalid_sale_date");
  }
  if (!validDay(value.slice(0, 10)) || !Number.isFinite(Date.parse(value))) {
    throw new TrackingError("invalid_sale_date");
  }
  if (!/(?:Z|[+-]\d{2}:\d{2})$/.test(value)) return value.slice(0, 10);
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Halifax", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(new Date(value));
  const part = (type: string) => parts.find(p => p.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

interface Receipt {
  id: string;
  date: string;
  recipients: string[];
}

function inCourseWindow(date: string, config: TrackingConfig): boolean {
  const day = saleDay(date);
  return day >= config.firstPurchaseDay && day <= MFR_COURSE.lastPurchaseDay;
}

function clientId(value: unknown): string | undefined {
  if (typeof value === "string" || (typeof value === "number" && Number.isFinite(value))) {
    const id = String(value).trim();
    if (id.length > 0 && id.length <= 128 && !/[\x00-\x1f\x7f]/.test(id)) return id;
  }
}

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new TrackingError("invalid_receipt");
  return value as Record<string, unknown>;
}

function positiveQuantity(value: unknown): boolean {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

export function receiptFromWebhook(payload: unknown, config: TrackingConfig): Receipt | null {
  const event = record(payload);
  if (event.eventId !== "clientSale.created") return null;
  if (event.eventSchemaVersion !== 1) throw new TrackingError("unsupported_event_schema");
  const data = record(event.eventData);
  if (String(data.siteId) !== MFR_COURSE.siteId) return null;
  if (typeof data.saleDateTime !== "string" || !Array.isArray(data.items)) {
    throw new TrackingError("invalid_sale_payload");
  }
  if (!inCourseWindow(data.saleDateTime, config)) return null;
  const id = clientId(data.saleId);
  if (!id) throw new TrackingError("missing_sale_id");
  const recipients = new Set<string>();
  for (const value of data.items) {
    const item = record(value);
    if (!registrationProductIds.has(String(item.itemId)) || item.type !== "Service") continue;
    if (!positiveQuantity(item.quantity) || typeof item.amountPaid !== "number" || !Number.isFinite(item.amountPaid) || item.amountPaid < 0) continue;
    // The recipient can differ from the purchaser, e.g. a gift or staff purchase.
    const recipient = clientId(item.recipientClientId) ?? clientId(data.purchasingClientId);
    if (!recipient) throw new TrackingError("missing_recipient");
    recipients.add(recipient);
  }
  return recipients.size ? { id, date: data.saleDateTime, recipients: [...recipients] } : null;
}

export function receiptFromSale(payload: unknown, config: TrackingConfig): Receipt | null {
  const sale = record(payload);
  if (typeof sale.SaleDateTime !== "string" || !Array.isArray(sale.PurchasedItems)) {
    throw new TrackingError("invalid_sale_record");
  }
  if (!inCourseWindow(sale.SaleDateTime, config)) return null;
  const id = clientId(sale.Id);
  if (!id) throw new TrackingError("missing_sale_id");
  const recipients = new Set<string>();
  for (const value of sale.PurchasedItems) {
    const item = record(value);
    if (!registrationProductIds.has(String(item.Id)) || item.IsService !== true || item.Returned === true) continue;
    if (!positiveQuantity(item.Quantity) || typeof item.TotalAmount !== "number" || !Number.isFinite(item.TotalAmount) || item.TotalAmount < 0) continue;
    const recipient = clientId(item.RecipientClientId) ?? clientId(sale.RecipientClientId) ?? clientId(sale.ClientId);
    if (!recipient) throw new TrackingError("missing_recipient");
    recipients.add(recipient);
  }
  return recipients.size ? { id, date: sale.SaleDateTime, recipients: [...recipients] } : null;
}

type Fetch = typeof fetch;
export type MatchStatus = "tagged" | "already_tagged" | "not_in_audience" | "missing_email" | "missing_client" | "would_tag";
export interface MatchResult { clientId: string; status: MatchStatus }
export interface SyncSummary {
  receipts: number;
  recipients: number;
  tagged: number;
  already_tagged: number;
  would_tag: number;
  needs_review: number;
  failed: number;
}

/** Only the tag endpoint is written. Subscription status, launch tags and flows are never changed. */
export class PurchaseTracker {
  private audienceVerified = false;
  private readonly deadline: number;
  constructor(
    private readonly config: TrackingConfig,
    private readonly fetcher: Fetch = fetch,
    options: { timeoutMs?: number } = {},
  ) {
    this.deadline = Date.now() + (options.timeoutMs ?? 240_000);
  }

  private async request(stage: string, url: string, init: RequestInit = {}, allow404 = false): Promise<unknown> {
    const remaining = this.deadline - Date.now();
    if (remaining < 100) throw new TrackingError("deadline_exceeded");
    let response: Response;
    try {
      response = await this.fetcher(url, {
        ...init, cache: "no-store", signal: AbortSignal.timeout(Math.min(remaining, 10_000)),
      });
    } catch {
      throw new TrackingError(`${stage}_unavailable`);
    }
    if (allow404 && response.status === 404) return null;
    if (!response.ok) throw new TrackingError(stage, response.status);
    if (response.status === 204) return null;
    try { return await response.json(); } catch { throw new TrackingError(`${stage}_invalid_response`); }
  }

  private mindbody(path: string): Promise<unknown> {
    return this.request("mindbody_read", `https://api.mindbodyonline.com/public/v6${path}`, {
      headers: {
        "Api-Key": this.config.mindbodyKey,
        SiteId: MFR_COURSE.siteId,
        "User-Agent": this.config.sourceName,
      },
    });
  }

  private mailchimp(path: string, init: RequestInit = {}, allow404 = false): Promise<unknown> {
    return this.request("mailchimp", `https://${this.config.mailchimpServer}.api.mailchimp.com/3.0${path}`, {
      ...init,
      headers: {
        Authorization: `Basic ${Buffer.from(`shanti:${this.config.mailchimpKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
    }, allow404);
  }

  private async verifyAudience(): Promise<void> {
    if (this.audienceVerified) return;
    const audience = record(await this.mailchimp(`/lists/${this.config.audienceId}?fields=id,name`));
    if (audience.name !== MFR_COURSE.audienceName || audience.id !== this.config.audienceId) {
      throw new TrackingError("wrong_mailchimp_audience");
    }
    this.audienceVerified = true;
  }

  async syncClient(id: string, dryRun = false): Promise<MatchResult> {
    await this.verifyAudience();
    const response = record(await this.mindbody(`/client/clients?ClientIds=${encodeURIComponent(id)}&Limit=1`));
    if (!Array.isArray(response.Clients)) throw new TrackingError("invalid_clients_response");
    const client = response.Clients.map(record).find(c => String(c.Id) === id);
    if (!client) return { clientId: id, status: "missing_client" };
    const email = typeof client.Email === "string" ? client.Email.trim().toLowerCase() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { clientId: id, status: "missing_email" };
    const hash = createHash("md5").update(email).digest("hex");
    const path = `/lists/${this.config.audienceId}/members/${hash}`;
    const member = await this.mailchimp(`${path}?fields=id,status,tags`, {}, true);
    if (!member) return { clientId: id, status: "not_in_audience" };
    const tags = record(member).tags;
    if (!Array.isArray(tags)) throw new TrackingError("invalid_mailchimp_member");
    if (tags.some(tag => record(tag).name === MFR_COURSE.registeredTag)) {
      return { clientId: id, status: "already_tagged" };
    }
    if (dryRun) return { clientId: id, status: "would_tag" };
    await this.mailchimp(`${path}/tags`, {
      method: "POST", body: JSON.stringify({ tags: [{ name: MFR_COURSE.registeredTag, status: "active" }] }),
    });
    return { clientId: id, status: "tagged" };
  }

  async syncReceipts(receipts: Receipt[], dryRun = false): Promise<SyncSummary> {
    const ids = [...new Set(receipts.flatMap(r => r.recipients))];
    const summary: SyncSummary = {
      receipts: receipts.length, recipients: ids.length,
      tagged: 0, already_tagged: 0, would_tag: 0, needs_review: 0, failed: 0,
    };
    for (const id of ids) {
      try {
        const result = await this.syncClient(id, dryRun);
        if (result.status === "tagged" || result.status === "already_tagged" || result.status === "would_tag") {
          summary[result.status]++;
        } else {
          summary.needs_review++;
          console.warn("mfr_purchase_review", { clientId: id, reason: result.status });
        }
      } catch (error) {
        summary.failed++;
        // Log references and failure stages, never email addresses, payloads or API responses.
        console.error("mfr_purchase_failed", { clientId: id, stage: error instanceof TrackingError ? error.stage : "unexpected" });
      }
    }
    return summary;
  }

  async reconcile(dryRun = false, now = new Date()): Promise<SyncSummary> {
    await this.verifyAudience();
    const today = saleDay(now.toISOString());
    const lastDay = today < MFR_COURSE.lastPurchaseDay ? today : MFR_COURSE.lastPurchaseDay;
    const receipts: Receipt[] = [];
    if (lastDay < this.config.firstPurchaseDay) return this.syncReceipts([], dryRun);
    let offset = 0;
    for (let page = 0; page < 500; page++) {
      const query = new URLSearchParams({
        StartSaleDateTime: `${this.config.firstPurchaseDay}T00:00:00`,
        EndSaleDateTime: `${lastDay}T23:59:59`, Limit: "200", Offset: String(offset),
      });
      const data = record(await this.mindbody(`/sale/sales?${query}`));
      if (!Array.isArray(data.Sales)) throw new TrackingError("invalid_sales_response");
      for (const sale of data.Sales) {
        const receipt = receiptFromSale(sale, this.config);
        if (receipt) receipts.push(receipt);
      }
      const pagination = record(data.PaginationResponse);
      const total = pagination.TotalResults;
      if (typeof total !== "number" || !Number.isSafeInteger(total) || total < 0) {
        throw new TrackingError("invalid_sales_pagination");
      }
      offset += data.Sales.length;
      if (offset >= total) return this.syncReceipts(receipts, dryRun);
      if (!data.Sales.length) throw new TrackingError("incomplete_sales_page");
    }
    throw new TrackingError("sales_page_limit_exceeded");
  }
}

export function safeFailure(error: unknown): { stage: string; status?: number } {
  return error instanceof TrackingError ? { stage: error.stage, status: error.status } : { stage: "unexpected" };
}
