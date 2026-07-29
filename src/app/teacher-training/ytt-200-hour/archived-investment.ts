/**
 * Archived YTT 200-Hour tuition / payment config (Spring 2026 cohort).
 *
 * To restore investment cards on the page:
 * 1. Import `archivedYtt200InvestmentProps` in `page.tsx`
 * 2. Spread it onto `<CoursePage {...archivedYtt200InvestmentProps} />`
 * 3. Remove the `investmentPlaceholder` prop
 * 4. Restore the previous `dates` / `subtitle` if desired
 */
export const archivedYtt200InvestmentProps = {
  dates: "Module 1: May 1-8, 2026 • Module 2: May 15-22, 2026 • Module 3: May 29-31, 2026",
  subtitle: "Spring 2026 • A 200-Hour Foundational Journey",
  investment: {
    deposit: 1000,
    tuition: 3600,
    earlyBirdTuition: 3200,
    earlyBirdDate: "March 1, 2026",
  },
  paymentDepositLink: "#",
  paymentFullLink: "#",
  paymentDepositText: "Pay Your Deposit",
  paymentFullText: "Pay Remainder of Tuition",
  useMindbodyWidgets: true,
  mindbodyDepositServiceId: "1383",
  mindbodyFullServiceId: "1384",
  mindbodyFullRegularServiceId: "1633",
  fullTuitionDisclaimer: "Only use this link if you paid your deposit before March 1",
} as const;
