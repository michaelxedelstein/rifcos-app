# RIFCOS — Complete Provider Journey

## Overview

This document walks through every step a provider (oyster shucker) takes from first opening the app through completing jobs and building their reputation. It covers the happy path and key alternate paths.

---

## 1. App Open (First Time)

The provider opens the app for the first time.

**What they see:** The same welcome screen as customers — RIFCOS brand, tagline, Sign In or Create Account.

**What happens next:** They tap Create Account.

---

## 2. Account Creation

**What they see:** The signup screen with role selection. They choose "I am a shucker" and fill in their full name, email, and password.

**What they do:** Select the provider role, fill in details, tap Get Started.

**What happens behind the scenes:** Firebase Auth creates the account. A `providers` document is created in Firestore with `accountStatus: "registered"` and `role: "provider"`. A `provider_signed_up` event is logged.

---

## 3. Provider Onboarding

**What they see:** A multi-step onboarding flow collecting the information needed for approval:

**Step 3a — Profile Basics**
- Full name (pre-filled from signup)
- Phone number
- Profile photo (optional at this stage)

**Step 3b — Service Information**
- Years of experience with oyster shucking
- General service area (city or region)
- How far they're willing to travel (service radius in miles)

**Step 3c — Credentials**
- Food handler certification (yes/no)
- Any relevant licenses or certifications
- Additional notes about their experience

**Step 3d — Location**
- Location permission request
- Confirm their home base location on a map

**What they do:** Fill in each step and tap Continue/Next.

**What happens behind the scenes:** All profile data is saved to their `providers` document as they go. On the final step, `accountStatus` changes to `"pending_approval"` and `provider_submitted_profile` event is logged.

---

## 4. Waiting for Approval

**What they see:** A holding screen — "Your application is under review. We'll notify you when you're approved." No access to the main dashboard.

**What happens behind the scenes:** Their profile appears in the admin dashboard's provider approval queue. An admin reviews their information and either approves or rejects them.

**Alternate path — Rejected:** If rejected, they see "Your application was not approved" with a reason and the option to update their profile and resubmit.

---

## 5. Approved — First Dashboard View

**What they see:** Push notification — "You've been approved! You can now start accepting jobs." When they open the app, they land on the Provider Dashboard showing:
- An online/offline toggle (currently offline)
- Today's jobs count (0)
- Their rating (no rating yet)

**What happens behind the scenes:** `accountStatus` changed to `"approved"` by admin. `provider_approved` event was logged.

---

## 6. Going Online

**What they see:** They tap the online/offline toggle. It switches to green — "Online — Ready for requests."

**What happens behind the scenes:** `availabilityStatus` changes to `"online"`. Their current location starts updating in Firebase Realtime Database (`/presence/{providerId}`). `provider_went_online` event is logged. They are now eligible to receive incoming requests.

---

## 7. Waiting for a Request

**What they see:** The dashboard stays on screen. Nothing changes until a request comes in. They can see their stats and browse past jobs.

**What happens behind the scenes:** The system knows they're online and includes them in match scoring when customers make requests in their area.

---

## 8. Incoming Request

**What they see:** A notification appears (push notification if app is backgrounded, in-app alert if active) showing:
- "New request!"
- Customer's event location (distance from current location)
- Date and time of the event
- Estimated payout
- Accept and Decline buttons
- A countdown timer (they have a limited window to respond)

**What they do:** Tap Accept or Decline.

**What happens behind the scenes:** The system matched this provider based on their match score (distance, reliability, rating, response speed). `provider_matched` event was already logged when they were selected.

---

## 9a. Accepting the Request

**What they see:** Confirmation — "Job confirmed!" The screen transitions to the Job Detail view showing:
- Customer name
- Event address (with map)
- Event date and time
- Guest count and event type
- Any special notes from the customer
- A "Start Navigation" button

**What happens behind the scenes:** Job status moves to `accepted`. A `jobs` document is created. `provider_accepted` event is logged with their response time. `availabilityStatus` changes to `"busy"`. Customer gets a push notification that their shucker is confirmed.

