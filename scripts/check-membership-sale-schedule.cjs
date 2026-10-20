const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const ts = require("typescript");

const temp = fs.mkdtempSync(path.join(os.tmpdir(), "shanti-sale-schedule-"));
try {
  for (const name of ["membership-sale", "membership-sale-window"]) {
    const source = fs.readFileSync(path.join(__dirname, "../src/lib", `${name}.ts`), "utf8");
    fs.writeFileSync(path.join(temp, `${name}.js`), ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText);
  }
  const { membershipSale, getMembershipSaleStatus } = require(path.join(temp, "membership-sale.js"));
  const { isMembershipSaleNavOrPopupVisible } = require(path.join(temp, "membership-sale-window.js"));
  const configuredPause = membershipSale.promotionPaused;
  assert.equal(typeof configuredPause, "boolean");
  assert.equal(membershipSale.dates, "October 20–22, 2026");
  assert.equal(new Date(membershipSale.startsAt).toISOString(), "2026-10-20T03:01:00.000Z");
  assert.equal(new Date(membershipSale.endsAt).toISOString(), "2026-10-24T01:00:00.000Z");

  const cases = [
    ["2026-10-20T00:00:59.999-03:00", "upcoming"],
    ["2026-10-20T00:01:00.000-03:00", "active"],
    ["2026-10-22T23:59:59.999-03:00", "active"],
    ["2026-10-23T00:00:00.000-03:00", "active"],
    ["2026-10-23T21:59:59.999-03:00", "active"],
    ["2026-10-23T22:00:00.000-03:00", "ended"],
    ["2026-10-24T00:00:00.000-03:00", "ended"],
  ];
  for (const zone of ["America/Halifax", "UTC", "America/Los_Angeles"]) {
    process.env.TZ = zone;
    for (const [instant, expected] of cases) {
      const now = new Date(instant);
      assert.equal(getMembershipSaleStatus(now), expected, `${zone}: ${instant}`);
      assert.equal(isMembershipSaleNavOrPopupVisible(now), !configuredPause && expected === "active", `${zone}: configured ${instant}`);
      membershipSale.promotionPaused = true;
      assert.equal(isMembershipSaleNavOrPopupVisible(now), false, `${zone}: paused ${instant}`);
      membershipSale.promotionPaused = false;
      assert.equal(isMembershipSaleNavOrPopupVisible(now), expected === "active", `${zone}: restored ${instant}`);
      membershipSale.promotionPaused = configuredPause;
    }
  }
  console.log("Passed: manual pause, restored schedule, exact boundaries and grace day in 3 timezones.");
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
