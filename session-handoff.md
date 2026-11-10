# Session Handoff — Prototype: trip-booking-022120179433528360565

## Last Updated

- 2026-11-10 — Meridian travel booking prototype built and verified locally.

## Current Objective

International travel booking platform: destination discovery, flight and stay search, booking checkout with simulated payment, confirmation, and a fast-reply travel assistant on seeded demo data.

## Recommended Next Step

1. User reviews `http://127.0.0.1:48765` using the path in `DEMO.md`.
2. If approved, create the GitHub repository `trip-booking-022120179433528360565` and share its URL.
3. Push, add the remote to `github.json` → `approved_remotes`, deploy with `node .harness/deploy.mjs trip-booking-022120179433528360565`, then send the live URL.
4. Only write a proposal when the user asks for one.

## Files

- `index.html` — landing page, search dock, results, destinations, integration slots, chat panel, booking sheet and confirmation modal.
- `styles.css` — light travel editorial design, responsive rules, focus/pressed/disabled states, reduced-motion fallback.
- `app.js` — browser wiring for search, result rendering, booking, validation, confirmation, calendar download and chat.
- `core.mjs` — seeded catalog and pure helpers (money, dates, Luhn, payment/traveler validation, references, assistant replies).
- `dev-server.mjs` — local static server only; excluded from deployment.
- `verify.mjs` — structural, logic and HTTP verification.
- `init.ps1` / `init.sh` — run `node verify.mjs`.
- `DEMO.md` — 60-second click path and the honest fake list.
- `.vercelignore` — keeps local tooling and docs out of the deployment.

## Blockers

- None for the local build.
- Live deployment is waiting on user approval and a repository URL.
- No real supplier, payment provider or live assistant is connected; all inventory and replies are seeded.

## Next Session

- If the baseline gate is red on arrival, fix that before adding scope.
- Do not create a second directory for this prototype; continue in this one.
- Re-run `powershell -ExecutionPolicy Bypass -File .\init.ps1`, then `node ..\.harness\gate.mjs`.
- Retirement, if ever needed, goes through the workspace `retire-prototype.ps1`.
