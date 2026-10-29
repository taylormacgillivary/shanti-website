import { SALE, RetentionError, addMonths, emailHash, localTime, mindbodyDay, type Client, type Contract, type Purchase, type Snapshot, type Visit } from "./rules";

export interface RetentionConfig {
  mindbodyKey: string; sourceName: string; username: string; password: string;
  mailchimpKey: string; mode: "read-only" | "tags";
}
export function getConfig(env: Record<string, string | undefined> = process.env): RetentionConfig {
  const get = (key: string) => {
    const value = env[key];
    if (!value) throw new RetentionError(`missing_${key}`);
    return value;
  };
  if (get("MINDBODY_SITE_ID") !== SALE.siteId || get("MAILCHIMP_NEWSLETTER_AUDIENCE_ID") !== SALE.audienceId
    || get("MAILCHIMP_SERVER_PREFIX") !== SALE.server) throw new RetentionError("wrong_account");
  const mode = env.MEMBERSHIP_RETENTION_MODE || "read-only";
  if (mode !== "read-only" && mode !== "tags") throw new RetentionError("invalid_mode");
  // Keep this job's Production-only entries separate from legacy site settings.
  // Production never silently falls back to an older shared cloud login.
  const dedicated = env.VERCEL_ENV === "production" || !!env.RETENTION_MINDBODY_USERNAME;
  return { mindbodyKey: get("MINDBODY_API_KEY"), sourceName: env.MINDBODY_API_SOURCE_NAME || "ShantiRetention",
    username: get(dedicated ? "RETENTION_MINDBODY_USERNAME" : "MINDBODY_USERNAME"),
    password: get(dedicated ? "RETENTION_MINDBODY_PASSWORD" : "MINDBODY_PASSWORD"), mailchimpKey: get("MAILCHIMP_API_KEY"), mode };
}
type Row = Record<string, unknown>;
export function object(value: unknown): Row {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new RetentionError("invalid_response");
  return value as Row;
}
export function rows(value: unknown): Row[] {
  if (!Array.isArray(value)) throw new RetentionError("missing_response_list");
  return value.map(object);
}
function identifier(value: unknown): string {
  if ((typeof value !== "string" && typeof value !== "number") || !/^\d+$/.test(String(value))) throw new RetentionError("invalid_identifier");
  return String(value);
}
export interface Member {
  id: string; email_address: string; status: string; merge_fields: Record<string, string | number>;
  tags: { name: string }[];
}
const MERGE_TYPES = { SRSTAGE: "text", SRREASON: "text", SRSTATUS: "text", SRBILLAMT: "text", SRBILLDAY: "text",
  SRSTART: "date", SRLAST: "date", SRVIS21: "number", SRNEXT: "date", SRSYNC: "text" };
