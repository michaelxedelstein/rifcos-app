# RIFCOS MVP Phase Progress Tracker

> **This file is the single source of truth for what has been completed.**
> Agents: update this file as phases and tasks are finished. Check boxes with [x] when done.
> Phases follow the RIFCOS MVP Execution Roadmap (PDF). There are 10 phases with gates A through J.
> Each completed task includes a short note explaining what was done in plain English.

---

## Phase 1: Core Setup and Planning
**Objective:** Create the technical foundation, project structure, and product rules before a single major screen is built.

- [x] Create the Firebase project, enable billing, and confirm the correct account ownership model
  > Firebase project `rifcos-app` created. Billing enabled on Google Cloud. Owner is the primary Google account.
- [x] Enable Firebase Auth, Firestore, Cloud Storage, Cloud Functions, Cloud Messaging, and Analytics
  > All six Firebase services are live. Realtime Database was also enabled (see next item).
- [x] Decide whether to also enable Realtime Database for provider presence and connection status
  > Yes — Realtime Database is used for provider live location and online/offline presence since it handles frequent writes better than Firestore.
- [x] Create the Google Cloud project and connect the Google Maps Platform APIs you need
  > Google Cloud project connected to Firebase. Maps API key created and stored in the app's `.env` file.
- [x] Enable Maps SDK, Places, Geocoding, Directions, and any related quota alerts
  > All required Google Maps APIs enabled in the Google Cloud Console.
- [ ] Create the Stripe account, connect business settings, and outline payment flow assumptions
  > **BLOCKED — still waiting on Stripe login credentials.** Placeholder env var exists in `.env.example`.
- [x] Create the React Native app shell and set up iOS and Android builds locally
  > Expo SDK 54 app created at `app/`. React Navigation installed with bottom tabs and native stacks. Builds and runs on iOS Simulator and Android Emulator.
- [x] Create the Vercel project and the Next.js internal ops dashboard shell
  > Next.js admin dashboard created at `admin/`. Deployed to Vercel with password-based login. Sidebar navigation with placeholder pages for all ops features.
- [x] Write the locked MVP scope so the build remains oyster shucker only
  > Documented in `docs/phase-1/product-scope.md`. MVP is strictly oyster shucker — no other categories until post-launch.
- [x] Write the request lifecycle states, provider states, cancellation states, and payment states
  > Documented in `docs/phase-1/request-lifecycle.md` and `docs/phase-1/provider-lifecycle.md`. Every state and transition is defined.
- [x] Write the first Firestore collection map and event logging taxonomy
  > Documented in `docs/phase-1/firestore-schema.md` and `docs/phase-1/event-taxonomy.md`. All collections, fields, and event names are defined.
- [x] Write the algorithm input list for pricing, demand, distance, and supply logic
  > Documented in `docs/phase-1/pricing-engine-v1.md`. Covers base fee, distance, time, demand multiplier, supply factor, and surge thresholds.

**Gate A:** [ ] All accounts live, billing active, quotas visible, repositories initialized, and the first product and data definitions written down.
> Gate is open except for Stripe (pending credentials).

---

## Phase 2: Product Flow and Screen Mapping
**Objective:** Design the product flow from start to finish so development follows one clear path instead of random feature building.

- [x] Write the complete customer journey from app open through request completion
  > Documented in `docs/phase-2/customer-journey.md`. Covers 14 steps from app open through rating, plus alternate paths for cancellations and failures.
- [x] Write the complete provider journey from signup through job completion
  > Documented in `docs/phase-2/provider-journey.md`. Covers 15 steps from signup through going offline, plus alternate paths.
- [x] List every screen needed for MVP in the customer app
  > Customer app has ~25 screens: 4 auth, 3 onboarding, 10 request/booking flow, 4 bookings, 4 profile/settings.
- [x] List every screen needed for MVP in the provider app
  > Provider app has ~25 screens: 4 auth (shared), 5 onboarding, 7 dashboard/job flow, 2 jobs list, 5 profile/settings.
- [x] Define onboarding questions, profile fields, and permissions flow
  > Customer onboarding: location permission, default location, done. Provider onboarding: profile basics, service info, credentials, location, submit for approval.
- [x] Define the request form fields, pricing view, confirmation screen, tracking screen, and completion flow
  > Full request flow documented: event details (guest count, event type, notes), date/time picker, location with map, pricing quote breakdown, finding/matching, live tracking, completion, and rating.
- [x] Define provider profile, availability screen, incoming request screen, navigation state, and earnings history screen
  > Full provider flow documented: online/offline toggle, incoming request with accept/decline + countdown timer, job detail, navigation, arrival, service, completion summary, and earnings.
- [x] Define all status badges, labels, and user facing language for live jobs
  > All user-facing copy defined: status badges (Searching, Confirmed, En Route, Arrived, etc.), push notification text, toast messages, history labels, pricing labels, cancellation messages, and empty states.
