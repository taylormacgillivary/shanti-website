import assert from "node:assert/strict";
import { test } from "node:test";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { requestYttInfoPackage } from "../src/app/actions/ytt-info-package";

process.env.MAILCHIMP_API_KEY = "test-key";
process.env.MAILCHIMP_SERVER_PREFIX = "us18";
process.env.MAILCHIMP_NEWSLETTER_AUDIENCE_ID = "test-audience";

const tag = { name: "YTT 2027 Info Package Request", status: "active" };

function form(email = " Student@Example.com ") {
  const data = new FormData();
  data.set("firstName", " Sam ");
  data.set("email", email);
  return data;
}

test("a new contact is created in the newsletter audience before applying the YTT tag", async (t) => {
  t.mock.method(mailchimp.lists, "getListMember", async () => { throw { status: 404 }; });
  const create = t.mock.method(mailchimp.lists, "addListMember", async () => ({ status: "subscribed" }));
  const applyTag = t.mock.method(mailchimp.lists, "updateListMemberTags", async () => ({}));

  assert.deepEqual(await requestYttInfoPackage(form()), { status: "requested" });
  assert.deepEqual(create.mock.calls[0].arguments, ["test-audience", {
    email_address: "student@example.com",
    status: "subscribed",
    merge_fields: { FNAME: "Sam" },
  }]);
  assert.deepEqual(applyTag.mock.calls[0].arguments, ["test-audience", "student@example.com", { tags: [tag] }]);
});

test("an existing subscriber receives only the tag, and repeat requests don't reapply it", async (t) => {
  const existingTags: { name: string }[] = [];
  t.mock.method(mailchimp.lists, "getListMember", async () => ({ status: "subscribed", tags: existingTags }));
  const create = t.mock.method(mailchimp.lists, "addListMember", async () => ({}));
  const update = t.mock.method(mailchimp.lists, "setListMember", async () => ({}));
  const applyTag = t.mock.method(mailchimp.lists, "updateListMemberTags", async () => ({}));

  assert.deepEqual(await requestYttInfoPackage(form()), { status: "requested" });
  assert.equal(create.mock.callCount(), 0);
  assert.equal(update.mock.callCount(), 0);
  assert.deepEqual(applyTag.mock.calls[0].arguments, ["test-audience", "student@example.com", { tags: [tag] }]);

  existingTags.push(tag);
  assert.deepEqual(await requestYttInfoPackage(form()), { status: "already-requested" });
  assert.equal(applyTag.mock.callCount(), 1);
});

test("a concurrent signup preserves an existing opt-out", async (t) => {
  const lookup = t.mock.method(mailchimp.lists, "getListMember", async () => ({ status: "unsubscribed" }));
  lookup.mock.mockImplementationOnce(async () => { throw { status: 404 }; });
  t.mock.method(mailchimp.lists, "addListMember", async () => {
    throw { status: 400, response: { body: { title: "Member Exists" } } };
  });
  const applyTag = t.mock.method(mailchimp.lists, "updateListMemberTags", async () => ({}));

  assert.deepEqual(await requestYttInfoPackage(form()), { status: "resubscribe" });
  assert.equal(lookup.mock.callCount(), 2);
  assert.equal(applyTag.mock.callCount(), 0);
});

test("invalid form submissions never reach Mailchimp", async (t) => {
  const lookup = t.mock.method(mailchimp.lists, "getListMember", async () => ({}));
  assert.equal((await requestYttInfoPackage(form("invalid"))).status, "error");
  const bot = form();
  bot.set("website", "https://example.com");
  assert.equal((await requestYttInfoPackage(bot)).status, "error");
  assert.equal(lookup.mock.callCount(), 0);
});
