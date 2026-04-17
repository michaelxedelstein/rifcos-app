# Phase 3 Step 8: Cloud Functions Scaffolding

## Overview

Three Cloud Functions are deployed to Firebase, running on Node.js 20 in `us-central1`. They handle auth lifecycle events and the first version of the pricing engine.

## Functions

### onUserCreated (v1 Auth Trigger)

- **Trigger:** Fires whenever a new Firebase Auth user is created
- **Purpose:** Safety net — if the client-side signup fails to write the Firestore user document, this function creates a basic one so the user isn't stuck
- **What it does:** Checks if a `users/{uid}` document already exists. If not, it creates one with the user's email, an empty name, `role: "customer"`, and `onboardingComplete: false`

### onUserDeleted (v1 Auth Trigger)

- **Trigger:** Fires whenever a Firebase Auth user is deleted
- **Purpose:** Cleanup — removes the user's data from Firestore so there's no orphaned records
- **What it does:** Deletes the `users/{uid}` document and, if it exists, the `providers/{uid}` document

### generateQuote (v2 Callable)

- **Trigger:** Called from the mobile app using `httpsCallable`
- **Purpose:** Takes event details and returns a price quote
- **Inputs:** `guestCount`, `eventType`, `eventDate`, `eventTime`, `locationLat`, `locationLng`, optional `notes`
- **Pricing formula (V1):**
  - Base fee: $75
  - Per-guest charge: $3.50/guest
  - Distance charge: $1.50/mile (hardcoded to 5 miles — real distance calc comes in Phase 6)
  - Same-day premium: +$25 if the event is less than 6 hours away
  - Surge multiplier: 1.0x (dynamic surge comes in Phase 7)
- **What it creates:** A `requests` document (status: `quote_generated`) and a `pricingRecords` document (full breakdown for auditing)
- **Returns:** `{ requestId, breakdown }` so the app can show the quote

## Files

| File | Purpose |
|------|---------|
| `functions/src/index.ts` | Entry point — sets global options, re-exports all functions |
| `functions/src/auth.ts` | `onUserCreated` and `onUserDeleted` auth triggers |
| `functions/src/pricing.ts` | `generateQuote` callable function |
| `functions/package.json` | Dependencies (firebase-admin, firebase-functions), Node 20 engine |
| `functions/tsconfig.json` | TypeScript config, outputs to `lib/` |

## Deployment

```bash
# Deploy all functions
firebase deploy --only functions

# View function logs
firebase functions:log
```

The `firebase.json` predeploy hooks automatically run `lint` (TypeScript type check) and `build` before deploying.

## Deferred

- **Real distance calculation:** `generateQuote` uses a hardcoded 5-mile distance. Google Maps Distance Matrix integration comes in Phase 6.
- **Dynamic surge:** Surge multiplier is fixed at 1.0x. Real surge logic based on demand/supply comes in Phase 7.
- **Admin-configurable pricing:** Base fee, per-guest rate, and distance rate are hardcoded. Admin pricing controls come in Phase 8.
