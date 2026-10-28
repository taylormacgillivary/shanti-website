import { config as loadEnv } from "dotenv";
import { getConfig } from "../src/lib/membership-retention/api";
import { failure, RetentionError } from "../src/lib/membership-retention/rules";
import { syncRetention } from "../src/lib/membership-retention/sync";
import { writeFile } from "node:fs/promises";

loadEnv({ path: process.env.RETENTION_ENV_FILE || ".env", quiet: true });
const args = process.argv.slice(2), apply = args.includes("--apply-tags");
if (args.some(a => a !== "--apply-tags")) {
  console.error("Usage: npm run sync:retention -- [--apply-tags]. Default: read-only. Cannot send emails.");
  process.exit(1);
}
async function main() {
  try {
    const backup = process.env.RETENTION_BACKUP_FILE;
    if (apply && !backup) throw new RetentionError("backup_required");
    const summary = await syncRetention(getConfig(), apply, new Date(), undefined, async plans => {
      // Only opaque Mailchimp IDs and original retention fields/tags, never names,
      // email addresses, credentials or raw Mindbody records. Do not overwrite.
      await writeFile(backup!, JSON.stringify({ createdAt: new Date().toISOString(), members: plans.map(p => ({
        id: p.member.id,
        fields: Object.fromEntries(Object.keys(p.fields).map(key => [key, p.member.merge_fields[key] ?? ""])),
        tags: Object.fromEntries(Object.keys(p.tags).map(tag => [tag, p.member.tags.some(t => t.name === tag)])),
      })) }, null, 2), { flag: "wx", mode: 0o600 });
    });
    console.log(JSON.stringify(summary, null, 2));
    if (summary.failed) process.exitCode = 1;
  } catch (error) { console.error(failure(error)); process.exitCode = 1; }
}
void main();