---

## 9b. Declining the Request

**What they see:** Brief confirmation — "Request declined." They stay on the dashboard and remain online for future requests.

**What happens behind the scenes:** `provider_declined` event is logged with response time. The system moves to the next ranked provider for that request. Declining is tracked and affects their acceptance rate over time.

---

## 9c. Timeout (No Response)

**What happens:** If they don't respond within the timeout window, the request is automatically passed to the next provider.

**What they see:** The notification disappears. No penalty screen, but `match_timeout` event is logged and it counts against their response metrics.

---

## 10. Navigating to the Job

**What they see:** After tapping "Start Navigation," a map view opens showing the route to the customer's location with turn-by-turn guidance or a link to their preferred maps app (Google Maps / Apple Maps).

**What they do:** Follow the route.

**What happens behind the scenes:** Job status moves to `provider_en_route`. Their live location updates stream to Firebase so the customer can track them. `provider_en_route` event is logged. Background location tracking activates via native modules.

---

## 11. Arriving at the Location

**What they see:** When they reach the destination, they tap an "I've Arrived" button on the job screen.

**What happens behind the scenes:** Job status moves to `provider_arrived`. `provider_arrived` event is logged with their actual travel time. Customer gets a push notification — "Your shucker has arrived." Background tracking can reduce frequency since they're now on site.

---

## 12. Starting the Service

**What they see:** The job screen shows a "Start Service" button. They tap it when they begin shucking.

**What happens behind the scenes:** Job status moves to `in_progress`. `job_started` event is logged. Timer begins tracking service duration.

---

## 13. Completing the Job

**What they see:** When finished, they tap "Complete Job." A confirmation prompt asks them to verify — "Mark this job as complete?" They confirm.

**What they see next:** A completion summary screen showing:
- Job details
- Service duration
- Earnings for this job
- Customer's name

**What happens behind the scenes:** Job status moves to `completed`. `job_completed` event is logged with duration and final price. Payment is captured from the customer's card. Provider's `totalJobsCompleted` increments. `availabilityStatus` changes back to `"online"` (or `"offline"` if they choose).

---

## 14. After the Job

**What they see:** They return to the dashboard. Their "Today's Jobs" count updates. The completed job appears in their Jobs tab with full details. Once the customer leaves a rating, it shows in their profile.

**What they do:** They can stay online for more requests or go offline.

---

## 15. Going Offline

**What they see:** They tap the toggle. It switches back — "Offline — Tap to go online."

**What happens behind the scenes:** `availabilityStatus` changes to `"offline"`. Presence data stops updating. `provider_went_offline` event is logged with their total online session time. They will not receive any new requests.

---

## Returning Provider Flow

When a returning provider opens the app:

1. **Auto sign-in** — Session is persisted, no login needed.
2. **Active job?** — If they have a job in progress (`accepted`, `provider_en_route`, `provider_arrived`, `in_progress`), they go directly to the active job screen.
3. **No active job** — They see the dashboard in whatever availability state they left (online or offline).

---

## Key Alternate Paths

| Scenario | What happens |
|---|---|
| Provider cancels after accepting | Job moves to `cancelled_by_provider`. They must select a cancellation reason. Customer is notified. System tries to find a replacement provider. Cancellation is logged and affects their reliability score. |
| Provider cancels while en route | Same as above but flagged as higher severity since the customer was expecting arrival. |
| Provider loses internet during tracking | App uses cached location data. When reconnected, location updates resume. If disconnected too long, admin may be alerted. |
| Provider's app is killed by the OS | Background location stops. When they reopen the app, they're returned to their active job screen and tracking resumes. |
| Provider denied location permissions | They see a screen explaining why location is required. They cannot go online without location permission. Guided to device settings. |
| Provider gets no requests all session | Normal — they just stay on the dashboard. No penalty. They can go offline whenever they want. |
| Provider account gets suspended | On next app open, they see "Your account is temporarily suspended — contact support." No access to dashboard or requests. |
