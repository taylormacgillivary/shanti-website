import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Prevent CDN/static-build timestamps or a visitor's timezone from controlling the sale. */
export function GET() {
  return NextResponse.json({ now: Date.now() }, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
