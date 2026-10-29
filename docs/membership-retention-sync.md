# October 2026 membership retention connector

October 29 update: the tag-only job remains incapable of sending. A separately
gated delivery scheduler is now implemented in preview mode; see
[membership-retention-delivery.md](membership-retention-delivery.md) for current
delivery rules and activation checks. Taylor confirmed that the sale commitment
is four months and staff create months 3–4 separately; this supersedes the
earlier continuation-review assumptions and billing-reminder notes below.
Production staff credentials and the tag job were already deployed and verified
on October 28; the original deployment checklist below is historical.

This implementation syncs Mindbody purchases, membership status, completed yoga
attendance and upcoming bookings to **existing** Mailchimp contacts. It cannot
send email, activate a journey, subscribe a contact, or restore archived contacts.
The three Mailchimp journeys remain drafts. Tags and merge fields alone do not
enter these API-triggered journeys.

## Scope and accounts

- Mindbody site 11233; Mailchimp us18, audience `20f894ac06`.
- Intake: October 20–28, 2026 inclusive, including verified late purchases.
  This fixed cutoff prevents a later reuse of the pricing options enrolling an
  unrelated cohort. Review and change it deliberately if more late sales qualify.
- Regular pricing option 1591 → template contract 184; student/senior 1592 → 185.
- Sale line ContractId is the **purchased instance**, not the template ID.
- A sale recipient RSSID maps to client UniqueId, then the returned custom Id is
  used to query that client's contracts/visits/schedule. Never match names.
- Gift purchases use the item recipient before falling back to sale recipient or
  purchaser. Returned purchases do not confer eligibility. A single paid
  replacement wins over an older refunded contract; multiple paid instances hold.
- Shared email addresses, missing identities/contracts, bad pagination and API
  failures hold eligibility for review. Missing contacts are not imported.
- Archived contacts stay untouched. Unsubscribed contacts can carry a historical
  cohort tag but are never made eligible or resubscribed.

## Data updates

The permanent `sale-2026-10` tag identifies matched historical buyers.
`sale-retention-eligible` requires an active qualifying contract and a subscribed
Mailchimp contact. The subscription is rechecked immediately before writing.
Cancelled/inactive/not-started contracts remain outside that eligibility tag.

Dynamic tags are refreshed from fresh complete reads:

- `sale-needs-first-class`: no completed yoga class at least seven calendar days
  after the actual membership start, with no confirmed upcoming yoga booking.
- `sale-return-check-in`: at least 14 calendar days since the latest completed
  yoga class, with no confirmed upcoming booking. A new attended visit resets it.
- `sale-practice-milestone`: five different completed yoga classes within
  `[actual start day, start day + 21 days)`. An earned milestone is retained.

Classes must have finished, SignedIn=true, Missed=false, LateCancelled=false,
and a yoga program ID (22,28,44,47). Pilates program 52, workshops, appointments,
waitlists, cancelled/no-show and future signed-in classes do not count. Duplicate
check-ins to the same class/start time count once. Upcoming booking lookup covers
the four-month program window. Four-month date arithmetic is used only as a
lookup horizon; it is not treated as a verified cancellation/billing deadline.

Use the **class** flags SignedIn/Missed/LateCancelled and the client schedule
roster to evaluate classes. Do not filter classes using AppointmentStatus: live
class records default that unrelated appointment field to "NoShow", including
attended and future booked classes. A regression fixture covers this source shape.
An in-progress booked class also suppresses an absence nudge; it is counted as
completed attendance only after its end time.

Private optional fields: SRSTART, SRLAST, SRNEXT (MM/DD/YYYY); SRVIS21 (count);
SRSTATUS; SRREASON; SRSYNC (UTC successful attendance snapshot). Existing unrelated
contact fields are never written. API/data failures preserve old attendance
values and their old SRSYNC, clear dynamic eligibility and report a failure.

Every eligible current-cohort contact with no SRSTAGE gets `support-01`, including
returning students. This connector **never advances** a support stage. Existing
stage values are preserved. A later delivery-aware dispatcher must advance stages
only after checking actual send history and the shared 72-hour spacing rule.

## Live-source issues that require care

1. Public V6 date/time fields are business-local wall time. The Sales endpoint
   appends Z, including midnight transactions, despite the business-local
   semantics. Do not apply the UTC webhook conversion to those API fields.
   Calendar rules use America/Halifax, including the November DST change.
2. On October 28, sales pagination reported 575 rows but returned 571 records;
   an out-of-range page reset TotalResults to zero. For sales only, when the
   reported total fits in 1,000 records, the connector independently re-reads
   a full page and compares every sale ID before accepting the terminal-page
   discrepancy. The discrepancy is counted. Attendance/client pagination remains
   strict: incomplete or changing results never mean zero visits.
