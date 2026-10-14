import { config as loadEnv } from "dotenv";
import { getTrackingConfig, PurchaseTracker, safeFailure } from "../src/lib/mfr-purchase-tracking";

loadEnv({ path: process.env.MFR_ENV_FILE || ".env", quiet: true });
const apply = process.argv.includes("--apply");
const allowed = new Set(["--apply"]);
if (process.argv.slice(2).some(arg => !allowed.has(arg))) {
  console.error("Usage: npm run sync:mfr -- [--apply]. Default: read-only preview.");
  process.exit(1);
}
async function main() {
  try {
    const summary = await new PurchaseTracker(getTrackingConfig()).reconcile(!apply);
    console.log(JSON.stringify({ mode: apply ? "apply" : "read-only", ...summary }, null, 2));
    if (summary.failed) process.exitCode = 1;
  } catch (error) {
    console.error("mfr_purchase_sync_failed", safeFailure(error));
    process.exitCode = 1;
  }
}
void main();
