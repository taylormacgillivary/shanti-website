import assert from "node:assert/strict";
import { test } from "node:test";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { subscribeToNewsletter } from "../src/app/actions/newsletter";
import { NEWSLETTER_SIGNUP_URL, newsletterSubscriptionResult } from "../src/lib/newsletter-subscription";

process.env.MAILCHIMP_API_KEY = "test-key";
process.env.MAILCHIMP_SERVER_PREFIX = "us18";
process.env.MAILCHIMP_NEWSLETTER_AUDIENCE_ID = "test-audience";

for (const status of ["subscribed", "unsubscribed", "archived", "pending", "cleaned", "transactional", "unexpected"]) {
  test(`newsletter action handles Mailchimp status ${status} without forcing a resubscription`, async (t) => {
    const member = t.mock.method(mailchimp.lists, "setListMember", async () => ({ status }));
    const tags = t.mock.method(mailchimp.lists, "updateListMemberTags", async () => ({}));
    const result = await subscribeToNewsletter({ email: "Returning@Example.com" });

    assert.equal(member.mock.callCount(), 1);
    const request = member.mock.calls[0].arguments;
    assert.equal(request[0], "test-audience");
    assert.equal(request[1], "returning@example.com");
    const body = request[2];
    assert.ok(body);
    assert.equal(body.status_if_new, "subscribed");
    assert.equal("status" in body, false, "must preserve the existing opt-out");
    assert.equal(tags.mock.callCount(), 1);
    assert.equal(result.success, status === "subscribed");
    assert.equal(result.status, status === "unsubscribed" || status === "archived" ? "resubscribe" :
      status === "subscribed" || status === "pending" ? status : "error");

    if (result.status === "resubscribe" || result.status === "pending") {
      assert.equal(result.signupUrl, NEWSLETTER_SIGNUP_URL);
      assert.equal(new URL(result.signupUrl).searchParams.has("email"), false);
    }
    t.mock.restoreAll();
  });
}

test("Mailchimp compliance errors give contacts a self-service signup path", async (t) => {
  t.mock.method(mailchimp.lists, "setListMember", async () => {
    throw { status: 400, response: { body: { detail: "Contact is in a compliance state and cannot be subscribed." } } };
  });
  const tags = t.mock.method(mailchimp.lists, "updateListMemberTags", async () => ({}));
  const result = await subscribeToNewsletter({ email: "returning@example.com" });
  assert.equal(result.success, false);
  assert.equal(result.status, "resubscribe");
  assert.equal(tags.mock.callCount(), 0);
  t.mock.restoreAll();
});

test("an API failure never becomes a successful subscription", async (t) => {
  t.mock.method(mailchimp.lists, "setListMember", async () => { throw { status: 503 }; });
  assert.equal((await subscribeToNewsletter({ email: "returning@example.com" })).status, "error");
  assert.equal(newsletterSubscriptionResult({ success: true, message: "Updated" }).success, false);
  t.mock.restoreAll();
});

test("invalid email is rejected before Mailchimp is called", async (t) => {
  const member = t.mock.method(mailchimp.lists, "setListMember", async () => { throw new Error("unexpected request"); });
  const result = await subscribeToNewsletter({ email: "invalid" });
  assert.equal(result.status, "error");
  assert.equal(member.mock.callCount(), 0);
  t.mock.restoreAll();
});
