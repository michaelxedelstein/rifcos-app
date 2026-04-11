# RIFCO MVP — Locked Product Scope

## Launch Category

**Oyster Shucker only.**

No other service categories exist in the MVP. No bartenders, chefs, hibachi chefs, musicians, magicians, or any other provider type. The entire product — every screen, every backend collection, every pricing calculation, every notification — is built for one use case: a customer requests an oyster shucker for their party or event.

This is not a limitation. It is how the pricing engine, dispatch logic, tracking system, and data collection pipeline get trained correctly before the platform opens to additional categories.

## Expansion Rule

Do not expand categories until:
- The oyster shucker fulfillment flow is stable in production
- Pricing logic is producing reliable, explainable quotes
- Provider operations are under control
- Zone data is trustworthy
- Admin tools are usable for day-to-day ops
- Customer behavior patterns are understood from real data

---

## In Scope — Customer App

| Feature | Description |
|---|---|
| Sign up and login | Email and password auth, password reset, session persistence |
| Profile creation | Name, contact details, profile editing |
| Location input | Location permission request, address capture, map-based location selection |
| Request flow | Request an oyster shucker: date, time, location, event details, special notes |
| Quote and pricing display | Show calculated price with base fee breakdown, surge messaging if active |
| Booking confirmation | Confirm and pay, create request record |
| Live status updates | Real-time status timeline from request through completion |
| Tracking | Map-based provider tracking with live location updates |
| Payment | Stripe payment at booking |
| Booking history | Past bookings list with detail view |
| Ratings and reviews | Post-completion rating and optional review |

## In Scope — Provider App

| Feature | Description |
|---|---|
| Provider sign up | Separate sign up flow with role selection |
| Profile and credentials | Name, contact, service area, credential/verification fields |
| Approval flow | Pending approval state until admin approves |
| Online / offline toggle | Control availability status |
| Request notification | Receive incoming request with job details |
| Accept / decline | Accept or decline incoming requests with timeout behavior |
| Navigation to job | Map-based directions to customer location |
| Job status progression | En route → arrived → started → completed states |
| Cancellation flow | Cancel with reason |
| Post-completion summary | Job summary after completion |
| Ratings visibility | See own rating score |
| Payout readiness | Placeholder for future Stripe Connect payouts (not functional in MVP) |

## In Scope — Backend and Logic

| Feature | Description |
|---|---|
| Firebase Auth | Email/password authentication with role-based access |
| Firestore schema | Collections for users, providers, requests, jobs, pricing records, events, ratings, admin config, zone summaries |
| Cloud Functions | Quote generation, surge calculation, provider matching, status listeners, notification triggers, scheduled jobs |
| Pricing Engine v1 | Rules-based formula: base fee + distance + time premium + demand multiplier + supply pressure |
| Surge Engine v1 | Zone-based dynamic pricing with defined bands (1.0x normal through capped max) |
| Event logging | Structured event for every major lifecycle action |
| Push notifications | Customer and provider notifications for booking updates, arrival, cancellation |
| Scheduled jobs | Zone snapshots, metrics rollups, recalculation routines |

## In Scope — Realtime Tracking

| Feature | Description |
|---|---|
| Provider live location | Background location updates via native modules (Swift/Kotlin) |
| Customer tracking map | Map with provider marker, route, and ETA |
| Provider presence | Online/offline heartbeat via Firebase Realtime Database |
| Permission handling | Location permission flows with fallback for denied states |

## In Scope — Ops Dashboard (Next.js on Vercel)

| Feature | Description |
|---|---|
| Auth-protected access | Password gate (upgraded to Firebase Auth role check later) |
| Provider approval | Approve or reject new provider sign ups |
| Live requests monitor | Table of all active/pending/matched requests |
| Live jobs monitor | Table of all in-progress jobs with status |
| Pricing controls | View and adjust base fees, surge bands, multipliers |
| Zone monitor | Demand and supply visibility by geographic area |
| Cancellation review | Review cancelled bookings, flag issues |
| Analytics overview | Conversion, completion, revenue, and usage metrics |
| Support tools | User/provider lookup, booking detail viewer, support notes |

---

## Explicitly Out of Scope for MVP

| Item | Reason |
|---|---|
| Any category beyond oyster shucking | Launch wedge must be proven first |
| AI/ML predictive models | Algorithm starts as rules-based, not black box |
| Provider payouts (Stripe Connect) | Placeholder only — manual payouts initially |
| Tipping | Deferred to post-launch |
| Multi-city launch | One city only for controlled rollout |
| Deep linking | Placeholder strategy only |
| Full marketing website | Basic landing page at most |
| Route complexity / traffic weighting | Distance pricing starts simple |
| Holiday premium pricing | Added post-launch based on data |
| In-app messaging / chat | Not needed for MVP |
| Referral system | Post-launch feature |
| Multi-language support | English only |
| Scheduled recurring bookings | One-time bookings only |
| Provider self-service payout dashboard | Manual process initially |
| Category expansion framework | Built only after oyster shucker model is validated |

---

## Scope Freeze Rule

This scope is frozen for the MVP build. New features are not added mid-phase unless they are critical to the core booking flow. If something feels important but isn't listed above, it goes on a post-launch backlog — not into the current build.

## Source Documents

- `resources/RIFCO_MVP_Product_and_Technical_Blueprint_Packet.md`
- `resources/RIFCO_MVP_Execution_Roadmap_and_Development_Packet.pdf`
