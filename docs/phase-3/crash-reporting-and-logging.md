# Phase 3 Step 9: Crash Reporting and Logging

## Overview

The app now captures errors at every level — from React render crashes down to uncaught JS exceptions and unhandled promise rejections. All errors are written to Firestore so they can be reviewed in the Firebase Console or the admin dashboard later.

## What's Set Up

### 1. Enhanced Logger (`app/src/services/logger.ts`)

The original event logger now also handles error reporting:

- **`logEvent(name, data)`** — writes to the `events` collection (same as before, but now includes platform and app version)
- **`logError(level, message, error, context)`** — writes to the `errorLogs` collection with severity level, stack trace, device info, and user ID
- **`logInfo(name, data)`** — alias for `logEvent`
- **`logWarn(message, context)`** — shortcut for warning-level errors

Every log entry includes:
- Platform (iOS/Android)
- OS version
- App version
- User ID (if logged in)
- Server timestamp

### 2. Global Crash Catcher (`app/src/services/crashReporter.ts`)

Called once at app startup via `initCrashReporting()`. It hooks into:

- **`ErrorUtils.setGlobalHandler`** — catches uncaught JS errors that would normally crash the app. Logs them as `fatal` or `error` depending on severity, then passes them to the original handler.
- **`global.onunhandledrejection`** — catches unhandled promise rejections (e.g., a `.then()` without a `.catch()`). Logs them as `error`.

### 3. React Error Boundary (`app/src/components/ErrorBoundary.tsx`)

Wraps the entire app in `App.tsx`. If any React component throws during rendering:

- The error is logged as `fatal` with the component stack trace
- The user sees a friendly "Something went wrong" screen with a retry button
- Tapping retry re-renders the app from the boundary

### 4. Log Cleanup Function (`functions/src/maintenance.ts`)

A scheduled Cloud Function (`cleanupOldLogs`) runs daily at 3 AM ET and deletes error logs and event logs older than 30 days. This keeps Firestore costs under control.

### 5. Firestore Rules

The `errorLogs` collection allows authenticated users to create documents (write-only, no client reads). Logs are only readable through the Firebase Console or admin APIs.

## Files

| File | Purpose |
|------|---------|
| `app/src/services/logger.ts` | Event and error logging to Firestore |
| `app/src/services/crashReporter.ts` | Global error and promise rejection handlers |
| `app/src/components/ErrorBoundary.tsx` | React error boundary with retry |
| `app/App.tsx` | Wires up crash reporting and error boundary |
| `functions/src/maintenance.ts` | Scheduled cleanup of old logs |
| `firestore.rules` | Added `errorLogs` collection rules |

## Firestore Collections

| Collection | Written By | Purpose |
|------------|-----------|---------|
| `events` | Client logger | User actions and analytics events |
| `errorLogs` | Client logger / crash reporter | Errors, warnings, and crash reports |

## What's Deferred

- **Firebase Crashlytics:** Requires a development build (native code). Will be added when we move to EAS Build for TestFlight/beta testing. Crashlytics captures native crashes, ANRs, and non-fatal errors at the native layer.
- **Sentry:** An alternative to Crashlytics with richer JS-level error grouping and source maps. Can be added alongside or instead of Crashlytics.
- **Admin dashboard error viewer:** Currently errors are visible in the Firebase Console. A dedicated error viewer in the ops dashboard comes in Phase 8.
