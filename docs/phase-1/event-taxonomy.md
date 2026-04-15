# RIFCOS — Event Logging Taxonomy

## Overview

Every major action in the system writes a structured event to the `events` collection in Firestore. These events power analytics, pricing calibration, provider scoring, and admin monitoring. No event should be invented on the fly — every event name is defined here.

---

## Event Structure

Every event has the same base fields:

```
{
  id: string              // auto-generated document ID
  eventName: string       // from the list below
  actorId: string         // user/provider/system who triggered it
  actorRole: string       // "customer", "provider", or "system"
  requestId: string       // related request (null if not applicable)
  jobId: string           // related job (null if not applicable)
  metadata: map           // event-specific data (defined per event below)
  createdAt: timestamp    // when the event occurred
}
```

---

## Account Events

| Event Name | Actor | Description | Metadata |
|---|---|---|---|
| `user_signed_up` | customer | Customer created an account | `{ method: "email" }` |
| `user_onboarding_complete` | customer | Customer finished onboarding | `{ location: geopoint }` |
| `provider_signed_up` | provider | Provider created an account | `{ method: "email" }` |
| `provider_submitted_profile` | provider | Provider completed profile and submitted for review | `{ serviceArea: string }` |
| `provider_approved` | system | Admin approved a provider | `{ approvedBy: string }` |
| `provider_rejected` | system | Admin rejected a provider | `{ rejectedBy: string, reason: string }` |
| `provider_suspended` | system | Admin suspended a provider | `{ suspendedBy: string, reason: string }` |
| `provider_deactivated` | system | Admin permanently deactivated a provider | `{ deactivatedBy: string }` |

---

## Provider Availability Events

| Event Name | Actor | Description | Metadata |
|---|---|---|---|
| `provider_went_online` | provider | Provider toggled to online | `{ location: geopoint }` |
| `provider_went_offline` | provider | Provider toggled to offline | `{ location: geopoint, sessionMinutes: number }` |
| `provider_became_busy` | system | Provider was assigned a job | `{ requestId: string }` |

---

## Request Lifecycle Events

| Event Name | Actor | Description | Metadata |
|---|---|---|---|
| `request_created` | customer | Customer started a request | `{ serviceType: string, location: geopoint, eventDate: timestamp }` |
| `quote_generated` | system | Pricing engine produced a quote | `{ quotedPrice: number, baseFee: number, surgeMultiplier: number, surgeBand: string, pricingRecordId: string }` |
| `quote_accepted` | customer | Customer accepted the quote and confirmed booking | `{ quotedPrice: number, stripePaymentIntentId: string }` |
| `quote_abandoned` | customer | Customer saw the quote but left without confirming | `{ quotedPrice: number, timeOnQuoteScreen: number }` |
| `matching_started` | system | System began searching for a provider | `{ availableProviders: number, zone: string }` |
| `provider_matched` | system | A provider was identified and notified | `{ providerId: string, providerDistance: number }` |
| `provider_accepted` | provider | Provider accepted the job | `{ responseTime: number }` |
| `provider_declined` | provider | Provider declined the job | `{ responseTime: number, reason: string }` |
| `match_timeout` | system | Provider didn't respond in time, trying next | `{ providerId: string, timeoutSeconds: number }` |

---

## Job Progress Events

| Event Name | Actor | Description | Metadata |
|---|---|---|---|
| `provider_en_route` | provider | Provider started traveling to customer | `{ estimatedMinutes: number, distance: number }` |
| `provider_arrived` | provider | Provider arrived at the location | `{ travelMinutes: number }` |
| `job_started` | provider | Oyster shucking service began | `{}` |
| `job_completed` | provider | Service finished | `{ durationMinutes: number, finalPrice: number }` |

---

## Cancellation Events

| Event Name | Actor | Description | Metadata |
|---|---|---|---|
| `cancelled_by_customer` | customer | Customer cancelled the booking | `{ reason: string, statusAtCancellation: string }` |
| `cancelled_by_provider` | provider | Provider cancelled after accepting | `{ reason: string, statusAtCancellation: string }` |
| `cancelled_by_system` | system | System cancelled (no match, timeout, payment failure) | `{ reason: string }` |
| `request_expired` | system | Request timed out with no match | `{ matchAttempts: number, waitTimeMinutes: number }` |

---

## Payment Events

| Event Name | Actor | Description | Metadata |
|---|---|---|---|
| `payment_authorized` | system | Card hold placed | `{ amount: number, stripePaymentIntentId: string }` |
| `payment_captured` | system | Payment charged | `{ amount: number, stripePaymentIntentId: string }` |
| `payment_failed` | system | Payment declined or failed | `{ reason: string, stripePaymentIntentId: string }` |
| `payment_refunded` | system | Refund issued | `{ amount: number, stripePaymentIntentId: string, refundReason: string }` |

---

## Review Events

| Event Name | Actor | Description | Metadata |
|---|---|---|---|
| `review_submitted` | customer | Customer left a rating/review | `{ score: number, hasText: boolean, providerId: string }` |

---

## Naming Rules

- All event names use `snake_case`
- Events describe what happened, not what should happen
- Every event includes `actorId` and `actorRole` so you always know who triggered it
- `metadata` only contains fields specific to that event — shared fields like `requestId` are top-level
- New events are added to this document before being implemented in code
