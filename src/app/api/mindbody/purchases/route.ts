import { NextResponse } from "next/server";
import {
  getTrackingConfig, PurchaseTracker, receiptFromWebhook, safeFailure, validWebhookSignature,
} from "@/lib/mfr-purchase-tracking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

// Mindbody checks HEAD when a subscription is created. This performs no writes.
export function HEAD() { return new Response(null, { status: 200 }); }

export async function POST(request: Request) {
  if (process.env.MFR_PURCHASE_TRACKING_ENABLED !== "true" || !process.env.MINDBODY_WEBHOOK_SIGNATURE_KEY) {
    return NextResponse.json({ error: "Purchase tracking is not configured" }, { status: 503 });
  }
  if (Number(request.headers.get("content-length")) > 131_072) return new Response(null, { status: 413 });
  const raw = await request.text();
  if (Buffer.byteLength(raw, "utf8") > 131_072) return new Response(null, { status: 413 });
  if (!validWebhookSignature(raw, request.headers.get("x-mindbody-signature"), process.env.MINDBODY_WEBHOOK_SIGNATURE_KEY)) {
    return new Response(null, { status: 401 });
  }
  let payload: unknown;
  try { payload = JSON.parse(raw); } catch { return new Response(null, { status: 400 }); }
  try {
    const config = getTrackingConfig();
    const receipt = receiptFromWebhook(payload, config);
    if (!receipt) return new Response(null, { status: 204 });
    // Mindbody retries non-2xx responses. Tag writes are idempotent; daily reconciliation
    // also catches receipts whose delivery/retry period was missed.
    const summary = await new PurchaseTracker(config, fetch, { timeoutMs: 8_000 }).syncReceipts([receipt]);
    console.info("mfr_purchase_webhook", { saleId: receipt.id, ...summary });
    return NextResponse.json(summary, { status: summary.failed ? 503 : 200 });
  } catch (error) {
    console.error("mfr_purchase_webhook_failed", safeFailure(error));
    return NextResponse.json({ error: "Purchase sync could not complete" }, { status: 503 });
  }
}
