# Phase 3, Step 3 — Firebase SDK Integration

## What Was Done

Connected all the Firebase services the app needs and created service layers so the rest of the app doesn't have to deal with Firebase directly.

## Services Connected

| Service | Status | What It Does |
|---|---|---|
| **Firebase Auth** | Live and tested | Handles signup, login, logout, password reset. Sessions persist between app restarts using AsyncStorage. |
| **Firestore** | Live and tested | Main database. Stores user profiles, provider profiles, requests, jobs, pricing records, ratings, and events. |
| **Cloud Storage** | Initialized, service ready | Stores profile photos. Upload and download helpers are built. |
| **Realtime Database** | Initialized, service ready | Handles provider online/offline presence and live location updates during jobs. Uses `onDisconnect` so if a provider's app closes, they automatically go offline. |
| **Cloud Messaging** | Deferred to Phase 4/5 | Push notifications require a development build (not available in Expo Go). The groundwork is here, but actual FCM token registration happens when we build the onboarding screens. |
| **Analytics** | Custom event logger active | A `logEvent` function writes events to a Firestore `events` collection. Full Firebase Analytics SDK integration deferred until we move to a development build. |

## Service Files

| File | Purpose |
|---|---|
| `app/src/config/firebase.ts` | Initializes the Firebase app and exports `auth`, `db`, `storage`, `rtdb` |
| `app/src/services/auth.ts` | Signup, login, logout, password reset, profile fetch, auth state listener |
| `app/src/services/storage.ts` | Profile photo upload and download |
| `app/src/services/presence.ts` | Provider online/offline status and live location updates via Realtime Database |
| `app/src/services/logger.ts` | Custom event logger that writes to the Firestore `events` collection |
| `app/src/contexts/AuthContext.tsx` | React Context that provides auth state and user profile to the entire app |
| `app/src/hooks/useAuth.ts` | Hook to access auth state from any component |

## How Auth Flow Works

1. User signs up → Firebase Auth creates account → Firestore `users` document created → if provider, `providers` document also created
2. User logs in → Firebase Auth verifies credentials → AuthContext fetches their Firestore profile → RootNavigator routes them to the right area based on role and onboarding state
3. User closes and reopens app → Auth session is persisted via AsyncStorage → auto-login, no need to sign in again

## How Presence Works (for providers)

1. Provider taps "Go Online" → `goOnline()` writes `{online: true}` to Realtime Database
2. If their app crashes or loses connection → `onDisconnect` automatically writes `{online: false}`
3. Customer-facing screens can watch a provider's presence in real time with `watchPresence()`

## What's Deferred

- **Push notifications (Cloud Messaging):** Need a development build instead of Expo Go. We'll register FCM tokens during onboarding in Phase 4/5.
- **Firebase Analytics SDK:** The native Firebase Analytics requires a development build. For now, our custom `logEvent` function covers the same ground by writing to Firestore.

## Plain English

This step is like connecting all the plumbing. Auth handles who you are, Firestore stores everything about you and your bookings, Storage holds your profile photos, Realtime Database tracks whether providers are online and where they are, and the event logger captures everything important that happens so we can analyze it later.
