// Verification entrypoint: structural checks, core booking logic, and route smoke tests.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  assistantReply,
  destinations,
  flights,
  formatCardNumber,
  formatMoney,
  getDestination,
  luhnValid,
  makeBookingReference,
  nightsBetween,
  searchFlights,
  searchStays,
  stays,
  validatePayment,
  validateTraveler
} from "./core.mjs";
import { createAppServer } from "./dev-server.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const read = (name) => readFile(join(root, name), "utf8");
let passed = 0;
let failed = 0;

function check(label, fn) {
  try {
    fn();
    passed += 1;
    console.log(`PASS  ${label}`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL  ${label}`);
    console.error(`      ${error.message}`);
  }
}

const [html, css, app, core] = await Promise.all([
  read("index.html"),
  read("styles.css"),
  read("app.js"),
  read("core.mjs")
]);

check("entry page declares English and a responsive viewport", () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /name="viewport"/);
});

check("all interactive demo regions are present", () => {
  for (const id of [
    "search-form",
    "destination-grid",
    "results-grid",
    "booking-modal",
    "booking-form",
    "confirmation-modal",
    "chat-panel",
    "chat-form",
    "add-calendar"
  ]) {
    assert.ok(html.includes(`id="${id}"`), `missing #${id}`);
  }
});

check("no auth wall before the product", () => {
  assert.doesNotMatch(html, /type="password"/i);
  assert.doesNotMatch(html, />\s*(sign in|log in|create account)\s*</i);
});

check("six seeded destinations and at least twelve stays", () => {
  assert.equal(destinations.length, 6);
  assert.ok(stays.length >= 12, `only ${stays.length} stays`);
  assert.ok(flights.length >= 6, `only ${flights.length} flights`);
});

check("Lisbon has three stays and two sample fares", () => {
  assert.equal(searchStays("lisbon").length, 3);
  assert.equal(searchFlights("lisbon").length, 2);
  assert.equal(getDestination("lisbon").city, "Lisbon");
});

check("nights calculation handles valid and invalid ranges", () => {
  assert.equal(nightsBetween("2026-12-01", "2026-12-05"), 4);
  assert.equal(nightsBetween("2026-12-05", "2026-12-01"), 0);
  assert.equal(nightsBetween("not-a-date", "2026-12-01"), 0);
});

check("money formatting is stable", () => {
  assert.equal(formatMoney(612), "$612");
  assert.equal(formatMoney(0), "$0");
});

check("demo card passes Luhn and formats in groups", () => {
  assert.equal(luhnValid("4242 4242 4242 4242"), true);
  assert.equal(luhnValid("4242 4242 4242 4241"), false);
  assert.equal(formatCardNumber("4242424242424242"), "4242 4242 4242 4242");
});

check("payment validation rejects bad number, expiry and CVC", () => {
  const good = {
    name: "ALEX MORGAN",
    number: "4242 4242 4242 4242",
    expiry: "12/29",
    cvc: "123"
  };
  const today = new Date("2026-11-10T12:00:00");
  assert.equal(validatePayment(good, today).valid, true);
  assert.equal(validatePayment({ ...good, number: "1234 5678 9012 3456" }, today).valid, false);
  assert.equal(validatePayment({ ...good, expiry: "01/20" }, today).valid, false);
  assert.equal(validatePayment({ ...good, cvc: "1" }, today).valid, false);
  assert.equal(validatePayment({ ...good, name: "" }, today).valid, false);
});

check("traveler validation catches missing fields and bad email", () => {
  assert.equal(
    validateTraveler({ firstName: "Alex", lastName: "Morgan", email: "alex@example.com" }).valid,
    true
  );
  const invalid = validateTraveler({ firstName: "", lastName: "", email: "nope" });
  assert.equal(invalid.valid, false);
  assert.deepEqual(Object.keys(invalid.errors).sort(), ["email", "firstName", "lastName"]);
});

check("booking reference has the expected shape and is deterministic", () => {
  const reference = makeBookingReference(42);
  assert.match(reference, /^MRD-[A-Z2-9]{6}$/);
  assert.equal(reference, makeBookingReference(42));
});

check("assistant answers the seeded intents", () => {
  assert.match(assistantReply("Find a beach escape"), /Lisbon|Cape Town/);
  assert.match(assistantReply("Kyoto in spring"), /Kyoto/);
  assert.match(assistantReply("How does payment work?"), /Stripe|card/i);
  assert.match(assistantReply("Talk to a human"), /human agent/i);
  assert.match(assistantReply("something else"), /destinations|stays|flights/i);
});

check("styles are light, responsive and clip horizontal overflow", () => {
  assert.match(css, /--paper:\s*oklch\(97\.6%/, "expected a light paper token");
  assert.match(css, /overflow-x:\s*clip/);
  assert.doesNotMatch(css, /transition:\s*all/i);
  assert.doesNotMatch(css, /100vw/);
  assert.doesNotMatch(css, /prefers-color-scheme:\s*dark/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
});

check("app wires the search, booking, payment and chat flows", () => {
  for (const fragment of [
    "renderResults",
    "openBooking",
    "confirmBooking",
    "showConfirmation",
    "downloadCalendar",
    "sendChat",
    "assistantReply"
  ]) {
    assert.ok(app.includes(fragment), `app.js is missing ${fragment}`);
  }
  assert.ok(core.includes("validatePayment"));
});

check("no hardcoded secrets in the shipped files", () => {
  for (const [name, source] of [["index.html", html], ["app.js", app], ["core.mjs", core]]) {
    assert.doesNotMatch(source, /sk_live_|sk_test_|api[_-]?key\s*[:=]\s*["'][^"']+["']/i, name);
  }
});

async function checkRoutes() {
  const server = createAppServer();
  await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
  const { port } = server.address();
  const base = `http://127.0.0.1:${port}`;
  try {
    for (const [route, type] of [
      ["/", "text/html"],
      ["/styles.css", "text/css"],
      ["/app.js", "text/javascript"],
      ["/core.mjs", "text/javascript"]
    ]) {
      const response = await fetch(`${base}${route}`);
      assert.equal(response.status, 200, `${route} returned ${response.status}`);
      assert.match(response.headers.get("content-type") || "", new RegExp(type));
    }
    const missing = await fetch(`${base}/does-not-exist`);
    assert.equal(missing.status, 404);
  } finally {
    await new Promise((resolveClose) => server.close(resolveClose));
  }
}

try {
  await checkRoutes();
  passed += 1;
  console.log("PASS  entry route and static assets respond over HTTP");
} catch (error) {
  failed += 1;
  console.error("FAIL  entry route and static assets respond over HTTP");
  console.error(`      ${error.message}`);
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
