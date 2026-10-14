import { getMembershipSaleStatus } from "./membership-sale";

/** October 20, 00:01 through October 23, 22:00, Halifax time (end exclusive). */
export function isWithinMembershipSaleScheduledWindow(now: Date = new Date()): boolean {
  return getMembershipSaleStatus(now) === "active";
}

/** All site-wide promotion follows the same clock, independently of checkout setup. */
export function isMembershipSaleNavOrPopupVisible(now: Date = new Date()): boolean {
  return isWithinMembershipSaleScheduledWindow(now);
}

export const MEMBERSHIP_SALE_PATH = "/membership-sale";
