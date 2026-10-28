import { NextResponse } from "next/server";
import { secureEqual } from "@/lib/mfr-purchase-tracking";
import { getConfig } from "@/lib/membership-retention/api";
import { failure } from "@/lib/membership-retention/rules";
import { syncRetention } from "@/lib/membership-retention/sync";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !secureEqual(request.headers.get("authorization") || "", `Bearer ${secret}`)) return new Response(null, { status: 401 });
  if (process.env.VERCEL_ENV !== "production" || process.env.MEMBERSHIP_RETENTION_MODE !== "tags") {
    return NextResponse.json({ status: "disabled", emailsSent: 0 });
  }
  try {
    const summary = await syncRetention(getConfig(), true);
    console.info("membership_retention_sync", summary);
    return NextResponse.json(summary, { status: summary.failed ? 503 : 200 });
  } catch (error) {
    console.error("membership_retention_sync_failed", failure(error));
    return NextResponse.json({ error: "Retention sync could not complete", emailsSent: 0 }, { status: 503 });
  }
}
