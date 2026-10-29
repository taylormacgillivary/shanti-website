# Sale membership email delivery

## Current activation boundary

The daily attendance/tag job remains separate. The delivery job runs at 13:00 UTC
(10am ADT / 9am AST) and defaults to **preview**. Preview reads the current
Mindbody cohort and Mailchimp send history and tests the private store with an
invented fixture. It does not change contact fields, create per-contact delivery
claims, trigger journeys or send emails.

All three Mailchimp production journeys must stay in draft until Taylor asks
to activate. No subscriber is added or resubscribed by this system.

## Business rule confirmed by Taylor, October 29, 2026

Every qualifying sale buyer has a four-calendar-month commitment from the real
membership start. Mindbody's two-month introductory instance is a pricing
limitation: staff create the following contract for months 3–4 at the regular
or student/senior rate. After four months the membership renews monthly unless
the client requests cancellation.

Use the four-month commitment for this retention programme, rather than stopping
at the introductory EndDate. An inactive/expired intro after its natural end is
consistent with that staff-managed transition. An inactive current intro,
explicit termination, suspension, refund, inactive client, bad identity,
unsubscribed/archived contact or manual staff hold stops automated entry.
The programme ends at four months; monthly renewal does not restart it.

Staff must record cancellations/suspensions in Mindbody. Apply the Mailchimp
tag **sale-retention-hold** immediately when a request should stop these emails,
especially while a separately created continuation contract is being updated.
The sync reads this staff-owned tag, never removes it, and never changes the
contact's subscription status. Remove it only when the request is resolved
and further retention email is appropriate.

## Message cadence

Offsets are from each membership's actual start, in America/Halifax:

| Stage | Topic | Due |
| --- | --- | --- |
| support-01 | Finding your groove | Once on initial programme entry |
| support-02 | Your Brain on Yoga | Start + 21 days |
| support-03 | Discovering teachers | Start + 42 days |
| support-04 | Exploring class styles | Start + 56 days |
| support-05 | Finding classes that fit | Start + 77 days |
| support-06 | Continuing your practice | Four-month anniversary minus 14 days |

The oldest unsent due support message comes first. A late launch does not skip
welcome or send every overdue message together. Shared spacing is at least
72 hours since any of this programme's actual sends. Celebration comes next,
then attendance nudges. An attendance-flow entry also needs 14 days since the
previous attendance email, matching its Mailchimp reentry setting.

No first class: once after seven days and before day 14, with no upcoming booking.
At day 14 without any attended class, flag for staff review instead of repeating.
Return check-in: 14 days since the last attended class, no upcoming booking,
once for that lapse; a new attended class establishes a new lapse episode.
Celebration: five completed attended yoga classes in the first 21 days, once.

## Durable state and ambiguous sends

Private Vercel Blob store, Montréal region, connected only to Production using
Vercel OIDC. No long-lived read/write token was added to project environments.
Records contain pseudonymous member/identity hashes, membership start, message
claims and timestamps; no names, email addresses, visit histories or credentials.
There is no public file-serving route.

Origin reads use useCache=false. Initial writes forbid overwrite; subsequent
writes require the ETag read previously. Only one simultaneous worker can claim
a member, so cross-flow checks and stage selection share one history.

Persist the claim before updating routing; persist an uncertain state before
the one non-retried Customer Journey trigger POST. A 204 response means accepted,
not sent. Reconcile against the member's sent-only activity feed, matching exact
campaign ID and actual timestamp. Opens and clicks are not send receipts.
Receipt timestamp comparison accommodates the provider's whole-second rounding.

A pending/uncertain claim blocks all further programme emails. Missing send
history never proves non-delivery; do not automatically expire claims or retry
timeouts. Review in Vercel logs and Mailchimp before any manual repair.
Changing a member identity or start date against an existing ledger also holds
for review. Keep the ledger across rollbacks/redeployments and do not clear it
to restart the programme.

## Preflight and operations

GET /api/cron/membership-retention-delivery requires the existing CRON_SECRET.
Preview deployments and delivery mode off do no vendor work. The original
tag-only API write allowlist remains incapable of sending email.

Every job verifies the exact nine approved subjects, previews, sender, reply-to,
HTML and plain text against approved-emails.json. Any copy change requires a
new approved manifest before release. Production mode additionally requires
all nine campaigns to report sending status.

The job scans the complete fixed October 20–28 cohort afresh. Before each live
entry it rechecks client identity, membership, attendance, bookings, opt-in and
manual hold, applies the current fields/tags with tag automations suppressed,
and verifies the route immediately before the trigger. Source errors cannot
become zero attendance. Summaries/logs contain aggregate counts only.

The delivery function has an 800-second platform limit on the existing Pro Fluid plan, a 700-second API budget and a 420-second dispatch phase. New member claims stop with less than 90 seconds of API budget left. The tag-only job retains its original 240-second budget. The first verified cloud preview took 161.8 seconds; the larger delivery allowance leaves time for the initial welcome batch and its fresh checks.

Before activation: tests, build, deployed preview job, private-store origin-read
and stale-ETag rejection probe, approved-copy preflight and controlled provider
test. Then, only on Taylor's request:

1. Activate Mailchimp journeys 3749, 3750 and 3751.
2. Set Production MEMBERSHIP_RETENTION_DELIVERY_MODE=live and
   RETENTION_DELIVERY_APPROVED_REVISION to the revision in approved-emails.json.
3. Deploy, manually run once, verify actual sends/receipts, then leave the daily
   job running independently of Taylor's Mac.

To stop future entry, set the delivery mode to off and redeploy. To stop emails
already queued inside Mailchimp, pause the journeys there as well. A single
contact can be held using sale-retention-hold; Mailchimp unsubscribe remains
available as usual.

Review unsuccessful cron runs, delivery_stalled/pending_delivery_review,
accepted_ledger_review, source failures and budget_deferred. Unprocessed
candidates are reconsidered on a later complete run; a pending claim is never
automatically replayed.

References:
- https://mailchimp.com/developer/marketing/api/customer-journeys/create-journey-step-action-trigger
- https://mailchimp.com/developer/marketing/api-concepts/alternative-schemas
- https://vercel.com/docs/vercel-blob/using-blob-sdk
- https://vercel.com/docs/vercel-blob/private-storage
