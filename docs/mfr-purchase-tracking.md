# MFR January 2027 purchase tracking

This integration marks existing Mailchimp contacts as registered after a qualifying Mindbody deposit or full-course purchase. The purchase handler only adds the registration tag. Separately, at Taylor's request, registration checks were added in the Mailchimp editor before each of the four emails in both existing MFR drafts. The automation owner remains responsible for teacher/general entry rules, email content and activation.

## Fixed mapping

| Setting | Value |
| --- | --- |
| Mindbody business | Shanti Hot Yoga, site `11233` |
| Deposit pricing option | `1283`, currently named “Myofascial Anatomy-Deposit 2026” (confirmed by Taylor as the correct product) |
| Early-bird full-payment option | `1344`, “Myofascial Anatomy Full Payment EB”, currently $695 |
| Regular full-payment option | `1285`, “Myofascial Anatomy Full Payment Non-EB”, currently $795 |
| Mailchimp audience | `Shanti Yoga All Emails`, supplied by `MAILCHIMP_NEWSLETTER_AUDIENCE_ID` and verified by name before any writes |
| Registration tag | `MFR YTT 2027 - Registered` |
| Last qualifying purchase day | January 31, 2027, in America/Halifax |
| First qualifying purchase day | July 16, 2026 (`2026-07-16`), confirmed by Taylor as 90 days before October 14, 2026 |

## Behaviour

1. Mindbody delivers a signed `clientSale.created` notification to `POST /api/mindbody/purchases`.
2. The handler verifies the HMAC signature against the **raw request body**, the business ID, service/product ID, positive quantity and course date window. Other events and products are ignored.
3. It uses the **item recipient**, which may differ from the person paying, to retrieve the student's Mindbody email.
4. It normalizes that email and looks up the existing contact in the verified Mailchimp audience.
5. If the contact does not already have the registration tag, it adds that tag using Mailchimp's member-tags endpoint.

No contact subscription status, launch tag, audience membership, pricing option, payment, or automation is changed. Contacts absent from the audience are not automatically created or subscribed. Missing client records, missing email addresses, and absent Mailchimp contacts are recorded for review using client references, not personal details. Daily reconciliation rechecks them, including contacts subsequently added to the audience.

A purchase of any one of the three pricing options qualifies independently; a full-payment purchaser does not need a previous deposit. Product IDs identify registrations, so discounts and later display-name or price changes do not break tracking. The separate “Myofascial Anatomy-Final Payment” balance option (`1123`) and the $40 “MFR 2026” workshop (`1594`) are not included. The full-payment options were verified against Mindbody's staff catalogue on October 20, 2026.

A zero-price, fully discounted registration still qualifies if Mindbody records the service purchase. Refund/return records and negative quantities do not add a tag. An existing registration tag is **not automatically removed** following a refund: staff should confirm the person's registration status and handle any removal explicitly. Email mismatches between systems require manual resolution.

## Reliability without a separate database

Tag writes are idempotent. Duplicate notifications or concurrent processing cannot create multiple copies of the tag. A non-2xx webhook response asks Mindbody to retry; temporary provider errors are not acknowledged as successful.

Vercel runs `GET /api/cron/mfr-purchases` daily at **09:00 UTC**. This protected endpoint re-reads the full configured intake window from Mindbody's durable sales ledger, follows pagination, deduplicates recipients and fills in missing tags. It catches purchases missed during downtime or after Mindbody's retry window. There is no in-memory queue or filesystem state that would be lost between serverless invocations.

The daily check is bounded to 240 seconds and 500 pages. An incomplete scan or provider failure returns a failure status rather than claiming success. At much larger sales volumes, replace this full-window scan with durable cursors/queuing. The single-course implementation does not need a new database account or storage subscription.

Mindbody's documentation recommends verifying webhook signatures and a daily Public API sync: <https://developers.mindbodyonline.com/WebhooksDocumentation>.

## Environment settings

Existing private settings:

- `MINDBODY_API_KEY`, `MINDBODY_SITE_ID` (`11233`), `MINDBODY_API_SOURCE_NAME`
- `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX`
- `MAILCHIMP_NEWSLETTER_AUDIENCE_ID`

New private settings:

- `MFR_PURCHASES_SINCE`: `2026-07-16`, the confirmed intake cutoff in Halifax time. Do not move this date backward without confirming the historical intake boundary.
- `MFR_PURCHASE_TRACKING_ENABLED`: exactly `true` when ready. Missing/false disables both write paths.
- `MINDBODY_WEBHOOK_SIGNATURE_KEY`: the `messageSignatureKey` returned when the webhook subscription is created. Keep private; never commit it.
- `CRON_SECRET`: an independently generated random secret (at least 32 random bytes). Vercel sends `Authorization: Bearer <CRON_SECRET>` when invoking cron. Never put it in a URL.

