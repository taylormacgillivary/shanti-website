import { getMembershipSaleStatus, isMembershipSaleCheckoutReady } from "./membership-sale";

/** October 20–22 inclusive, using Halifax's October UTC−03:00 offset. */
export function isWithinMembershipSaleScheduledWindow(now: Date = new Date()): boolean {
  return getMembershipSaleStatus(now) === "active";
}

/** Hide site-wide promotion until both October checkout contracts are verified. */
export function isMembershipSaleNavOrPopupVisible(now: Date = new Date()): boolean {
  return isMembershipSaleCheckoutReady() && isWithinMembershipSaleScheduledWindow(now);
}

export const MEMBERSHIP_SALE_PATH = "/membership-sale";
