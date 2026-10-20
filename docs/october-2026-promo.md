# October 2026 membership promo

Source: Don MacGillivary, “October Membership Promo”, October 3, 2026, in Taylor's Shanti Gmail. Taylor approved the details by email on October 5.

## Temporary promotion pause — October 20, 2026

Taylor requested that the sale navigation item, announcement bar and popup be temporarily removed until further instruction. `membershipSale.promotionPaused` is `true` and overrides scheduled site-wide promotion, including preview clocks. All three components share this switch; their designs and original schedule are preserved. The landing page remains available by direct URL. Restore only when Taylor requests it, and confirm the schedule still matches the intended sale dates. The first-two-month price remains $19/month, as Taylor reconfirmed October 20.

## Purchase contracts — October 20, 2026

Refreshed the signed-in Shanti Branded Web Manager Links page and selected Buy Now - Contract. The list now contains `$19 - Special Offer ($19.00) Contract ID: 184` and `$19 - Special Offer students/seniors ($19.00) Contract ID: 185`. Generated markup confirms `data-type="contract-link"`, `data-site-id="1889"`, `data-mb-site-id="11233"`, and service IDs 184 / 185 respectively. These are now assigned to the regular and student/senior purchase buttons. Site-wide promotion remains manually paused. No Mindbody contract settings or purchases were changed.

## Implemented landing page

- URL: `/membership-sale`, reusing the current site's video hero, regular/student-senior pricing cards, membership terms, studio photos, and navigation/footer.
- Public offer dates: October 20–22, 2026. Taylor confirmed these dates October 13.
- Site promotion and checkout window: October 20 at 12:01 a.m. through October 23 at 10:00 p.m., America/Halifax (end exclusive). October 23 is an unadvertised grace day for stragglers, requested October 14.
- Both tiers: $19/month for months 1–2. Regular: $115/month for months 3–4. Student/senior: $89/month for months 3–4.
- Yoga only; Pilates is excluded. Membership begins on the purchase day during the sale.
- Existing minimum four-month commitment, current-member exclusion, and continuation language retained from the current membership sale page. Verify these against the October contracts before launch.
- Purchase controls disabled before/after the sale and until both October contracts are configured. April widget service IDs 169 and 173 are removed from checkout.
- Main navigation title: **Fall Membership Sale**, in desktop navigation and mobile main menu.
- Sticky announcement bar: **Fall membership sale on now — click here for details**. It sits above navigation in the shared sticky header, in forest green/cream with a sage accent.
- Minimal photo popup: **Fall Membership Sale**, **$19 / month**, **for your first two months**, **Unlimited yoga. All three studios.**, and **See the offer**.
- Navigation, bar and popup share the sale clock; visibility follows the schedule even if checkout IDs are still unset. Checkout stays disabled until both verified IDs are configured.
- Popup dismissal lasts 12 hours; it does not open on the sale page itself. The bar and navigation remain available after dismissal. An open popup is removed at the closing boundary.
- Removed “Online purchases open October 20”, “Available October 20” button labels, and “coming soon” wording from the sale page.

## Reference findings

The September/October 2025 “Fall Membership Sale” email thread identifies the old URL `/fall-sale`, a tall campaign graphic, and regular/student promo contracts. It confirms last year's $9 first two months and the same $115/$89 follow-up pricing. The old `/fall-sale` page is unavailable on the current site; no October 2025 landing-page source exists in this repository's sale-page history. The current `/membership-sale` and `/boxing-day-sale` pages were reviewed visually/source-wise for layout and purchase integration.

## Finish before launch

1. In Mindbody / Branded Web Manager, locate the October 2026 regular and student/senior promo **contract links**. Verify $19 for each first two months, $115/$89 for months 3–4, yoga-only access, start date, minimum commitment, renewal, eligibility, and checkout tax presentation.
2. Add the verified numeric contract service IDs to `src/lib/membership-sale.ts`. Site identity currently inherited from the working site's widget markup: site 1889, Mindbody site 11233. Confirm those identities against the generated markup as well.
3. Check both checkout dialogs when the contracts become available; do not complete a purchase. If the integration supplies a different type of purchase link, adapt the controls to that verified format instead.
4. Publish the branch to production before the opening time. The October page was initially shared as a Vercel review preview. Deployment in advance is necessary for automatic production appearance/removal. No new deployment or manual switch is needed at either boundary.
5. Reconfirm whether October campaign artwork is coming from Paighton. The current branded video/gallery work without new artwork.

## Campaign coordination from the email

These are recorded for coordination; this landing-page task has not sent/scheduled emails or ads.

- Mailchimp main-list launch email: October 20.
- Mailchimp final-day email: October 22.
- Social ads: October 20–22.
- Social sharing/posting promotion: free six-month membership. Entry rules, qualifying posts, deadline, selection method and final artwork/link are not provided. Omit a public giveaway promise until those details are supplied.

## Branded Web Manager check — October 5, 2026

Checked the signed-in Shanti Hot Yoga account at `https://brandedweb.mindbodyonline.com/manager/links`, selecting Buy Now – Contract. The target list contains standard contracts only: one-month yoga (193), four-month family yoga + Pilates (192), four-month family yoga (157), four-month yoga + Pilates (190), four-month yoga (156), annual yoga + Pilates (191), one-month yoga + Pilates (189), and Take 5 (163). No $19 promo or student/senior promo is offered in this picker yet. Confirmed generated markup uses site ID 1889 and Mindbody site ID 11233. Left both promo IDs null; no Mindbody products or contract settings were changed.

## Review preview — October 13, 2026

Taylor requested a shareable review link for Don without promoting the page on the public site. The branch was pushed as a Vercel preview on October 13; it was not merged to main or promoted to production. Sale metadata is noindex/nofollow. Checkout remains disabled while the contracts are unset. The October 14 scheduling change supersedes the earlier checkout-readiness gate on site-wide promotion.

Don and Taylor confirmed October 20–22 on October 13; the original dates are correct.

## Automatic site promotion — October 14, 2026

- Schedule source: `src/lib/membership-sale.ts`.
- UTC boundaries: `2026-10-20T03:01:00Z` and `2026-10-24T01:00:00Z`. The visitor's timezone does not change them.
- A shared client clock syncs against the uncached `/api/membership-sale-clock` server endpoint, schedules the next boundary, and resyncs on focus/visibility plus every five minutes. Static HTML stays neutral; date changes do not require rebuilding cached pages.
- The page can be deployed in advance with no site navigation/bar/popup promoting it until the opening boundary. The route remains accessible to someone who already has its direct URL, and sale metadata remains noindex/nofollow.
- Local development and Vercel preview deployments allow `?sale-preview=active`, `upcoming`, `ended`, or `?sale-preview-at=<ISO timestamp>` for QA. Production explicitly ignores these overrides. The legacy About page supports local development QA as well.
- `npm run check-sale-schedule`: verifies exact opening/closing milliseconds, the grace day and timezone independence.
- Browser QA: on an already-open tab, navigation/bar/popup all appeared at the simulated start and all disappeared at the simulated end (including an open modal). Verified sticky bar after desktop/mobile scrolling, 1280px desktop fit, 390px mobile fit, mobile menu destination, legacy About layout, and absence of advance-sale wording. Production build ignored the preview clock query. Server time endpoint returned `Cache-Control: no-store, max-age=0`.
- Design screenshots are saved outside the repository in the Shanti workspace under `outputs/sale-site-promotion/`.
