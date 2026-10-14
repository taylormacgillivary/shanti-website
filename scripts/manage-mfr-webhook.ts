import { config as loadEnv, parse } from "dotenv";
import { randomBytes, createHmac } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getTrackingConfig, safeFailure, TrackingError } from "../src/lib/mfr-purchase-tracking";

loadEnv({ path: process.env.MFR_ENV_FILE || ".env", quiet: true });
const referenceId = "shanti-mfr-2027-registration-v1";
const webhookUrl = "https://www.shantihotyoga.ca/api/mindbody/purchases";
const secretsFile = resolve(".env.mfr-webhook");
const command = process.argv[2] || "status";

interface Subscription {
  subscriptionId: string;
  status: string;
  referenceId: string;
  webhookUrl: string;
  eventIds: string[];
  messageSignatureKey?: string;
}

async function api(path: string, method = "GET", body?: unknown): Promise<unknown> {
  const key = process.env.MINDBODY_API_KEY;
  if (!key) throw new TrackingError("missing_MINDBODY_API_KEY");
  const response = await fetch(`https://mb-api.mindbodyonline.com/push/api/v1${path}`, {
    method, signal: AbortSignal.timeout(20_000),
    headers: {
      "Api-Key": key,
      "User-Agent": process.env.MINDBODY_API_SOURCE_NAME || "ShantiMFRPurchaseTracking",
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!response.ok) throw new TrackingError("webhook_subscription", response.status);
  const data = await response.json() as Record<string, unknown>;
  // Mindbody returns PascalCase for subscription creation and camelCase for reads.
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [
    key.charAt(0).toLowerCase() + key.slice(1), value,
  ]));
}

function summary(subscription: Subscription) {
  return {
    id: subscription.subscriptionId, status: subscription.status,
    referenceId: subscription.referenceId, url: subscription.webhookUrl, events: subscription.eventIds,
  };
}

async function main() {
  if (!["status", "prepare", "activate"].includes(command) || process.argv.length > 3) {
    throw new TrackingError("usage_status_prepare_or_activate");
  }
  if (process.env.MINDBODY_SITE_ID !== "11233") throw new TrackingError("wrong_mindbody_site");
  const list = await api("/subscriptions") as { items: Subscription[] };
  const matches = list.items.filter(s => s.referenceId === referenceId && s.status !== "DeactivatedByUser");
  if (matches.length > 1) throw new TrackingError("duplicate_subscriptions_require_review");
  let subscription = matches[0];
  if (command === "status") {
    console.log(JSON.stringify({ subscription: subscription ? summary(subscription) : null }, null, 2));
    return;
  }
  if (subscription && (subscription.webhookUrl !== webhookUrl || !subscription.eventIds.includes("clientSale.created"))) {
    throw new TrackingError("existing_subscription_mismatch");
  }
  if (command === "prepare") {
    if (subscription) {
      console.log(JSON.stringify({ subscription: summary(subscription), signingKeySavedLocally: existsSync(secretsFile) }, null, 2));
      return;
    }
    if (existsSync(secretsFile)) throw new TrackingError("existing_secret_file_requires_review");
    const head = await fetch(webhookUrl, { method: "HEAD", redirect: "manual", signal: AbortSignal.timeout(20_000) });
    if (head.status !== 200) throw new TrackingError("production_webhook_head", head.status);
    subscription = await api("/subscriptions", "POST", {
      eventIds: ["clientSale.created"], eventSchemaVersion: 1, referenceId, webhookUrl,
    }) as Subscription;
    if (!subscription.subscriptionId || !subscription.messageSignatureKey) {
      throw new TrackingError("subscription_created_without_signing_key_review_before_retry");
    }
    const cronSecret = randomBytes(32).toString("hex");
    // The returned verification key is saved once, never printed or committed.
    writeFileSync(secretsFile, [
      `MINDBODY_WEBHOOK_SUBSCRIPTION_ID=${subscription.subscriptionId}`,
      `MINDBODY_WEBHOOK_SIGNATURE_KEY=${subscription.messageSignatureKey}`,
      `CRON_SECRET=${cronSecret}`, "",
    ].join("\n"), { mode: 0o600, flag: "wx" });
    console.log(JSON.stringify({ subscription: summary(subscription), signingKeySavedLocally: true }, null, 2));
    return;
  }
  if (!subscription || !existsSync(secretsFile)) throw new TrackingError("prepare_subscription_first");
  const secrets = parse(readFileSync(secretsFile));
  if (secrets.MINDBODY_WEBHOOK_SUBSCRIPTION_ID !== subscription.subscriptionId) throw new TrackingError("secret_subscription_mismatch");
  getTrackingConfig(); // A confirmed intake date and existing integrations are required.
  const key = secrets.MINDBODY_WEBHOOK_SIGNATURE_KEY;
  if (!key) throw new TrackingError("missing_webhook_signing_key");
  const payload = JSON.stringify({ eventId: "shanti.connection.check", eventSchemaVersion: 1, eventData: { siteId: 11233 } });
  const check = await fetch(webhookUrl, {
    method: "POST", redirect: "manual", signal: AbortSignal.timeout(20_000), body: payload,
    headers: { "Content-Type": "application/json", "X-Mindbody-Signature": `sha256=${createHmac("sha256", key).update(payload).digest("base64")}` },
  });
  if (check.status !== 204) throw new TrackingError("production_signature_check", check.status);
  if (subscription.status !== "Active") await api(`/subscriptions/${subscription.subscriptionId}`, "PATCH", { status: "Active" });
  const verified = await api(`/subscriptions/${subscription.subscriptionId}`) as Subscription;
  if (verified.status !== "Active" || verified.webhookUrl !== webhookUrl) throw new TrackingError("activation_verification_failed");
  console.log(JSON.stringify({ subscription: summary(verified), productionSignatureCheck: "passed" }, null, 2));
}

void main().catch(error => { console.error("mfr_webhook_setup_failed", safeFailure(error)); process.exitCode = 1; });
