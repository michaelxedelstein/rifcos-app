# RIFCOS Development Guide

RIFCOS is an on-demand service marketplace (React Native mobile app + Next.js admin dashboard + Firebase Cloud Functions). MVP is limited to oyster shucker bookings.

## Project Structure

- `app/` — React Native (Expo SDK 54) mobile app
- `admin/` — Next.js 16 admin/ops dashboard
- `functions/` — Firebase Cloud Functions (Node.js 20, TypeScript)
- `docs/` — Phase documentation
- `resources/` — Roadmap and progress tracking

## Cursor Cloud specific instructions

### Running services

| Service | Directory | Command | Port |
|---------|-----------|---------|------|
| Mobile app (web) | `app/` | `npx expo start --web --port 8081` | 8081 |
| Admin dashboard | `admin/` | `npm run dev` | 3000 |

### Linting and type checking

| Package | Command |
|---------|---------|
| `admin/` | `npm run lint` (ESLint) |
| `functions/` | `npm run lint` (tsc --noEmit) |
| `app/` | `npx tsc --noEmit` |

### Building

- Functions: `npm run build` in `functions/` (compiles TypeScript to `functions/lib/`)

### Gotchas

- The root-level `package-lock.json` is empty and exists because of Firebase CLI initialization. Next.js may warn about multiple lockfiles — this is harmless.
- The `functions/` package requires Node 20 engine for deployment, but local dev/build works fine with Node 22.
- Firebase environment variables (API keys, project ID) are needed for the Expo app to connect to Firebase services. Without them, the app still renders the auth UI but won't complete login flows.
- Stripe credentials are pending and not yet configured. Payment flow screens will be non-functional until those are provided.
- The admin dashboard uses a middleware redirect to `/login` for unauthenticated users. It requires `FIREBASE_SERVICE_ACCOUNT_KEY` env var for backend Firebase Admin SDK access.
- For the Expo app, use `--web` flag to test in the cloud environment since there are no iOS/Android simulators available.