- [x] Create a screen order map so you always know what to build next
  > Build order defined: auth screens first, then customer onboarding, then request flow, then provider onboarding, then provider job flow, then tracking/maps, then polish.

**Gate B:** [x] You should know every screen, every major state, and the exact order in which the product is built.
> Gate passed. All flows, screens, and build order are documented. Phase 2 docs live in `docs/phase-2/`.

---

## Phase 3: Project Foundation Build
**Objective:** Turn the plan into a stable codebase with working navigation, environments, authentication, and baseline services.

- [x] Set up environment variable handling for Firebase, Stripe, and Google Maps
  > Created `.env.example` template and `.env` with real Firebase + Google Maps keys. All vars use `EXPO_PUBLIC_` prefix for Expo. Firebase config file reads these and initializes all services. Stripe placeholder exists — credentials still pending. See `docs/phase-3/environment-and-config.md`.
- [x] Configure React Native navigation structure for customer and provider areas
  > Built complete navigation architecture with nested stacks inside tabs, conditional routing based on auth/onboarding/approval state, and TypeScript type safety. 30+ placeholder screens created for every route. See `docs/phase-3/navigation-architecture.md`.
- [x] Connect Firebase SDKs and confirm auth, database, storage, messaging, and analytics integration
  > Auth (tested — signup/login works), Firestore (tested — user docs created), Storage (service built — photo upload/download), Realtime Database (service built — presence and location). Cloud Messaging and native Analytics deferred to development build phase. Custom event logger active. See `docs/phase-3/firebase-sdk-integration.md`.
- [x] Create the app theme, type scale, color tokens, spacing system, and shared UI components
  > Complete design system built: "Deep Navy · Pearl Gold · Ocean Blue." All colors, typography, spacing, and border radius tokens defined. All auth screens and profile screen themed. Custom bottom tab bar with gold active indicator. See `docs/phase-3/design-system.md`.
- [x] Build reusable inputs, buttons, cards, modals, loading states, and error states
  > 12 UI components built: Button (4 variants), Input (with labels, errors, password toggle), Card, Badge (dot + pill), Avatar (photo + initials + online indicator), LoadingScreen, ErrorScreen, Toast (3 types), Divider (plain + labeled), ProgressBar, TabBar, ScreenShell. See `docs/phase-3/design-system.md`.
- [x] Set up auth flows for email, phone, or social sign in based on final decision
  > **Decision: Email/password only for MVP.** Phone and social sign-in deferred to post-launch. Signup, login, password reset, session persistence, sign out, and role-based routing are all live and tested. Full error handling for all auth edge cases. See `docs/phase-3/auth-flows.md`.
- [x] Create base Firestore rules and storage rules for development
  > Wrote and deployed proper security rules for Firestore (8 collections with role-based access), Cloud Storage (profile photos only, 5MB limit, image-only), and Realtime Database (provider locations and presence). All deployed live. See `docs/phase-3/security-rules.md`.
- [x] Create the first cloud function scaffolding and deployment flow
  > Built three Cloud Functions and deployed them live: `onUserCreated` (Auth trigger — creates a fallback user doc if the client-side write fails), `onUserDeleted` (Auth trigger — cleans up user and provider docs on account deletion), and `generateQuote` (callable function — takes guest count, event type, date/time, and location, then calculates a price using base fee + per-guest + distance + same-day premium + surge, saves a request and pricing record to Firestore, and returns the breakdown). All three functions are running on Node.js 20 in us-central1. Deployment uses `npm run lint` and `npm run build` as predeploy checks. See `docs/phase-3/cloud-functions.md`.
- [x] Set up crash reporting and logging for early testing
  > Built three layers of error capture: (1) Enhanced logger that writes events and errors to Firestore with severity levels, device info, and stack traces. (2) Global crash catcher that hooks into JS error handler and unhandled promise rejections — fires at app startup. (3) React ErrorBoundary that wraps the whole app and shows a recovery screen if a component crashes. Also added a scheduled Cloud Function (`cleanupOldLogs`) that deletes logs older than 30 days. Firestore rules updated to allow writes to the new `errorLogs` collection. Firebase Crashlytics deferred until we move to development builds. See `docs/phase-3/crash-reporting-and-logging.md`.

**Gate C:** [x] The codebase should feel like a real product foundation, not a loose experiment.
> Gate passed. Navigation architecture, Firebase SDKs, auth flows, design system, UI components, security rules, Cloud Functions, and crash reporting are all in place. The mobile app runs with role-based routing, themed screens, and proper error handling. Four Cloud Functions are deployed (auth triggers, pricing engine, log cleanup). Phase 3 docs live in `docs/phase-3/`.

---

## Phase 4: Customer App Core Flow
**Objective:** Build the customer side first so the core commercial booking flow exists early.

