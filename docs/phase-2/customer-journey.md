# RIFCOS — Complete Customer Journey

## Overview

This document walks through every step a customer takes from first opening the app to completing a booking and leaving a review. It covers the happy path (everything goes right) and the key alternate paths (things go wrong or the customer changes their mind).

---

## 1. App Open (First Time)

The customer opens the app for the first time.

**What they see:** The welcome screen with the RIFCOS brand, tagline ("Request an Oyster Shucker for your next event"), and two options — Sign In or Create Account.

**What happens next:** They tap Create Account.

---

## 2. Account Creation

**What they see:** A signup screen asking them to choose their role ("I need a shucker" or "I am a shucker"), plus fields for full name, email, and password.

**What they do:** Select "I need a shucker," fill in their details, tap Get Started.

**What happens behind the scenes:** Firebase Auth creates the account. A `users` document is created in Firestore with their basic info and `role: "customer"`. A `user_signed_up` event is logged.

---

## 3. Onboarding

**What they see:** A short onboarding flow (2–3 screens):
1. **Location permission** — "RIFCOS needs your location to find shuckers near you." System location prompt appears.
2. **Default location setup** — Confirm or adjust their home location on a map.
3. **Done** — "You're all set!" confirmation.

**What happens behind the scenes:** Location permission is stored. Default location is saved to their `users` document. `user_onboarding_complete` event is logged.

---

## 4. Home Screen

**What they see:** The main home screen with a greeting and one prominent card — "Request an Oyster Shucker" with a brief description ("Fresh shucked oysters at your next event").

**What they do:** Tap the request card to start a booking.

---

## 5. Request Form

**What they see:** A multi-step form collecting the details of their event:

**Step 5a — Event Details**
- Estimated guest count (dropdown or input)
- Type of event (party, wedding, corporate, other)
- Any special notes (free text, optional)

**Step 5b — Date and Time**
- Calendar date picker
- Time picker
- If same-day and less than 6 hours away, they see an urgency note

**Step 5c — Location**
- Map with their default location pre-filled
- Option to search for a different address or adjust the pin
- Confirm event address

**What they do:** Fill in the details across each step and tap Continue/Next at each stage.

**What happens behind the scenes:** Nothing is saved to Firestore yet — this is all local state until they submit for a quote.

---

## 6. Quote Screen

**What they see:** A pricing breakdown screen showing:
- The total quoted price (prominent, large number)
- If surge pricing is active, a message like "High demand — prices are elevated"
- A Confirm Booking button
- A back arrow to modify their request

**What they do:** Either accept the quote (tap Confirm Booking) or go back / leave (quote abandoned).

**What happens behind the scenes:**
- The pricing engine calculates the quote using base fee, distance, time, demand, and supply inputs.
- A `pricingRecords` document is created with the full input breakdown.
- `quote_generated` event is logged.
- If they confirm: `quote_accepted` event is logged, payment is authorized via Stripe, request transitions to `confirmed`.
- If they leave: `quote_abandoned` event is logged, request transitions to `abandoned`.

---

## 7. Finding a Shucker

**What they see:** A waiting screen with an animation or spinner and the message "Finding your shucker..."

**What happens behind the scenes:**
- Request status moves to `matching`.
- The system queries available providers in range, ranks them by match score, and sends the request to the top-ranked provider.
- `matching_started` event is logged.
- If a provider is found and notified: `provider_matched` event is logged.

**Alternate paths:**
- **No providers available:** After timeout, request moves to `cancelled_by_system`. Customer sees "We couldn't find a shucker right now" with an option to try again later.
- **Provider declines:** System tries the next ranked provider. If all attempts exhausted, same cancellation flow.

---

## 8. Shucker Confirmed

**What they see:** A confirmation screen — "Your shucker is confirmed!" with the provider's name, photo, rating, and the job details summary.

**What happens behind the scenes:** Provider accepted the request. Request moves to `accepted`. A `jobs` document is created. `provider_accepted` event is logged. Push notification sent to customer.

---

## 9. Tracking — En Route

**What they see:** A live map showing the provider's location moving toward their event address. A status bar shows "Your shucker is on the way" with an ETA.

**What happens behind the scenes:** Provider tapped "Start Navigation." Job status moves to `provider_en_route`. Provider location updates stream from the native module through Firebase. `provider_en_route` event is logged.

---

## 10. Tracking — Arrived

**What they see:** The map stops moving. Status updates to "Your shucker has arrived." Push notification received.

**What happens behind the scenes:** Provider tapped "I've Arrived." Job status moves to `provider_arrived`. `provider_arrived` event is logged.

---

## 11. Service In Progress

**What they see:** Status screen shows "Service in progress." No action needed from the customer.

**What happens behind the scenes:** Provider tapped "Start Service." Job status moves to `in_progress`. `job_started` event is logged.

---

## 12. Service Complete

**What they see:** A completion screen — "Your experience is complete!" with a summary of the event and the final charge amount. Payment is captured automatically.

**What happens behind the scenes:** Provider tapped "Complete Job." Job status moves to `completed`. Payment intent is captured via Stripe. `job_completed` and `payment_captured` events are logged.

---

## 13. Rating and Review

**What they see:** A prompt — "How was your experience?" with a 1–5 star rating and an optional text review field. A Submit button.

**What they do:** Leave a rating (required) and optionally write a review, then submit.

**What happens behind the scenes:** A `ratings` document is created. The provider's `rating` and `totalRatings` fields are updated. `review_submitted` event is logged.

---

## 14. Back to Home

**What they see:** They return to the home screen. Their completed booking now appears in the Bookings tab with full details.

---

## Returning Customer Flow

When a returning customer opens the app:

1. **Auto sign-in** — Session is persisted, no login needed.
2. **Active booking?** — If they have a request in progress, they go directly to the status/tracking screen instead of the home screen.
3. **No active booking** — They see the home screen and can start a new request.

---

## Key Alternate Paths

| Scenario | What happens |
|---|---|
| Customer cancels before provider assigned | Request moves to `cancelled_by_customer`. Payment authorization is released. Confirmation shown. |
| Customer cancels after provider en route | Request moves to `cancelled_by_customer`. Flagged for admin review. Provider notified. |
| Provider cancels after accepting | Request moves to `cancelled_by_provider`. Customer sees "Your shucker had to cancel" with option to rebook. System attempts to find a new provider. |
| Payment fails | Request moves to `cancelled_by_system` with reason `payment_failed`. Customer sees error and is prompted to update payment method. |
| No providers available | After timeout, request expires. Customer sees "No shuckers available" with option to try a different time. |
| App closed mid-tracking | Customer can reopen the app and return to the live tracking screen. Status is always synced from Firestore. |
