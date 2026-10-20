/** October 2026 offer from Don's October 3 email. */
export const membershipSale = {
  // Manual pause overrides scheduled site promotion; restore only when Taylor asks.
  promotionPaused: true,
  dates: "October 20–22, 2026",
  firstMonthsRate: 19,
  regularRate: 115,
  studentSeniorRate: 89,
  // America/Halifax is UTC−03:00 at both of these October boundaries.
  startsAt: "2026-10-20T00:01:00-03:00",
  // Unadvertised grace day for stragglers; public offer dates remain October 20–22.
  endsAt: "2026-10-23T22:00:00-03:00",
  // October 20: verified generated Buy Now - Contract embeds in Branded Web (site 1889 / 11233).
  // $19 - Special Offer / $19 - Special Offer students/seniors; no April contract IDs reused.
  regularContractId: "184" as string | null,
  studentSeniorContractId: "185" as string | null,
} as const;

export function getMembershipSaleStatus(now: Date = new Date()) {
  if (now.getTime() < Date.parse(membershipSale.startsAt)) return "upcoming";
  if (now.getTime() >= Date.parse(membershipSale.endsAt)) return "ended";
  return "active";
}

export function isMembershipSaleCheckoutReady() {
  return [membershipSale.regularContractId, membershipSale.studentSeniorContractId]
    .every((id) => id !== null && /^\d+$/.test(id));
}
