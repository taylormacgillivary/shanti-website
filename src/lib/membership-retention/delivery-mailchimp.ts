import { createHash } from "node:crypto";
import { RetentionApi, object, rows, type Member } from "./api";
import { emailHash, RetentionError, SALE } from "./rules";
import { MESSAGES, validInstant, type Message, type Receipt } from "./delivery-policy";
import approved from "./approved-emails.json";

export type DeliveryMode = "preview" | "live";
export function deliveryMode(env: Record<string, string | undefined> = process.env): "off" | DeliveryMode {
  const value = env.MEMBERSHIP_RETENTION_DELIVERY_MODE || "preview";
  if (!["off", "preview", "live"].includes(value)) throw new RetentionError("invalid_delivery_mode");
  if (value === "live" && env.RETENTION_DELIVERY_APPROVED_REVISION !== approved.revision)
    throw new RetentionError("delivery_activation_not_approved");
  return value as "off" | DeliveryMode;
}
export interface DeliveryGateway {
  preflight(): Promise<void>;
  receipts(member: Member): Promise<Receipt[]>;
  trigger(message: Message, member: Member): Promise<void>;
}
export function contentFingerprint(settings: Record<string, unknown>, content: Record<string, unknown>): string {
  const selected = Object.fromEntries(["subject_line", "preview_text", "from_name", "reply_to"].map(k => [k, settings[k]]));
  return createHash("sha256").update(JSON.stringify({ settings: selected,
    html: String(content.html).trimEnd(), plain_text: content.plain_text })).digest("hex");
}
export class MailchimpDeliveryGateway implements DeliveryGateway {
  private checked = false;
  constructor(private api: RetentionApi, private mode: DeliveryMode, private fetcher: typeof fetch = fetch,
    private env: Record<string, string | undefined> = process.env) {}
  async preflight(): Promise<void> {
    if (this.mode === "live" && deliveryMode(this.env) !== "live") throw new RetentionError("delivery_not_armed");
    for (const message of Object.keys(MESSAGES) as Message[]) {
      const meta = MESSAGES[message], expected = approved.emails[message];
      const campaign = object(await this.api.mc("campaigns/" + meta.campaign));
      const content = object(await this.api.mc("campaigns/" + meta.campaign + "/content"));
      if (campaign.id !== expected.campaign || campaign.type !== "automation-email"
        || object(campaign.recipients).list_id !== SALE.audienceId
        || contentFingerprint(object(campaign.settings), content) !== expected.sha256)
        throw new RetentionError("approved_email_changed");
      if (this.mode === "live" && campaign.status !== "sending") throw new RetentionError("journey_not_active");
    }
    this.checked = true;
  }
  async receipts(member: Member): Promise<Receipt[]> {
    const result: Receipt[] = [], seenPages = new Set<string>();
    // The sent-only feed supplies real per-contact send timestamps. Opens,
    // clicks, accepted triggers and bulk campaign totals are not send receipts.
    for (let offset = 0; offset < 10000;) {
      const data = object(await this.api.mc("lists/" + SALE.audienceId + "/members/" + member.id
        + "/activity-feed?activity_filters=sent&count=1000&offset=" + offset));
      if (data.email_id !== member.id || data.list_id !== SALE.audienceId) throw new RetentionError("receipt_identity_review");
      const activity = rows(data.activity);
      if (!activity.length) return result;
      const digest = createHash("sha256").update(JSON.stringify(activity)).digest("hex");
      if (seenPages.has(digest)) throw new RetentionError("receipt_pagination_review");
      seenPages.add(digest);
      for (const event of activity) {
        if (event.activity_type !== "sent" || typeof event.created_at_timestamp !== "string"
          || !validInstant(event.created_at_timestamp)) throw new RetentionError("receipt_shape_review");
        const message = (Object.keys(MESSAGES) as Message[]).find(m => MESSAGES[m].campaign === event.campaign_id);
        if (message) result.push({ message, sentAt: event.created_at_timestamp });
      }
      offset += activity.length;
    }
    throw new RetentionError("receipt_pagination_limit");
  }
  async trigger(message: Message, member: Member): Promise<void> {
    if (!this.checked || this.mode !== "live" || deliveryMode(this.env) !== "live"
      || member.status !== "subscribed" || member.id !== emailHash(member.email_address))
      throw new RetentionError("trigger_not_allowed");
    const meta = MESSAGES[message];
    this.api.calls.mailchimp++; this.api.calls.writes++;
    // One attempt only. Any timeout or rejection is held for reconciliation;
    // the API has no documented idempotency key.
    let response: Response;
    try {
      response = await this.fetcher("https://" + SALE.server + ".api.mailchimp.com/3.0/customer-journeys/journeys/"
        + meta.journey + "/steps/" + meta.step + "/actions/trigger", {
        method: "POST", headers: { Authorization: "Bearer " + this.api.config.mailchimpKey, "Content-Type": "application/json" },
        body: JSON.stringify({ email_address: member.email_address }), redirect: "error",
        signal: AbortSignal.timeout(15000), cache: "no-store",
      });
    } catch { throw new RetentionError("trigger_outcome_uncertain"); }
    if (response.status !== 204) throw new RetentionError("trigger_outcome_review", response.status);
  }
}