- [ ] Build customer onboarding and profile setup
- [ ] Build location permissions and location capture flow
- [ ] Build the request creation screen for oyster shucker service
- [ ] Build date and time selection logic for immediate and scheduled requests
- [ ] Build pricing quote display with distance, time, and demand inputs
- [ ] Build booking confirmation and payment method flow
- [ ] Integrate Stripe payment intent flow
- [ ] Build request status screen with state changes from created through assigned
- [ ] Build booking history and request detail screens
- [ ] Log all customer events into analytics and event collections

**Gate D:** [ ] A customer should be able to sign up, request service, see a quote, pay, and watch the request progress.

---

## Phase 5: Provider App Core Flow
**Objective:** Build the provider side so the supply side can be onboarded and dispatched.

- [ ] Build provider signup and profile creation
- [ ] Build provider onboarding fields, service area, documents, and approval status
- [ ] Build provider home screen with online and offline state
- [ ] Build provider availability controls and active shift state
- [ ] Build incoming request screen with accept and decline actions
- [ ] Build provider job detail view with location, event details, and customer info
- [ ] Build job progress states for accepted, en route, arrived, started, completed, and canceled
- [ ] Build provider earnings summary and past jobs screen
- [ ] Log provider response time, acceptance, decline, completion, and cancellation events

**Gate E:** [ ] A provider should be able to onboard, go online, receive work, complete jobs, and feed data back into the system.

---

## Phase 6: Realtime Tracking and Maps
**Objective:** Add the live operational layer that makes the product feel like an on demand service app.

- [ ] Integrate map rendering and geocoding into customer and provider views
- [ ] Build live request tracking state updates from Firestore listeners
- [ ] Build provider location update pipeline
- [ ] Create native modules for background location behavior where needed
- [ ] Create native modules or native support for map heavy workflows if React Native performance is not enough
- [ ] Build arrival status updates and ETA presentation
- [ ] Test background behavior, battery impact, and permission edge cases on iOS and Android
- [ ] Create connection recovery and stale tracking fallback logic

**Gate F:** [ ] The product should now feel live, trackable, and operationally believable.

---

## Phase 7: Algorithm and Data Engine
**Objective:** Turn the product into a data collecting machine and launch the first pricing and dispatch intelligence layer.

- [ ] Create collections or logs for pricing decisions, zone snapshots, supply snapshots, and demand snapshots
- [ ] Write the first quote formula using base fee, distance, time, demand, and availability
- [ ] Write the first surge logic thresholds by zone or geo area
- [ ] Write the first provider ranking logic using availability, distance, reliability, and response behavior
- [ ] Log every request state transition as an event
- [ ] Log every provider state transition as an event
- [ ] Run scheduled functions for snapshots, metrics rollups, and recalculation jobs
- [ ] Create admin visible records for quote inputs and outputs so you can audit pricing behavior
- [ ] Create first dashboards or summaries for demand, completion, cancellation, and pricing behavior

**Gate G:** [ ] The app is now collecting the data needed to improve pricing, dispatch, and future algorithm accuracy.

---

## Phase 8: Ops Dashboard and Controls
**Objective:** Build the internal command center that lets you control the MVP without touching production data manually.

- [ ] Build provider approval and rejection controls
- [ ] Build request monitoring table with live status
- [ ] Build provider monitoring table with online status and recent activity
- [ ] Build pricing control panel for base fee, distance logic, and surge thresholds
- [ ] Build support view for customer and provider records
- [ ] Build metrics view for requests, assignments, completions, cancellations, and revenue signals
- [ ] Build audit views for quotes and algorithm output

**Gate H:** [ ] You can operate the business and monitor the system without guessing.

---

## Phase 9: QA, Polish, and Launch Prep
**Objective:** Stabilize the MVP, reduce launch risk, and ensure the narrow oyster shucker launch is operationally tight.

- [ ] Run full end to end tests for customer flow
- [ ] Run full end to end tests for provider flow
- [ ] Run live booking simulations with multiple devices
- [ ] Test quote accuracy against expected outcomes in different zones and times
- [ ] Test payments, cancellations, and completion states
- [ ] Review all analytics events to ensure nothing important is missing
- [ ] Polish copy, UI gaps, empty states, error states, and edge cases
- [ ] Prepare App Store and Google Play assets, copy, policies, and screenshots
- [ ] Prepare launch checklist, provider onboarding checklist, and support checklist

**Gate I:** [ ] The MVP should now be shippable, narrow, and testable with confidence.

---

## Phase 10: Soft Launch and Calibration
**Objective:** Launch in a controlled way, watch the numbers closely, and tune the engine with real use.

- [ ] Launch with a tightly controlled city and provider group
- [ ] Monitor demand by zone, provider supply, acceptance speed, cancellations, and completion rate daily
- [ ] Monitor quote acceptance and user drop off around pricing screens
- [ ] Tune surge thresholds, distance logic, and quote messaging based on real behavior
- [ ] Document every operational issue and convert each one into a product or logic fix
- [ ] Do not expand categories until the oyster shucker model is stable

**Gate J:** [ ] The goal is not broad scale yet. The goal is operational truth, clean data, and a stable engine.