Use separate production and preview verification/cron secrets. Do not enable preview writes or connect the production Mindbody subscription to a disposable preview URL.

## Test and deployment order

1. Confirm the purchase cutoff. Check that the configured newsletter audience resolves to the exact expected audience name.
2. Run `npm run test:mfr`, TypeScript and the production build. Tests use simulated vendors and never send real emails or write real contacts.
3. Run a read-only live preview, supplying the existing private environment and confirmed cutoff:

   ```sh
   MFR_ENV_FILE=/absolute/path/to/private.env MFR_PURCHASES_SINCE=YYYY-MM-DD npm run sync:mfr
   ```

   This prints counts, not email addresses. `npm run sync:mfr -- --apply` is the explicit one-time historical sync, and should only be used with the approved date boundary. It does not require the webhook feature flag because it is a deliberate operator command.

4. Review and deploy the code with tracking disabled. Confirm the production webhook's `HEAD` returns 200, unsigned `POST` is rejected, and unauthenticated cron requests return 401.
5. Create a pending Mindbody subscription for `clientSale.created` using the existing API key and canonical production URL `https://www.shantihotyoga.ca/api/mindbody/purchases`. Confirm the actual canonical host first to avoid redirects on POST/HEAD.
6. Save the returned signing key, independent cron secret and approved start date in the production hosting environment. Enable the feature flag and redeploy the exact reviewed source.
7. Verify an appropriately signed non-purchase event is acknowledged without a Mailchimp write, then activate the Mindbody subscription. Confirm the subscription is Active and its URL is correct.
8. Run the approved historical sync. Verify any tagged contacts by reading them back. Do not manufacture a real payment, register a test student, or send email to test this connection.

Creation of the subscription is a separate, deliberate operational step. Capture its ID and store the signing key securely as soon as it is returned; never create duplicates after an unknown outcome. Mindbody's subscription listing can be used to reconcile the result.

## Operations and handoff

Look for `mfr_purchase_webhook`, `mfr_purchase_reconciliation`, `mfr_purchase_review` and `mfr_purchase_failed` in Vercel logs. These contain counts and record references, not raw payloads, emails, API keys or payment data. Failures and unmatched records need staff review; this integration does not send staff notifications.

The existing drafts now check **Tags → doesn't have any of → MFR YTT 2027 - Registered** immediately before each of their four send-email actions. YES continues to the email; NO exits the flow. The first check also excludes existing registrants. Later checks run after the four-day delays, so registration during a delay is caught before the following send.

- Teacher draft: `https://us18.admin.mailchimp.com/customer-journey/builder?id=3745`
- General draft: `https://us18.admin.mailchimp.com/customer-journey/builder?id=3746`

Both remain **Draft**. Their entry triggers, email content, delays and original unfinished final If/Else points were not deliberately changed. The editor currently shows the teacher trigger as `MFR YTT 2027 - Launch` and the general trigger as `MFR YTT 2027 - General Launch`; the Mailchimp owner should settle that routing and the original unfinished final points before activation. No test email was sent and neither marketing flow was activated.

The approved one-time historical sync on October 14, 2026 found one qualifying recipient since July 16 and added the registration tag to that existing contact. A second read-only scan confirmed the tag was already present and no further write was needed.

Live tracking was enabled and verified on **October 14, 2026**:

- All five tracking settings are saved as **Secret**, scoped to **Production only** in Shanti's Vercel project.
- Production deployment `HcbUjEu7CZxt7Nzc47MVjUiHA1ix` is Ready and serves the canonical website domain.
- Mindbody subscription `5b1c3bd6-5554-473b-aec2-7f8f07925462` is **Active** for `clientSale.created`, pointing to the canonical webhook URL. The previous incomplete pending subscription was deactivated before replacement and was never active.
- A signed, non-purchase connection check returned 204 without a tag write. Unsigned webhook requests return 401.
- The authenticated production reconciliation returned 200: one qualifying receipt, one recipient already tagged, no failures or review items. An unauthenticated request returns 401.
- Vercel's Cron Jobs screen confirms the daily `/api/cron/mfr-purchases` job is enabled at 09:00 UTC.

No new payment or registration was manufactured to test delivery. The live provider connection, signed handler and production ledger reconciliation were verified; handling of simulated purchase notifications is covered by the 23 passing integration tests. Registration detection and email suppression are separate: tagging alone does not stop an automation without the saved checks.

If the feature must be stopped, set `MFR_PURCHASE_TRACKING_ENABLED=false`, redeploy, and deactivate the Mindbody subscription. The one-time sync command is separately explicit. Existing registration tags remain. Never bulk-remove them during rollback.
