# October 2026 membership promo

Source: Don MacGillivary, “October Membership Promo”, October 3, 2026, in Taylor's Shanti Gmail. Taylor approved the details by email on October 5.

## Implemented landing page

- URL: `/membership-sale`, reusing the current site's video hero, regular/student-senior pricing cards, membership terms, studio photos, and navigation/footer.
- October 20–22, 2026, inclusive in America/Halifax. Opens at midnight October 20; closes at midnight October 23.
- Both tiers: $19/month for months 1–2. Regular: $115/month for months 3–4. Student/senior: $89/month for months 3–4.
- Yoga only; Pilates is excluded. Membership begins on the purchase day during the sale.
- Existing minimum four-month commitment, current-member exclusion, and continuation language retained from the current membership sale page. Verify these against the October contracts before launch.
- Purchase controls disabled before/after the sale and until both October contracts are configured. April widget service IDs 169 and 173 are removed from checkout.
- Navigation/popup uses the October sale window and requires both verified purchase contracts. New dismissal key prevents a prior sale's dismissal from suppressing this campaign.

## Reference findings

The September/October 2025 “Fall Membership Sale” email thread identifies the old URL `/fall-sale`, a tall campaign graphic, and regular/student promo contracts. It confirms last year's $9 first two months and the same $115/$89 follow-up pricing. The old `/fall-sale` page is unavailable on the current site; no October 2025 landing-page source exists in this repository's sale-page history. The current `/membership-sale` and `/boxing-day-sale` pages were reviewed visually/source-wise for layout and purchase integration.

## Finish before launch

1. In Mindbody / Branded Web Manager, locate the October 2026 regular and student/senior promo **contract links**. Verify $19 for each first two months, $115/$89 for months 3–4, yoga-only access, start date, minimum commitment, renewal, eligibility, and checkout tax presentation.
2. Add the verified numeric contract service IDs to `src/lib/membership-sale.ts`. Site identity currently inherited from the working site's widget markup: site 1889, Mindbody site 11233. Confirm those identities against the generated markup as well.
3. Check both checkout dialogs when the contracts become available; do not complete a purchase. If the integration supplies a different type of purchase link, adapt the controls to that verified format instead.
4. Review the local preview and deploy the completed page through the existing Vercel workflow. This task's draft is local and has not been pushed.
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

Taylor requested a shareable review link for Don without promoting the page on the public site. Deploy this branch as a Vercel preview; do not merge to main or promote to production. Sale metadata is noindex/nofollow. Navigation and popup stay gated by verified contracts and the sale window. Checkout remains disabled while the contracts are unset.

Don's October 13 email subject says “Oct. 19-21 Membership Sale”, while the October 3 brief says October 20–22. The reply requests date confirmation; the preview retains the original dates until confirmed.
