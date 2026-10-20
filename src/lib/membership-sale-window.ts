import { getMembershipSaleStatus, membershipSale } from "./membership-sale";

/** October 20, 00:01 through October 23, 22:00, Halifax time (end exclusive). */
export function isWithinMembershipSaleScheduledWindow(now: Date = new Date()): boolean {
  return getMembershipSaleStatus(now) === "active";
}

/** Shared manual pause for navigation, banner and popup, independent of checkout setup. */
export function isMembershipSalePromotionVisible(status: ReturnType<typeof getMembershipSaleStatus>): boolean {
  return !membershipSale.promotionPaused && status === "active";
}

/** Manual pause takes precedence over the scheduled promotion window. */
export function isMembershipSaleNavOrPopupVisible(now: Date = new Date()): boolean {
  return isMembershipSalePromotionVisible(getMembershipSaleStatus(now));
}

export const MEMBERSHIP_SALE_PATH = "/membership-sale";