3. Intro contracts end after two months, with only the next $19 autopay visible.
   The later full-price continuation schedule is not currently present in these
   client contract records. SRBILLAMT and SRBILLDAY remain blank, and billing
   reminders are not eligible for dispatch. The intro EndDate must never be
   mistaken for the four-month commitment end. Past that intro EndDate, this
   version holds the member for continuation review rather than guessing.
4. Mailchimp tag-segment membership can report total_items=0 with a nonempty
   member list. The connector explicitly paginates through an empty terminal page
   with unsubscribed/cleaned/transactional inclusion enabled. It checks duplicate
   IDs and uses the actual returned member lists, not that stale zero count.

## Run and deploy

Use the existing private environment file; never copy credentials into source.
Required: MINDBODY_API_KEY, MINDBODY_SITE_ID, MINDBODY_USERNAME,
MINDBODY_PASSWORD, MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX,
MAILCHIMP_NEWSLETTER_AUDIENCE_ID. MINDBODY_API_SOURCE_NAME is optional.

Production uses dedicated `RETENTION_MINDBODY_USERNAME` and
`RETENTION_MINDBODY_PASSWORD` secrets instead of the local MINDBODY_USERNAME and
MINDBODY_PASSWORD entries. This leaves older site configuration untouched and
prevents a fallback to those shared credentials in Production.

```sh
# Read-only by default. Output contains counts, never names/emails/raw payloads.
RETENTION_ENV_FILE=/absolute/private/.env npm run sync:retention

# Explicitly allow ONLY the five retention tags and ten private fields.
MEMBERSHIP_RETENTION_MODE=tags RETENTION_ENV_FILE=/absolute/private/.env \
  RETENTION_BACKUP_FILE=/absolute/private/pre-sync-backup.json \
  npm run sync:retention -- --apply-tags
```

GET `/api/cron/membership-retention` requires the existing CRON_SECRET bearer
header. It writes only when VERCEL_ENV=production AND
MEMBERSHIP_RETENTION_MODE=tags. Preview/off deployments do no external work.
The scheduled time is 10:30 UTC daily (7:30am ADT / 6:30am AST). Existing MFR
webhooks and the 09:00 UTC MFR job are unchanged. No new database/provider is
needed for this tag-only stage.

The manual CLI requires a new, private backup file before applying tags. It saves
only opaque Mailchimp IDs and the previous retention fields/tags, with local
owner-only permissions; it never writes names, email addresses or credentials.
The cloud job re-reads the fixed original intake window rather than scanning
months of unrelated later sales; original Returned flags and current contract
status remove refunded/cancelled membership eligibility.

Before enabling the production job, authorize storing the existing Mindbody staff
login as encrypted Production-only Vercel secrets, or supply a dedicated reporting
staff login. These credentials are not presently on the hosting project. Deploy
the checked source, set the mode to tags, invoke one authenticated run, then
verify the aggregate job output and Mailchimp tags. Avoid concurrent manual and
cron applications; tag updates are repeatable but a multi-field contact write is
not transactional. Keep sending disabled until the durable dispatcher below is
implemented. Inspect Vercel job failures; this is a daily cloud function, not a
local-computer or Codex scheduled task.

Read requests retry one transient failure (bounded); mutations are not blindly
retried. A per-run 240-second budget, 15-second request timeout, bounded
pagination and concurrency four prevent unbounded work. A partially completed
tag run can safely be rerun; eligibility is removed before fields are updated
and restored only after they succeed. All tag writes set `is_syncing=true` to
suppress tag-triggered automations.

## Required before emails can run

This is deliberately **not an activated email automation**. Still required:

- Durable delivery ledger, per-member atomic lease and message claim; actual
  Mailchimp delivery reconciliation; uncertain triggers held rather than retried.
- Shared minimum 72-hour spacing, one welcome/celebration per cohort, once per
  attendance lapse, and 14-day attendance-flow reentry spacing. A tag persisting
  across daily syncs must not repeatedly trigger a message.
- Fresh-data and eligibility checks at dispatch time; stage selection anchored
  to actual start dates; payment/decision date reminders held until their actual
  source dates and amounts are verified.
- Confirm the continuation setup, notice dates and how suspensions are reflected
  before implementing payment/commitment-end reminders.
- Assign staff follow-up owner for no-first-class at day 14; currently reported
  as an aggregate count, not a second automatic email.
- Internal end-to-end delivery test and content approval, then explicit journey
  activation. Existing journeys 3749/3750/3751 remain drafts throughout this phase.

## Validation

`npm run test:retention`, `npm run test:mfr`, `npm run build`.
Tests use invented contacts and mocked vendor responses. Live reconciliation is
run separately in read-only mode before any tag application.

Primary references: [Mindbody Public V6](https://developers.mindbodyonline.com/ui/documentation/public-api),
[Mailchimp member tag sync](https://mailchimp.com/developer/marketing/api/lists/members/create-member-tag),
[Mailchimp contact fields](https://mailchimp.com/developer/marketing/api/lists/members/update-member).
