# RIFCOS — Request Lifecycle States

## Overview

Every booking request moves through a defined sequence of states. No request should ever be in an undefined state. These states drive the UI, backend logic, notifications, event logging, and admin monitoring.

---

## Request States

| State | Description | Who triggers it |
|---|---|---|
| `draft` | Customer has started the request form but not submitted | Customer |
| `quoted` | System has generated a price quote, waiting for customer to accept or abandon | System |
| `abandoned` | Customer saw the quote but did not confirm — request is dead | Customer (inaction) |
| `confirmed` | Customer accepted the quote and payment was authorized — looking for a provider | Customer |
| `matching` | System is actively searching for an available provider | System |
| `matched` | A provider has been identified and notified — waiting for their response | System |
| `accepted` | Provider accepted the job — they are now assigned | Provider |
| `provider_en_route` | Provider is on their way to the customer location | Provider |
| `provider_arrived` | Provider has arrived at the location | Provider |
| `in_progress` | The oyster shucking service is actively happening | Provider |
| `completed` | Job is finished, payment captured, ready for review | Provider |
| `cancelled_by_customer` | Customer cancelled the request | Customer |
| `cancelled_by_provider` | Provider cancelled after accepting | Provider |
| `cancelled_by_system` | System cancelled (no provider found, timeout, etc.) | System |
| `expired` | Request timed out before a provider could be matched | System |

---

## Allowed State Transitions

```
draft → quoted
quoted → confirmed
quoted → abandoned
confirmed → matching
matching → matched
matching → cancelled_by_system (no providers available)
matching → expired (timeout)
matched → accepted
matched → cancelled_by_system (provider didn't respond in time)
accepted → provider_en_route
accepted → cancelled_by_provider
accepted → cancelled_by_customer
provider_en_route → provider_arrived
provider_en_route → cancelled_by_provider
provider_en_route → cancelled_by_customer
provider_arrived → in_progress
provider_arrived → cancelled_by_provider
provider_arrived → cancelled_by_customer
in_progress → completed
in_progress → cancelled_by_provider (emergency only)
```

### States that are terminal (no further transitions)

- `abandoned`
- `completed`
- `cancelled_by_customer`
- `cancelled_by_provider`
- `cancelled_by_system`
- `expired`

---

## What the Customer Sees at Each State

| State | Customer-facing label | Screen |
|---|---|---|
| `draft` | (in request form) | Request form |
| `quoted` | "Your quote is ready" | Quote screen |
| `abandoned` | (no screen — exited flow) | — |
| `confirmed` | "Finding your shucker..." | Status screen with spinner |
| `matching` | "Finding your shucker..." | Status screen with spinner |
| `matched` | "Shucker found — waiting for confirmation" | Status screen |
| `accepted` | "Your shucker is confirmed!" | Status screen |
| `provider_en_route` | "Your shucker is on the way" | Tracking map |
| `provider_arrived` | "Your shucker has arrived" | Status screen |
| `in_progress` | "Service in progress" | Status screen |
| `completed` | "How was your experience?" | Rating screen |
| `cancelled_by_customer` | "Booking cancelled" | Confirmation screen |
| `cancelled_by_provider` | "Your shucker had to cancel" | Rebooking prompt |
| `cancelled_by_system` | "We couldn't find a shucker" | Retry prompt |
| `expired` | "Request expired" | Retry prompt |

---

## What the Provider Sees at Each State

| State | Provider-facing label | Screen |
|---|---|---|
| `matched` | "New request!" | Incoming request notification |
| `accepted` | "Job confirmed — navigate when ready" | Job detail screen |
| `provider_en_route` | "Navigating to customer" | Navigation map |
| `provider_arrived` | "You've arrived — start when ready" | Job detail screen |
| `in_progress` | "Job in progress" | Active job screen |
| `completed` | "Job complete" | Completion summary |
| `cancelled_by_provider` | "Job cancelled" | Cancellation confirmation |

---

## Events Logged at Each Transition

Every state change writes a structured event to the `events` collection. See `docs/phase-1/event-taxonomy.md` for full payload definitions.

| Transition | Event name |
|---|---|
| → `quoted` | `quote_generated` |
| → `confirmed` | `quote_accepted` |
| → `abandoned` | `quote_abandoned` |
| → `matching` | `matching_started` |
| → `matched` | `provider_matched` |
| → `accepted` | `provider_accepted` |
| → `provider_en_route` | `provider_en_route` |
| → `provider_arrived` | `provider_arrived` |
| → `in_progress` | `job_started` |
| → `completed` | `job_completed` |
| → `cancelled_by_customer` | `cancelled_by_customer` |
| → `cancelled_by_provider` | `cancelled_by_provider` |
| → `cancelled_by_system` | `cancelled_by_system` |
| → `expired` | `request_expired` |
