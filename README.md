# Meridian

**An international trip booking demo that combines a stay and a flight in one search, then books it.**

[Live demo](https://trip-booking-022120179433528360565.vercel.app) | HTML, CSS and JavaScript, no build step

![The Meridian home page](docs/screenshot.png)

Six seeded destinations, a combined stay and flight search, and a booking sheet that validates the
traveller and the card before issuing a confirmation reference with a calendar file.

## What it does

- **Combined search.** Pick a destination and dates, and see the stay and the flight for that trip
  side by side rather than in two separate funnels.
- **Six destinations** with seeded inventory, so every result is walkable today.
- **A booking sheet** with traveller details and local card validation before the confirmation step.
- **A confirmation reference** with an `.ics` calendar download.
- **A fast-reply assistant** that answers common questions and hands the conversation to a human
  when it does not know.
- **Labelled integration slots** for Stripe, Duffel or Amadeus, Booking.com or Hotelbeds, and Twilio
  or WhatsApp. They are marked as slots in the UI, never presented as live connections.

## Run it locally

```bash
node dev-server.mjs
```

Open <http://127.0.0.1:4173>. Nothing to install.

## Verify

```bash
node verify.mjs
```

Checks the data model, the search and booking wiring, required files, and the static routes over
HTTP, including the confirmation path.

## How it is built

| Path | Purpose |
|---|---|
| `index.html` | Search, results, booking sheet, confirmation and assistant |
| `styles.css` | The visual system |
| `app.js` | Views, booking flow, assistant behaviour |
| `core.mjs` | Search, pricing and booking rules as pure functions |
| `dev-server.mjs` | Zero-dependency local preview server |

## What is simulated

Sample inventory and simulated payment only. The destinations, hotels, fares, availability and the
assistant's replies are seeded data. No travel supplier, payment provider or messaging provider is
connected.

## About this prototype

Built as a working prototype for a real brief, then published as part of a portfolio. It shows the
search-to-confirmation shape and where real suppliers would plug in, not a production booking engine.
