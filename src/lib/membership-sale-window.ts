/**
 * Sale visibility uses `America/Halifax` (Atlantic Canada civil time, including DST).
 * In late April this is typically ADT, not AST, but matches how local clocks read in the region.
 *
 * Schedule (same window for nav link + announcement popup):
 * - Visible from: 2026-04-20 at 00:01 (one minute after midnight) through 2026-04-23 at 23:59:59,
 *   all interpreted in America/Halifax.
 * - Hidden before the start instant and after the end instant (removed from the site for both).
 */
const ATLANTIC_TZ = "America/Halifax";

const SALE_WINDOW_START_KEY = "2026-04-20T00:01:00";
const SALE_WINDOW_END_KEY = "2026-04-23T23:59:59";

function halifaxWallClockSortableKey(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: ATLANTIC_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const parts = formatter.formatToParts(date);
  const v = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "00";
  return `${v("year")}-${v("month")}-${v("day")}T${v("hour")}:${v("minute")}:${v("second")}`;
}

export function isWithinMembershipSaleScheduledWindow(
  now: Date = new Date()
): boolean {
  const key = halifaxWallClockSortableKey(now);
  return key >= SALE_WINDOW_START_KEY && key <= SALE_WINDOW_END_KEY;
}

/** Nav item and popup both follow this; no dev-only override (timing matches production). */
export function isMembershipSaleNavOrPopupVisible(now: Date = new Date()): boolean {
  return isWithinMembershipSaleScheduledWindow(now);
}

export const MEMBERSHIP_SALE_PATH = "/membership-sale";
