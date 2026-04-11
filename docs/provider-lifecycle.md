# RIFCOS — Provider Lifecycle States

## Overview

Every provider account moves through a defined set of states from signup through active service. These states control what the provider can see and do in the app, and what shows up in the admin dashboard.

---

## Provider Account States

| State | Description | Who triggers it |
|---|---|---|
| `registered` | Provider has signed up but profile is incomplete | Provider |
| `pending_approval` | Provider submitted their profile — waiting for admin review | Provider |
| `approved` | Admin has approved the provider — they can now go online | Admin |
| `rejected` | Admin has rejected the provider application | Admin |
| `suspended` | Admin has temporarily suspended an approved provider | Admin |
| `deactivated` | Provider account has been permanently disabled | Admin |

---

## Allowed Account State Transitions

```
registered → pending_approval (profile completed)
pending_approval → approved (admin approves)
pending_approval → rejected (admin rejects)
rejected → pending_approval (provider resubmits)
approved → suspended (admin suspends)
suspended → approved (admin reinstates)
approved → deactivated (admin permanently disables)
suspended → deactivated (admin permanently disables)
```

### Terminal states

- `deactivated` (no return)

---

## Provider Availability States

These are separate from the account state. Only providers in the `approved` account state can toggle availability.

| State | Description | Who triggers it |
|---|---|---|
| `offline` | Provider is not accepting requests | Provider / System |
| `online` | Provider is available and accepting requests | Provider |
| `busy` | Provider is currently assigned to an active job | System |

### Allowed Availability Transitions

```
offline → online (provider taps "go online")
online → offline (provider taps "go offline")
online → busy (provider accepts a job)
busy → online (job completes and provider stays online)
busy → offline (job completes and provider goes offline)
```

---

## What the Provider Sees at Each Account State

| State | Experience |
|---|---|
| `registered` | Sees onboarding screens, prompted to complete profile |
| `pending_approval` | Sees "Your application is under review" message, cannot go online |
| `approved` | Full access — can go online, receive requests, complete jobs |
| `rejected` | Sees "Your application was not approved" with option to update and resubmit |
| `suspended` | Sees "Your account is temporarily suspended — contact support" |
| `deactivated` | Sees "Your account has been deactivated" — no access |

---

## What the Admin Sees

| State | Admin dashboard |
|---|---|
| `pending_approval` | Appears in the provider approval queue |
| `approved` | Appears in the active providers list with availability status |
| `rejected` | Appears in rejected list (can be reconsidered) |
| `suspended` | Flagged in provider list with suspension badge |
| `deactivated` | Archived — removed from active lists |

---

## Events Logged for Provider State Changes

| Transition | Event name |
|---|---|
| → `pending_approval` | `provider_submitted_profile` |
| → `approved` | `provider_approved` |
| → `rejected` | `provider_rejected` |
| → `suspended` | `provider_suspended` |
| → `deactivated` | `provider_deactivated` |
| → `online` | `provider_went_online` |
| → `offline` | `provider_went_offline` |
| → `busy` | `provider_became_busy` |

---

# Cancellation States

## Who Can Cancel

| Actor | When they can cancel | State created |
|---|---|---|
| Customer | After confirming, before job is completed | `cancelled_by_customer` |
| Provider | After accepting, before job is completed | `cancelled_by_provider` |
| System | When no provider is found or match times out | `cancelled_by_system` |

## Cancellation Reasons (tracked in the cancellation record)

### Customer cancellation reasons
- `changed_plans` — event plans changed
- `found_alternative` — found another provider
- `price_concern` — price was too high after confirming
- `timing_issue` — timing no longer works
- `other` — free text

### Provider cancellation reasons
- `emergency` — personal emergency
- `vehicle_issue` — transportation problem
- `schedule_conflict` — double-booked or conflict
- `cannot_reach_location` — unable to get to the location
- `other` — free text

### System cancellation reasons
- `no_provider_available` — no providers online or in range
- `match_timeout` — no provider accepted in time
- `payment_failed` — payment authorization failed

## Cancellation Rules (MVP)

- Customer can cancel for free if the provider hasn't started traveling yet (`confirmed`, `matching`, `matched`, `accepted`)
- Customer cancellation after `provider_en_route` may be flagged for review (cancellation fee logic is post-launch)
- Provider cancellation after accepting is always logged and affects their reliability score
- All cancellations are visible in the admin cancellation review panel

---

# Payment States

## Payment Lifecycle

| State | Description | When |
|---|---|---|
| `pending` | Payment intent created but not yet authorized | Quote shown to customer |
| `authorized` | Payment authorized (hold placed on customer's card) | Customer confirms booking |
| `captured` | Payment captured (charged to customer) | Job completed |
| `refunded` | Full refund issued | Cancellation or dispute |
| `partially_refunded` | Partial refund issued | Specific dispute resolution |
| `failed` | Payment authorization or capture failed | Card declined, insufficient funds |

## Allowed Payment Transitions

```
pending → authorized (customer confirms quote)
pending → failed (card declined)
authorized → captured (job completed)
authorized → refunded (cancelled before completion)
authorized → failed (hold expired or card issue)
captured → refunded (post-completion dispute)
captured → partially_refunded (partial dispute resolution)
```

## Payment Timing

- **At quote acceptance:** Payment intent created, card authorized (hold placed)
- **At job completion:** Payment captured (actual charge)
- **On cancellation before completion:** Authorization released (no charge)
- **On dispute after completion:** Refund processed manually through admin

## What Gets Stored

Every payment action creates a `paymentRecord` with:
- `requestId` — linked booking request
- `customerId` — who is paying
- `providerId` — who performed the service
- `amount` — charge amount in cents
- `stripePaymentIntentId` — Stripe reference
- `status` — current payment state
- `createdAt` — when the payment was initiated
- `updatedAt` — last status change
- `capturedAt` — when payment was captured (if applicable)
- `refundedAt` — when refund was issued (if applicable)
