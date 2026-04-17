# Phase 3, Step 1 — Environment Variables and Configuration

## What Was Done

Set up all the environment variable handling so the React Native app, Firebase, and Google Maps can talk to each other. This is the wiring that connects your local app to the live cloud services.

## How It Works

- The app uses a `.env` file at `app/.env` to store all your API keys and project IDs.
- Every variable is prefixed with `EXPO_PUBLIC_` so Expo can inject them at build time.
- A `.env.example` file exists as a template so any future developer knows which keys they need.
- The Firebase config file (`app/src/config/firebase.ts`) reads these variables and initializes all Firebase services — Auth, Firestore, Cloud Storage, and Realtime Database.
- Auth persistence uses AsyncStorage so users stay logged in between app restarts.

## Files Created or Modified

| File | Purpose |
|---|---|
| `app/.env.example` | Template showing all required environment variables |
| `app/.env` | Your actual keys (not committed to git) |
| `app/src/config/firebase.ts` | Initializes Firebase app, auth, Firestore, storage, and RTDB |

## What's Still Pending

- **Stripe:** Publishable key placeholder is in `.env.example`, but no Stripe credentials have been received yet. Once you get them, add `EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `.env`.

## Plain English

Think of this step like plugging in all the wires between your app and the cloud. Without this, the app wouldn't know which Firebase project to talk to or which Google Maps account to use.
