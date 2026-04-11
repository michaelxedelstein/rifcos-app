# RIFCOS — Firestore Collection Map

## Overview

All core data lives in Cloud Firestore. Each collection below includes its purpose, fields, and relationships. Field types follow Firestore conventions: `string`, `number`, `boolean`, `timestamp`, `geopoint`, `map`, `array`, `reference`.

---

## `users`

Customers who request services.

| Field | Type | Description |
|---|---|---|
| `id` | string | Document ID (matches Firebase Auth UID) |
| `email` | string | Account email |
| `displayName` | string | Full name |
| `phone` | string | Phone number (optional) |
| `photoUrl` | string | Profile photo URL (optional) |
| `role` | string | Always `"customer"` for this collection |
| `defaultLocation` | geopoint | Saved home/default location |
| `defaultAddress` | string | Human-readable address |
| `pushToken` | string | FCM push notification token |
| `createdAt` | timestamp | Account creation time |
| `updatedAt` | timestamp | Last profile update |
| `onboardingComplete` | boolean | Whether onboarding flow is finished |
| `totalBookings` | number | Running count of completed bookings |
| `stripeCustomerId` | string | Stripe customer ID (set after first payment) |

---

## `providers`

Oyster shuckers who fulfill requests.

| Field | Type | Description |
|---|---|---|
| `id` | string | Document ID (matches Firebase Auth UID) |
| `email` | string | Account email |
| `displayName` | string | Full name |
| `phone` | string | Phone number |
| `photoUrl` | string | Profile photo URL (optional) |
| `role` | string | Always `"provider"` for this collection |
| `accountStatus` | string | `registered`, `pending_approval`, `approved`, `rejected`, `suspended`, `deactivated` |
| `availabilityStatus` | string | `offline`, `online`, `busy` |
| `serviceArea` | string | General area they serve (city/region) |
| `serviceRadius` | number | Max travel distance in miles |
| `currentLocation` | geopoint | Last known location (updated when online) |
| `credentials` | map | Verification fields — `{ foodHandler: boolean, experience: string, notes: string }` |
| `pushToken` | string | FCM push notification token |
| `rating` | number | Average rating (0–5 scale) |
| `totalRatings` | number | Count of ratings received |
| `totalJobsCompleted` | number | Running count |
| `acceptanceRate` | number | Percentage of accepted requests (0–100) |
| `completionRate` | number | Percentage of jobs completed without cancelling (0–100) |
| `avgResponseTime` | number | Average seconds to accept/decline a request |
| `createdAt` | timestamp | Account creation time |
| `updatedAt` | timestamp | Last profile update |
| `approvedAt` | timestamp | When admin approved (null if not yet) |
| `onboardingComplete` | boolean | Whether onboarding flow is finished |

---

## `requests`

Every booking request from a customer.

| Field | Type | Description |
|---|---|---|
| `id` | string | Document ID (auto-generated) |
| `customerId` | string | Reference to `users` doc |
| `providerId` | string | Reference to `providers` doc (null until matched) |
| `status` | string | Current lifecycle state (see `request-lifecycle.md`) |
| `serviceType` | string | Always `"oyster-shucker"` for MVP |
| `eventDate` | timestamp | Date and time of the event |
| `location` | geopoint | Event location coordinates |
| `address` | string | Human-readable event address |
| `eventDetails` | map | `{ guestCount: number, eventType: string, notes: string }` |
| `quotedPrice` | number | Price shown to customer (cents) |
| `finalPrice` | number | Actual charged amount (cents) |
| `pricingRecordId` | string | Reference to the `pricingRecords` doc for this quote |
| `paymentStatus` | string | `pending`, `authorized`, `captured`, `refunded`, `partially_refunded`, `failed` |
| `stripePaymentIntentId` | string | Stripe payment intent reference |
| `cancellationReason` | string | Reason code if cancelled (null otherwise) |
| `cancellationNotes` | string | Free text if cancelled (null otherwise) |
| `cancelledBy` | string | `customer`, `provider`, or `system` (null if not cancelled) |
| `matchAttempts` | number | How many providers were tried before a match |
| `createdAt` | timestamp | When the request was created |
| `updatedAt` | timestamp | Last status change |
| `confirmedAt` | timestamp | When customer confirmed the quote |
| `matchedAt` | timestamp | When a provider was matched |
| `acceptedAt` | timestamp | When the provider accepted |
| `completedAt` | timestamp | When the job was completed |
| `cancelledAt` | timestamp | When the request was cancelled (null if not) |

---

## `jobs`

Active job records created once a provider accepts. Tracks the operational side of fulfillment.

