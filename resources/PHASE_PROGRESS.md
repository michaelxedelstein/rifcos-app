# RIFCOS MVP Phase Progress Tracker

> **This file is the single source of truth for what has been completed.**
> Agents: update this file as phases and tasks are finished. Check boxes with [x] when done.
> Phases follow the RIFCOS MVP Execution Roadmap (PDF). There are 10 phases with gates A through J.

---

## Phase 1: Core Setup and Planning
**Objective:** Create the technical foundation, project structure, and product rules before a single major screen is built.

- [x] Create the Firebase project, enable billing, and confirm the correct account ownership model
- [x] Enable Firebase Auth, Firestore, Cloud Storage, Cloud Functions, Cloud Messaging, and Analytics
- [x] Decide whether to also enable Realtime Database for provider presence and connection status
- [x] Create the Google Cloud project and connect the Google Maps Platform APIs you need
- [x] Enable Maps SDK, Places, Geocoding, Directions, and any related quota alerts
- [ ] Create the Stripe account, connect business settings, and outline payment flow assumptions
- [x] Create the React Native app shell and set up iOS and Android builds locally
- [x] Create the Vercel project and the Next.js internal ops dashboard shell
- [x] Write the locked MVP scope so the build remains oyster shucker only
- [x] Write the request lifecycle states, provider states, cancellation states, and payment states
- [x] Write the first Firestore collection map and event logging taxonomy
- [x] Write the algorithm input list for pricing, demand, distance, and supply logic

**Gate A:** [ ] All accounts live, billing active, quotas visible, repositories initialized, and the first product and data definitions written down.

---

## Phase 2: Product Flow and Screen Mapping
**Objective:** Design the product flow from start to finish so development follows one clear path instead of random feature building.

- [ ] Write the complete customer journey from app open through request completion
- [ ] Write the complete provider journey from signup through job completion
- [ ] List every screen needed for MVP in the customer app
- [ ] List every screen needed for MVP in the provider app
- [ ] Define onboarding questions, profile fields, and permissions flow
- [ ] Define the request form fields, pricing view, confirmation screen, tracking screen, and completion flow
- [ ] Define provider profile, availability screen, incoming request screen, navigation state, and earnings history screen
- [ ] Define all status badges, labels, and user facing language for live jobs
- [ ] Create a screen order map so you always know what to build next

**Gate B:** [ ] You should know every screen, every major state, and the exact order in which the product is built.

---

## Phase 3: Project Foundation Build
**Objective:** Turn the plan into a stable codebase with working navigation, environments, authentication, and baseline services.

- [ ] Set up environment variable handling for Firebase, Stripe, and Google Maps
- [ ] Configure React Native navigation structure for customer and provider areas
- [ ] Connect Firebase SDKs and confirm auth, database, storage, messaging, and analytics integration
- [ ] Create the app theme, type scale, color tokens, spacing system, and shared UI components
- [ ] Build reusable inputs, buttons, cards, modals, loading states, and error states
- [ ] Set up auth flows for email, phone, or social sign in based on final decision
- [ ] Create base Firestore rules and storage rules for development
- [ ] Create the first cloud function scaffolding and deployment flow
- [ ] Set up crash reporting and logging for early testing

**Gate C:** [ ] The codebase should feel like a real product foundation, not a loose experiment.

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
