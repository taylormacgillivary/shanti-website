import { NextResponse } from "next/server";
import { secureEqual } from "@/lib/mfr-purchase-tracking";
import { getConfig, RetentionApi } from "@/lib/membership-retention/api";
import { failure } from "@/lib/membership-retention/rules";
import { syncRetention, type Plan } from "@/lib/membership-retention/sync";
import { BlobDeliveryLedger } from "@/lib/membership-retention/delivery-ledger";
import { deliveryMode, MailchimpDeliveryGateway } from "@/lib/membership-retention/delivery-mailchimp";
import { dispatch } from "@/lib/membership-retention/delivery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 800;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || !secureEqual(request.headers.get("authorization") || "", "Bearer " + secret))
    return new Response(null, { status: 401 });
  if (process.env.VERCEL_ENV !== "production") return NextResponse.json({ status: "disabled", acceptedTriggers: 0 });
  try {
    const mode = deliveryMode();
    if (mode === "off") return NextResponse.json({ status: "disabled", acceptedTriggers: 0 });
    const config = getConfig(), now = new Date(), api = new RetentionApi(config, now, fetch, 700000);
    let plans: Plan[] = [];
    // Independent complete source read. Do not dispatch from yesterday's tags
    // or start advancing stages in the existing tag-only job.
    const scan = await syncRetention(config, false, now, api, undefined, async value => { plans = value; });
    if (scan.failed) throw new Error("Source scan incomplete");
    const delivery = await dispatch(plans, api, new BlobDeliveryLedger(), new MailchimpDeliveryGateway(api, mode), mode, now);
    const summary = { status: delivery.failures ? "review" : "complete", scan, delivery };
    console.info("membership_retention_delivery", summary);
    return NextResponse.json(summary, { status: delivery.failures ? 503 : 200 });
  } catch (error) {
    console.error("membership_retention_delivery_failed", failure(error));
    return NextResponse.json({ status: "review", error: failure(error), acceptedTriggers: 0 }, { status: 503 });
  }
}
