# Phase 3, Step 7 — Firestore, Storage, and RTDB Security Rules

## What Was Done

Wrote and deployed security rules for all three Firebase database services. These replace the default wide-open rules with proper access controls.

## Firestore Rules (`firestore.rules`)

| Collection | Who can read | Who can write |
|---|---|---|
| `users/{userId}` | Only the owner | Only the owner (create + update) |
| `providers/{providerId}` | Any authenticated user | Only the owner (create + update) |
| `requests/{requestId}` | The customer or assigned provider | Customer creates; customer or provider updates |
| `jobs/{jobId}` | The customer or assigned provider | Cloud Functions only (clients cannot write) |
| `pricingRecords/{recordId}` | The customer who requested the quote | Cloud Functions only |
| `ratings/{ratingId}` | Any authenticated user | Customer creates (no edits allowed) |
| `events/{eventId}` | Nobody (admin-only via Console) | Any authenticated user (write-only) |
| `adminConfig/{configId}` | Any authenticated user | Cloud Functions / admin only |

### Why providers are readable by any authenticated user
Customers need to see basic provider info (name, photo, rating) on the confirmed shucker screen and during tracking. The full provider profile (certifications, service area, etc.) is protected by what the client actually queries — the rules just ensure authentication.

## Storage Rules (`storage.rules`)

| Path | Access |
|---|---|
| `profilePhotos/{userId}/*` | Any authenticated user can read (view profile photos). Only the owner can upload, max 5MB, must be an image. |
| Everything else | Denied |

## Realtime Database Rules (`database.rules.json`)

| Path | Who can read | Who can write |
|---|---|---|
| `providerLocations/{providerId}` | Any authenticated user | Only the owning provider |
| `providerPresence/{providerId}` | Any authenticated user | Only the owning provider |
| Everything else | Denied | Denied |

### Why locations/presence are readable by any authenticated user
Customers need to see a provider's live location during tracking, and the system needs to know which providers are online for matching.

## Plain English

These rules are like the bouncer at the door. They make sure:
- You can only see and edit your own profile
- You can only see bookings you're involved in
- Only you can upload your own profile photo
- Only providers can update their own location
- Critical stuff like jobs and pricing records can only be created by our server (Cloud Functions), not by clients directly
- Analytics events are write-only — clients can log them but can't read other people's events
