import { get, put, del, BlobPreconditionFailedError, BlobError } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { RetentionError } from "./rules";
import type { DeliveryState } from "./delivery-policy";

export interface Versioned { state: DeliveryState; etag?: string }
export interface Ledger {
  read(key: string, empty: DeliveryState): Promise<Versioned>;
  save(key: string, value: DeliveryState, etag?: string): Promise<string | undefined>;
  probe(): Promise<void>;
}
export class BlobDeliveryLedger implements Ledger {
  private path(key: string): string {
    if (!/^[a-f0-9]{64}$/.test(key)) throw new RetentionError("invalid_ledger_key");
    return "retention/sale-2026-10/members/" + key + ".json";
  }
  async read(key: string, empty: DeliveryState): Promise<Versioned> {
    const result = await get(this.path(key), { access: "private", useCache: false,
      abortSignal: AbortSignal.timeout(15000) });
    if (!result) return { state: empty };
    if (result.statusCode !== 200 || result.blob.size > 200000) throw new RetentionError("ledger_read_review");
    return { state: JSON.parse(await new Response(result.stream).text()), etag: result.blob.etag };
  }
  async save(key: string, value: DeliveryState, etag?: string): Promise<string | undefined> {
    try {
      const saved = await put(this.path(key), JSON.stringify(value), { access: "private",
        addRandomSuffix: false, allowOverwrite: !!etag, ifMatch: etag,
        contentType: "application/json", cacheControlMaxAge: 60, abortSignal: AbortSignal.timeout(15000) });
      return saved.etag;
    } catch (error) {
      if (error instanceof BlobPreconditionFailedError
        || (!etag && error instanceof BlobError && /already exists/i.test(error.message))) return undefined;
      throw new RetentionError("ledger_write_failed");
    }
  }
  async probe(): Promise<void> {
    // Invented fixture only. Verify origin reads and stale-ETag rejection in cloud.
    const path = "retention/sale-2026-10/probes/" + randomUUID() + ".json";
    const first = await put(path, '{"fixture":1}', { access: "private", addRandomSuffix: false,
      contentType: "application/json", abortSignal: AbortSignal.timeout(15000) });
    let etag = first.etag;
    try {
      if (!first.url.includes(".private.blob.vercel-storage.com/")) throw new RetentionError("ledger_not_private");
      const read = await get(path, { access: "private", useCache: false, abortSignal: AbortSignal.timeout(15000) });
      if (!read || read.statusCode !== 200 || await new Response(read.stream).text() !== '{"fixture":1}')
        throw new RetentionError("ledger_probe_read");
      const second = await put(path, '{"fixture":2}', { access: "private", addRandomSuffix: false,
        allowOverwrite: true, ifMatch: etag, abortSignal: AbortSignal.timeout(15000) });
      etag = second.etag;
      let rejected = false;
      try {
        await put(path, '{"fixture":3}', { access: "private", addRandomSuffix: false,
          allowOverwrite: true, ifMatch: first.etag, abortSignal: AbortSignal.timeout(15000) });
      } catch (error) { if (error instanceof BlobPreconditionFailedError) rejected = true; else throw error; }
      if (!rejected) throw new RetentionError("ledger_cas_not_enforced");
    } finally { await del(first.url, { ifMatch: etag, abortSignal: AbortSignal.timeout(15000) }); }
  }
}
