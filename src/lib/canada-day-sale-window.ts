/**
 * Sale visibility uses `America/Halifax` (Atlantic Canada civil time, including DST).
 *
 * Popup + announcement bar window:
 * - Visible from: 2026-07-01 at 00:01 through 2026-07-03 at 12:00:00,
 *   all interpreted in America/Halifax.
 * - Hidden before the start instant and after the end instant.
 *
 * Sale copy on the landing page references July 1–2 only.
 */
const ATLANTIC_TZ = "America/Halifax";

const POPUP_BAR_WINDOW_START_KEY = "2026-07-01T00:01:00";
const POPUP_BAR_WINDOW_END_KEY = "2026-07-03T12:00:00";

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

export function isWithinCanadaDaySalePopupOrBarWindow(
  now: Date = new Date()
): boolean {
  const key = halifaxWallClockSortableKey(now);
  return key >= POPUP_BAR_WINDOW_START_KEY && key <= POPUP_BAR_WINDOW_END_KEY;
}

/** Popup and announcement bar both follow this; no dev-only override (timing matches production). */
export function isCanadaDaySalePopupOrBarVisible(
  now: Date = new Date()
): boolean {
  return isWithinCanadaDaySalePopupOrBarWindow(now);
}

export const CANADA_DAY_SALE_PATH = "/canada-day-sale";