export class RetentionApi {
  private token = "";
  private deadline: number;
  calls = { mindbody: 0, mailchimp: 0, writes: 0 };
  paginationRechecks = 0;
  constructor(readonly config: RetentionConfig, readonly now = new Date(), private fetcher: typeof fetch = fetch,
    runBudgetMs = 240000) {
    if (!Number.isSafeInteger(runBudgetMs) || runBudgetMs < 30000 || runBudgetMs > 700000)
      throw new RetentionError("invalid_run_budget");
    this.deadline = Date.now() + runBudgetMs;
  }
  remainingMs(): number { return Math.max(0, this.deadline - Date.now()); }
  private async request(url: URL, service: "mindbody" | "mailchimp", method = "GET", body?: unknown, missingOkay = false): Promise<unknown> {
    if (Date.now() >= this.deadline) throw new RetentionError("run_deadline");
    const headers: Record<string, string> = { "Content-Type": "application/json", "User-Agent": this.config.sourceName };
    if (service === "mindbody") {
      headers["Api-Key"] = this.config.mindbodyKey; headers.SiteId = SALE.siteId;
      if (this.token) headers.Authorization = `Bearer ${this.token}`;
    } else headers.Authorization = `Bearer ${this.config.mailchimpKey}`;
    this.calls[service]++;
    let response: Response | undefined;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        response = await this.fetcher(url, { method, headers, body: body === undefined ? undefined : JSON.stringify(body),
          cache: "no-store", signal: AbortSignal.timeout(15000), redirect: "error" });
      } catch {
        if (method !== "GET" || attempt || Date.now() + 16000 >= this.deadline) throw new RetentionError(`${service}_transport`);
      }
      if (response && (![429, 500, 502, 503, 504].includes(response.status) || method !== "GET" || attempt)) break;
      const wait = Math.max(500, Number(response?.headers.get("retry-after") || 0) * 1000);
      if (wait > 5000 || Date.now() + wait + 15000 >= this.deadline) break;
      await new Promise(resolve => setTimeout(resolve, wait));
      this.calls[service]++;
    }
    if (!response) throw new RetentionError(`${service}_transport`);
    if (response.status === 404 && missingOkay) return null;
    if (!response.ok) {
      const endpoint = service === "mindbody" ? url.pathname.split("/").pop() : "member";
      throw new RetentionError(`${service}_${endpoint}_request`, response.status);
    }
    if (response.status === 204) return null;
    try { return await response.json(); } catch { throw new RetentionError(`${service}_response`); }
  }
  async mb(path: string, query: Record<string, string | number> = {}, method = "GET", body?: unknown): Promise<Row> {
    const url = new URL(`https://api.mindbodyonline.com/public/v6/${path}`);
    for (const [key, value] of Object.entries(query)) url.searchParams.set(key, String(value));
    return object(await this.request(url, "mindbody", method, body));
  }
  async mc(path: string, method = "GET", body?: unknown, missingOkay = false): Promise<unknown> {
    if (method !== "GET") {
      if (this.config.mode !== "tags") throw new RetentionError("writes_disabled");
      // This connector cannot subscribe anyone, send mail, or trigger/activate a journey.
      if (!new RegExp(`^lists/${SALE.audienceId}/members/[a-f0-9]{32}(?:/tags)?$`).test(path)
        || !["PATCH", "POST"].includes(method)) throw new RetentionError("write_not_allowed");
      const data = object(body);
      if (method === "PATCH" && (path.endsWith("/tags") || Object.keys(data).length !== 1 || !("merge_fields" in data)
        || Object.keys(object(data.merge_fields)).some(key => !(key in MERGE_TYPES)))) throw new RetentionError("unsafe_member_write");
      if (method === "POST" && (!path.endsWith("/tags") || data.is_syncing !== true
        || rows(data.tags).some(t => !Object.values(SALE.tags).includes(t.name as never)))) throw new RetentionError("unsafe_tag_write");
      this.calls.writes++;
    }
    return this.request(new URL(`https://${SALE.server}.api.mailchimp.com/3.0/${path}`), "mailchimp", method, body, missingOkay);
  }
  async login(): Promise<void> {
    const token = await this.mb("usertoken/issue", {}, "POST", { Username: this.config.username, Password: this.config.password });
    if (typeof token.AccessToken !== "string" || token.AccessToken.length < 10) throw new RetentionError("missing_staff_token");
    this.token = token.AccessToken;
  }
  async pages(path: string, field: string, query: Record<string, string | number>): Promise<Row[]> {
    const result: Row[] = [], seen = new Set<string>();
    let expected: number | undefined;
    for (let offset = 0; offset < 20000;) {
      const data = await this.mb(path, { ...query, Limit: 200, Offset: offset });
      const page = rows(data[field]), pagination = object(data.PaginationResponse);
      const total = pagination.TotalResults;
      if (!Number.isSafeInteger(total) || Number(total) < 0 || pagination.RequestedOffset !== offset) throw new RetentionError("invalid_pagination");
      // Live Shanti sales report a larger total than returned records (575 vs 571 on Oct 28).
      // On an explicit terminal empty page, independently re-read one bounded full
      // sales page and compare every record before accepting that discrepancy.
      // Attendance/client lists never use this exception.
      if (path === "sale/sales" && !page.length && total === 0 && expected !== undefined && result.length < expected && expected <= 1000) {
        const check = await this.mb(path, { ...query, Limit: 1000, Offset: 0 });
        const checked = rows(check[field]);
        if (checked.length === result.length && object(check.PaginationResponse).TotalResults === expected
          && checked.every(item => seen.has(String(item.Id))) && new Set(checked.map(item => String(item.Id))).size === checked.length) {
          this.paginationRechecks++;
          return result;
        }
        throw new RetentionError("sales_pagination_review");
      }
      // A changing result set is not a trustworthy zero-attendance snapshot. Retry next run.
      if (expected !== undefined && total !== expected) throw new RetentionError("changing_pagination");
      expected = Number(total);
      for (const item of page) {
        const key = String(item.Id);
        if (item.Id == null || seen.has(key)) throw new RetentionError("duplicate_page_item");
        seen.add(key); result.push(item);
      }
      if (result.length === expected) return result;
      if (!page.length || result.length > expected) throw new RetentionError("incomplete_pagination");
      offset += page.length;
    }
    throw new RetentionError("pagination_limit");
  }
  async purchases(): Promise<Purchase[]> {
    const snapshotEnd = localTime(this.now), intakeEnd = `${SALE.lastIntakeDay}T23:59:59`;
    const sales = await this.pages("sale/sales", "Sales", {
      // Re-read original sale records (their Returned flag changes after refunds).
      // A fixed cohort must not scan months of unrelated future transactions.
      StartSaleDateTime: `${SALE.firstDay}T00:00:00`, EndSaleDateTime: snapshotEnd < intakeEnd ? snapshotEnd : intakeEnd,
    });
    const groups = new Map<string, Purchase & { net: number; intake: boolean }>();
    const unclear = new Set<string>();
    for (const sale of sales) {
      const day = mindbodyDay(String(sale.SaleDateTime));
      for (const item of rows(sale.PurchasedItems)) {
        const product = String(item.Id);
        if (!(product in SALE.products) || item.IsService !== true) continue;
        const uid = identifier(item.RecipientClientId ?? sale.RecipientClientId ?? sale.ClientId);
        if (item.ContractId == null || Number(item.ContractId) <= 0) { unclear.add(uid); continue; }
        const contractId = identifier(item.ContractId), key = `${uid}:${contractId}`;
        const amount = item.TotalAmount, qty = item.Quantity;
        if (typeof amount !== "number" || !Number.isFinite(amount) || typeof qty !== "number" || !Number.isFinite(qty)) throw new RetentionError("invalid_sale_amount");
        const group = groups.get(key) || { uniqueId: uid, contractId, product, purchasedDay: day, paid: false, ambiguous: false, net: 0, intake: false };
        if (group.product !== product) group.ambiguous = true;
        if (day >= SALE.firstDay && day <= SALE.lastIntakeDay && qty > 0) {
          group.intake = true; group.purchasedDay = group.purchasedDay < day ? group.purchasedDay : day;
        }
        if (item.Returned !== true) group.net += amount;
        groups.set(key, group);
      }
    }
    const result = [...groups.values()].filter(g => g.intake);
    const counts = new Map<string, number>();
    for (const p of result.filter(p => p.net > 0)) counts.set(p.uniqueId, (counts.get(p.uniqueId) || 0) + 1);
    return result.map(p => ({ uniqueId: p.uniqueId, contractId: p.contractId, product: p.product,
      purchasedDay: p.purchasedDay, paid: p.net > 0, ambiguous: p.ambiguous || unclear.has(p.uniqueId) || (counts.get(p.uniqueId) || 0) > 1 }));
  }
  async clients(purchases: Purchase[]): Promise<Map<string, Client>> {
    const ids = [...new Set(purchases.map(p => p.uniqueId))], result = new Map<string, Client>();
    for (let start = 0; start < ids.length; start += 20) {
      const requested = ids.slice(start, start + 20), query: Record<string, string | number> = { IncludeInactive: "true" };
      requested.forEach((id, i) => { query[`UniqueIds[${i}]`] = id; });
      const clients = await this.pages("client/clients", "Clients", query);
      for (const row of clients) {
        const unique = identifier(row.UniqueId);
        if (!requested.includes(unique) || result.has(unique) || typeof row.Id !== "string" || typeof row.Active !== "boolean") throw new RetentionError("client_identity_mismatch");
        result.set(unique, { Id: row.Id, UniqueId: Number(unique), Email: typeof row.Email === "string" ? row.Email : undefined, Active: row.Active });
      }
    }
    return result;
  }
  async snapshot(purchase: Purchase, client: Client): Promise<Snapshot> {
    const common = { ClientId: client.Id };
    // Paginate both lists fully. An API error must never become 'zero visits'.
    const contracts = rows((await this.mb("client/clientcontracts", common)).Contracts) as unknown as Contract[];
    const visits = await this.pages("client/clientvisits", "Visits", { ...common, StartDate: SALE.firstDay, EndDate: localTime(this.now).slice(0, 10) });
    const matching = contracts.find(c => String(c.Id) === purchase.contractId);
    const programEnd = matching ? addMonths(mindbodyDay(matching.StartDate), 4) : localTime(new Date(this.now.getTime() + 150 * 86400000)).slice(0, 10);
    const tomorrow = localTime(new Date(this.now.getTime() + 86400000)).slice(0, 10);
    const schedule = await this.pages("client/clientschedule", "Visits", { ...common,
      StartDate: localTime(this.now).slice(0, 10), EndDate: programEnd > tomorrow ? programEnd : tomorrow });
    for (const row of [...visits, ...schedule]) {
      if (String(row.ClientUniqueId) !== String(client.UniqueId) || String(row.SiteId) !== SALE.siteId) throw new RetentionError("visit_identity_mismatch");
    }
    return { purchase, client, contracts, visits: visits as unknown as Visit[], schedule: schedule as unknown as Visit[] };
  }
  async member(email: string): Promise<Member | undefined> {
    const data = await this.mc(`lists/${SALE.audienceId}/members/${emailHash(email)}`, "GET", undefined, true);
    if (!data) return;
    const member = object(data);
    if (emailHash(String(member.email_address)) !== emailHash(email) || member.id !== emailHash(email)
      || typeof member.status !== "string") throw new RetentionError("mailchimp_identity_mismatch");
    object(member.merge_fields); rows(member.tags);
    return member as unknown as Member;
  }
  async verifyFields(): Promise<void> {
    const fields = rows(object(await this.mc(`lists/${SALE.audienceId}/merge-fields?count=100`)).merge_fields);
    for (const [tag, type] of Object.entries(MERGE_TYPES)) {
      const field = fields.find(f => f.tag === tag);
      if (!field || field.type !== type || field.public !== false || field.required !== false) throw new RetentionError("merge_schema_review");
    }
  }
  async previousMembers(): Promise<Member[]> {
    const result: Member[] = [];
    const seen = new Set<string>();
    let total = 0;
    for (let offset = 0; offset < 10000;) {
      const data = object(await this.mc(`lists/${SALE.audienceId}/segments/3209079/members?count=1000&offset=${offset}&include_unsubscribed=true&include_cleaned=true&include_transactional=true`));
      const members = rows(data.members);
      if (!Number.isSafeInteger(data.total_items)) throw new RetentionError("invalid_cohort_pagination");
      // Mailchimp tag segments currently return total_items=0 with nonempty
      // members. Explicitly read through the empty terminal page; don't silently
      // drop unsubscribed members or treat that stale count as an empty cohort.
      total = Math.max(total, Number(data.total_items));
      for (const member of members) {
        if (typeof member.id !== "string" || member.id !== emailHash(String(member.email_address)) || seen.has(member.id)) throw new RetentionError("cohort_identity_review");
        seen.add(member.id);
      }
      result.push(...members as unknown as Member[]);
      if (!members.length) {
        if (result.length < total) throw new RetentionError("incomplete_cohort_pagination");
        return result;
      }
      offset += members.length;
    }
    throw new RetentionError("cohort_pagination_limit");
  }
}