| Field | Type | Description |
|---|---|---|
| `id` | string | Document ID (auto-generated) |
| `requestId` | string | Reference to the parent `requests` doc |
| `customerId` | string | Reference to `users` doc |
| `providerId` | string | Reference to `providers` doc |
| `status` | string | `accepted`, `provider_en_route`, `provider_arrived`, `in_progress`, `completed`, `cancelled` |
| `providerLocation` | geopoint | Live provider location (updated during tracking) |
| `distanceToCustomer` | number | Calculated distance in miles at time of acceptance |
| `estimatedArrival` | timestamp | ETA based on distance/route |
| `startedAt` | timestamp | When provider started the service |
| `arrivedAt` | timestamp | When provider arrived at location |
| `completedAt` | timestamp | When job was marked complete |
| `cancelledAt` | timestamp | When job was cancelled (null if not) |
| `durationMinutes` | number | Total service time from start to complete |
| `createdAt` | timestamp | When the job record was created |
| `updatedAt` | timestamp | Last status change |

---

## `pricingRecords`

Every quote decision stored with full input breakdown. This is the data that trains the pricing engine over time.

| Field | Type | Description |
|---|---|---|
| `id` | string | Document ID (auto-generated) |
| `requestId` | string | Reference to the parent `requests` doc |
| `baseFee` | number | Base service fee (cents) |
| `distanceComponent` | number | Distance-based adjustment (cents) |
| `timeComponent` | number | Time-based adjustment (cents) |
| `demandMultiplier` | number | Demand pressure multiplier (e.g. 1.0, 1.2) |
| `supplyMultiplier` | number | Supply pressure multiplier (e.g. 1.0, 1.3) |
| `surgeMultiplier` | number | Combined surge multiplier applied |
| `surgeBand` | string | `normal`, `busy`, `high_demand`, `hot_zone`, `extreme` |
| `finalQuote` | number | Total quoted price shown to customer (cents) |
| `finalPaid` | number | Actual amount charged (cents, set after completion) |
| `outcome` | string | `accepted`, `abandoned`, `expired` |
| `providerDistance` | number | Distance from provider to customer in miles |
| `activeRequestsInZone` | number | Demand snapshot at time of quote |
| `activeProvidersInZone` | number | Supply snapshot at time of quote |
| `dayOfWeek` | string | Day of week when quote was generated |
| `timeOfDay` | string | Time bucket: `morning`, `afternoon`, `evening`, `night` |
| `leadTimeHours` | number | Hours between quote and event time |
| `createdAt` | timestamp | When the quote was generated |

---

## `events`

Structured event log for every major action in the system. This is the analytics and intelligence backbone.

| Field | Type | Description |
|---|---|---|
| `id` | string | Document ID (auto-generated) |
| `eventName` | string | Structured event name (see `event-taxonomy.md`) |
| `actorId` | string | User or provider who triggered the event |
| `actorRole` | string | `customer`, `provider`, or `system` |
| `requestId` | string | Related request (null if not request-specific) |
| `jobId` | string | Related job (null if not job-specific) |
| `metadata` | map | Event-specific payload data (varies by event) |
| `createdAt` | timestamp | When the event occurred |

---

## `ratings`

Post-completion reviews from customers about providers.

| Field | Type | Description |
|---|---|---|
| `id` | string | Document ID (auto-generated) |
| `requestId` | string | Reference to the completed `requests` doc |
| `jobId` | string | Reference to the completed `jobs` doc |
| `customerId` | string | Who left the review |
| `providerId` | string | Who was reviewed |
| `score` | number | Rating 1–5 |
| `reviewText` | string | Optional written review |
| `createdAt` | timestamp | When the review was submitted |

---

## `adminConfig`

System-wide configuration values controlled from the ops dashboard.

| Field | Type | Description |
|---|---|---|
| `pricing` | map | `{ baseFee, distanceRate, timeRates, surgeBands, caps }` |
| `zones` | map | Zone definitions and thresholds |
| `matching` | map | `{ timeoutSeconds, maxAttempts, radiusMiles }` |
| `notifications` | map | Notification templates and toggle settings |
| `updatedAt` | timestamp | Last config change |
| `updatedBy` | string | Admin who made the change |

This is a single document (or small collection of config documents) — not a collection of many records.

---

## `zoneSummaries`

Periodic snapshots of demand and supply by geographic zone. Written by scheduled Cloud Functions.

| Field | Type | Description |
|---|---|---|
| `id` | string | Document ID (zone identifier + timestamp) |
| `zoneId` | string | Zone identifier |
| `activeRequests` | number | Requests in this zone at snapshot time |
| `activeProviders` | number | Online providers in this zone at snapshot time |
| `requestToProviderRatio` | number | Demand-to-supply ratio |
| `avgQuotedPrice` | number | Average quote in this zone (cents) |
| `surgeBand` | string | Current surge level for this zone |
| `snapshotAt` | timestamp | When this snapshot was taken |

---

## Firebase Realtime Database

Used only for lightweight live state that needs instant sync (not stored in Firestore).

### `/presence/{providerId}`

| Field | Type | Description |
|---|---|---|
| `online` | boolean | Whether the provider app is connected |
| `lastSeen` | number | Unix timestamp of last heartbeat |
| `location` | object | `{ lat: number, lng: number }` — latest coordinates |

This is used for the provider online/offline heartbeat. Firestore triggers update the `providers` collection `availabilityStatus` based on presence changes.
