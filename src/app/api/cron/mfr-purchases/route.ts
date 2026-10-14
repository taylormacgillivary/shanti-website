import { NextResponse } from "next/server";
import { getTrackingConfig, PurchaseTracker, safeFailure, secureEqual } from "@/lib/mfr-purchase-tracking";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !secureEqual(request.headers.get("authorization") || "", `Bearer ${secret}`)) {
    return new Response(null, { status: 401 });
  }
  if (process.env.MFR_PURCHASE_TRACKING_ENABLED !== "true") {
    return NextResponse.json({ error: "Purchase tracking is disabled" }, { status: 503 });
  }
  try {
    const summary = await new PurchaseTracker(getTrackingConfig()).reconcile();
    console.info("mfr_purchase_reconciliation", summary);
    return NextResponse.json(summary, { status: summary.failed ? 503 : 200 });
  } catch (error) {
    console.error("mfr_purchase_reconciliation_failed", safeFailure(error));
    return NextResponse.json({ error: "Purchase reconciliation could not complete" }, { status: 503 });
  }
}
