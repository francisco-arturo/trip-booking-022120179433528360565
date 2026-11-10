# Demo - Meridian travel booking prototype

- **Live URL:** https://trip-booking-022120179433528360565.vercel.app
- **Local:** `node dev-server.mjs` then open `http://127.0.0.1:48765` (set `PORT` if the port is held)
- **Deploy:** `node .harness/deploy.mjs trip-booking-022120179433528360565` from the workspace root
- **Last verified:** 2026-11-10

## The 60-second path

Open the live URL, then:

| # | Do this | The visitor should see |
|---|---|---|
| 1 | Open the live link | A photo-led landing page with the search dock and six seeded destinations |
| 2 | Keep Lisbon and the prefilled dates, press Search stays | Three Lisbon stays with sample nightly rates |
| 3 | Press Reserve on Casa do Mar | A booking sheet with the stay summary, lead traveler and a prefilled demo card |
| 4 | Press Pay and confirm | A confirmed booking reference, trip facts and a working calendar download |
| 5 | Open Ask Meridian and tap Beach escape | A fast, seeded assistant reply with a human-handoff option |

The Flights tab uses the same flow with seeded fares. The assistant also answers baggage, payment, cancellation and Kyoto prompts.

## The one sentence to say about it

> "This is the whole booking journey a travel client needs to judge: discovery, stay and flight search, a reviewed total, card checkout and a confirmation, with an assistant that answers before support would."

## What is deliberately fake

- Every destination, stay, fare, rate and availability count is seeded sample data in `core.mjs`.
- Payment is simulated in the browser. The prefilled 4242 card is validated locally with Luhn, then a confirmation is generated. No charge is made and no card data leaves the page.
- The assistant uses keyword-matched canned replies. No model, live chat or ticketing service is connected.
- The integration panel names the intended production stack (Stripe, Duffel or Amadeus, Booking.com or Hotelbeds, Twilio or WhatsApp) but none of those connections exist in this prototype.
- There is no login. The demo opens as a seeded traveler, Alex Morgan.
- Confirmation references are generated locally. The calendar file is real but the reservation behind it is not.

## If something fails while they look

- Reload the page and repeat the 60-second path; all state resets to the seeded demo.
- The local server is only for review. The deployment is static, so no server process is needed on Vercel.
- Redeploy: `node .harness/deploy.mjs trip-booking-022120179433528360565` — a new deployment replaces the live one.

## Not built (next, if the user wants it)

- Real supplier APIs and server-side payment intents with webhooks.
- Accounts and saved trips; this prototype stores one confirmation in session storage only.
- Date-aware live availability, cancellation and refund flows.
- Multilingual copy and multi-currency conversion.
