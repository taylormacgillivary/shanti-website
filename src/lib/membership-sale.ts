/** October 2026 offer from Don's October 3 email. */
export const membershipSale = {
  dates: "October 20–22, 2026",
  firstMonthsRate: 19,
  regularRate: 115,
  studentSeniorRate: 89,
  startsAt: "2026-10-20T00:00:00-03:00",
  endsAt: "2026-10-23T00:00:00-03:00",
  // Fill only after verifying October prices and terms in Branded Web Manager.
  // April service IDs (169 / 173) have deliberately not been carried forward.
  regularContractId: null as string | null,
  studentSeniorContractId: null as string | null,
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
