# RIFCO MVP Execution Roadmap and Development Packet

## Document Purpose
This document is the operational execution roadmap for the RIFCO MVP. It is written as a step by step implementation guide for a solo founder developer building the first production version of the app. It is structured so each phase can be completed, reviewed, and locked before moving into the next phase.

## Build Operating Rules
- stay within MVP scope
- do not build future categories before oyster shucker launch works
- do not skip architecture, data, or analytics planning
- complete each phase gate before moving forward
- keep product simple on the surface
- keep the data and logic layer highly structured underneath
- document every important decision inside the codebase and project docs

## Locked Stack
- React Native with TypeScript for the mobile app
- Swift and Kotlin native modules for live tracking and map heavy features
- Firebase for backend
- Firestore for core data
- Cloud Functions for logic and automation
- Firebase Auth for authentication
- Cloud Storage for files
- Firebase Cloud Messaging for push
- Firebase Realtime Database for provider presence if needed
- Next.js on Vercel for admin and operational tools
- Google Maps Platform for maps and routing
- Stripe for payments

## Master Development Sequence
1. environment and account setup
2. architecture and schema planning
3. mobile app skeleton
4. onboarding and profile systems
5. request and booking flow
6. backend logic and event tracking
7. live maps and status systems
8. payments and notifications
9. admin dashboard
10. testing and calibration
11. launch prep
12. controlled rollout

## Phase 0: Environment Setup and Account Infrastructure
**Target:** establish the full technical foundation before product coding begins.

### Objectives
- create and secure all platform accounts
- turn on billing and required APIs
- initialize the codebase correctly
- prepare mobile environments for iOS and Android
- avoid platform blockers later

### Tasks

#### Firebase Setup
- create Firebase project for RIFCO
- enable billing
- configure project environments if using dev and prod separation
- enable Firebase Auth
- enable Firestore
- enable Cloud Functions
- enable Cloud Storage
- enable Cloud Messaging
- enable Analytics
- create initial security rules placeholders

#### Google Cloud and Maps Setup
- connect the project to Google Cloud
- enable Maps SDK for iOS
- enable Maps SDK for Android
- enable Geocoding API
- enable Directions API or Routes API
- configure billing
- create restricted API keys
- store keys securely in environment files

#### Apple Setup
- confirm Apple Developer account access
- prepare app identifier naming
- configure certificates and capabilities later as needed
- prepare push notification support path

#### Google Play Setup
- confirm Google Play Console account
- prepare package naming strategy
- define signing strategy
- note release track plan for internal and closed testing

#### Stripe Setup
- create Stripe account
- store test keys
- define payment architecture for customer charges
- document future payout architecture for providers

#### Codebase Setup
- initialize React Native project with TypeScript
- create project folder structure
- add environment configuration pattern
- add linting and formatting
- configure Firebase packages
- configure navigation base
- configure state management direction
- configure secret handling pattern
- create shared constants structure
- create documentation folder inside codebase

### Phase Gate
Do not move to Phase 1 until:
- Firebase is fully enabled
- Google APIs are enabled
- billing is active
- iOS and Android projects build locally
- environment files and keys are organized
- repo structure is clean

## Phase 1: Product Architecture and Data Planning
**Target:** define exactly what is being built before UI work expands.

### Objectives
- lock MVP product scope
- lock user types and flows
- define data structures
- define lifecycle states
- define event taxonomy
- define pricing logic version 1

### Tasks

#### Product Scope Lock
- confirm launch category is oyster shucker only
- confirm customer app flow
- confirm provider app flow
- confirm admin flow
- list in scope features
- list explicitly out of scope features

#### Lifecycle Mapping
- define request lifecycle states
- define provider lifecycle states
- define booking status labels
- define cancellation states
- define completion states
- define review eligibility rules

#### Firestore Schema Planning
- users collection
- providers collection
- requests collection
- jobs collection
- pricing records collection
- events collection
- ratings collection
- admin configuration collection
- zone summaries collection if used

#### Event Tracking Plan
Create structured event names and event payload definitions for:
- sign up
- onboarding complete
- provider approved
- request created
- quote generated
- quote accepted
- request abandoned
- provider matched
- provider accepted
- provider declined
- provider arrived
- job started
- job completed
- job cancelled
- review submitted

#### Pricing Logic Planning
- define base service fee logic
- define distance adjustment logic
- define time based adjustment logic
- define demand multiplier logic
- define low supply logic
- define surge bands
- define caps and safeguards

### Deliverables
- product scope sheet
- state diagrams
- Firestore schema draft
- event taxonomy
- pricing logic document

### Phase Gate
Do not move to Phase 2 until:
- schema is documented
- states are documented
- event names are locked
- pricing formula version 1 is documented
- MVP scope is frozen

## Phase 2: App Structure and Navigation Foundation
**Target:** create the mobile app shell and navigation framework.

### Objectives
- build the app skeleton
- create routing structure
- create shared design system foundations
- prepare screen grouping by feature area

### Tasks

#### Core App Structure
- define app folder structure
- create screens folder organization
- create components folder organization
- create services folder
- create hooks folder
- create native integration folder
- create feature based module structure

#### Navigation
- auth stack
- onboarding stack
- customer main flow
- provider main flow
- shared settings flow
- modal pattern
- deep linking strategy placeholder

#### Shared UI System
- color tokens
- spacing tokens
- typography tokens
- button system
- input field system
- card pattern
- loader states
- error states
- empty states

### Deliverables
- running app shell
- navigation map implemented
- core UI primitives created
- screen placeholder routes ready

### Phase Gate
Do not move to Phase 3 until:
- navigation is stable
- all major routes exist as placeholders
- shared UI tokens are set
- project organization is clean

## Phase 3: Authentication, Onboarding, and Profile Setup
**Target:** create the first usable entry experience.

### Objectives
- let users sign up and sign in
- create onboarding path
- collect profile data
- establish role based access for customer and provider

### Tasks

#### Authentication
- email and password auth
- password reset
- session persistence
- logout flow
- auth guard logic

#### Customer Onboarding
- welcome screen
- account creation
- basic profile fields
- location permission request flow
- initial location setup
- completion state

#### Provider Onboarding
- provider sign up flow
- basic profile information
- service capability fields
- location setup
- credential or verification placeholders
- pending approval state

#### Profile Setup
- customer profile edit screen
- provider profile edit screen
- photo upload support if included
- contact details
- service area fields if needed

### Deliverables
- complete auth flow
- customer onboarding flow
- provider onboarding flow
- profile creation and editing flow

### Phase Gate
Do not move to Phase 4 until:
- sign up works
- sign in works
- role routing works
- onboarding completion writes to Firebase correctly
- profile data is stored correctly

## Phase 4: Request Creation and Booking Flow
**Target:** build the core customer experience.

### Objectives
- allow customer to request an oyster shucker
- collect required job details
- generate quote
- confirm booking

### Tasks

#### Request Flow
- request start screen
- service details form
- date and time selection
- location selection
- event detail inputs
- special notes field if included
- review request summary

#### Quote Flow
- call pricing logic
- display base price and final quote
- show surge messaging if active
- handle accepted quote
- handle abandoned quote
- create pricing record

#### Booking Confirmation
- create request record
- transition request to matching state
- show confirmation screen
- write event logs
- create initial status timeline

### Deliverables
- working request form
- working quote flow
- booking confirmation experience
- Firebase write path for requests and pricing

### Phase Gate
Do not move to Phase 5 until:
- customer can create request end to end
- quote logic returns correctly
- booking confirmation persists data correctly
- events are logging correctly

## Phase 5: Provider Availability, Acceptance, and Job Lifecycle
**Target:** build the provider side operational flow.

### Objectives
- let providers go online
- receive requests
- accept or decline work
- progress through job states

### Tasks

#### Provider Availability
- online and offline toggle
- provider status persistence
- presence support planning
- location ready checks

#### Request Handling
- provider request notification
- request detail view
- accept flow
- decline flow
- timeout behavior if needed
- match confirmation

#### Job Lifecycle
- en route state
- arrived state
- start job state
- complete job state
- cancellation flow
- post completion summary

### Deliverables
- provider online flow
- provider request acceptance flow
- working status state transitions
- provider lifecycle writes to Firebase

### Phase Gate
Do not move to Phase 6 until:
- provider can go online
- provider can accept and decline
- job status transitions work
- customer sees lifecycle updates

## Phase 6: Live Status, Maps, and Native Module Integration
**Target:** add the real time experience layer that makes the app feel production grade.

### Objectives
- show live provider movement
- handle background location for provider
- support map based tracking flow
- keep this module isolated and clean

### Tasks

#### Map Integration
- customer tracking map
- provider navigation map
- current location markers
- route rendering placeholder or integration
- ETA display if implemented

#### Native Modules
- iOS background location support
- Android background location support
- location permission handling
- location update optimization
- native bridge testing
- fallback logic for denied permissions

#### Realtime State
- provider live status updates
- job timeline refresh
- tracking data sync
- online presence logic if using Realtime Database

### Deliverables
- live tracking screen
- provider background location flow
- map rendering on both platforms
- native modules integrated successfully

### Phase Gate
Do not move to Phase 7 until:
- tracking works
- location updates are stable
- background behavior is acceptable
- app does not break when permission states change

## Phase 7: Backend Logic, Functions, and Algorithm Foundations
**Target:** implement the system intelligence layer.

### Objectives
- move pricing and lifecycle logic into reliable backend functions
- start the event logging and analytics engine
- prepare the app to learn from usage data

### Tasks

#### Cloud Functions
- quote generation function
- surge calculation helper logic
- request creation workflows
- provider matching trigger
- status change listeners
- notification triggers
- aggregation jobs
- scheduled recalculation jobs

#### Pricing Engine V1
- base fee logic
- distance logic
- time adjustment logic
- demand logic
- surge logic
- caps and validation
- pricing record persistence

#### Event Pipeline
- log every major event
- validate event payload structure
- create reusable event service
- store request lifecycle milestones
- store pricing outcomes
- store completion outcomes

### Deliverables
- backend pricing logic
- function driven automations
- event logging pipeline
- algorithm foundation service layer

### Phase Gate
Do not move to Phase 8 until:
- pricing logic is callable and reliable
- events are storing consistently
- lifecycle automation is working
- functions are deployable without errors

## Phase 8: Payments, Notifications, and Reviews
**Target:** complete the core transactional experience.

### Objectives
- charge customers
- notify users and providers
- collect quality signals after service

### Tasks

#### Payments
- Stripe payment intent flow
- checkout confirmation
- success state
- failure state
- refund path placeholder
- payment record storage

#### Notifications
- push permission flow
- customer notifications
- provider notifications
- booking updates
- arrival updates
- cancellation updates

#### Ratings and Reviews
- post completion prompt
- rating submission
- review text if included
- rating storage
- provider score update input

### Deliverables
- working payment flow
- push notification delivery
- rating and review flow

### Phase Gate
Do not move to Phase 9 until:
- payment works in test mode
- notifications are firing
- reviews submit successfully
- booking completion updates the proper records

## Phase 9: Admin Dashboard and Operational Tools
**Target:** build the web side tools needed for launch control.

### Objectives
- give yourself operational visibility
- enable provider approval
- monitor pricing and jobs
- support launch management

### Tasks

#### Admin App Setup
- initialize Next.js admin app
- auth protect the dashboard
- connect to Firebase securely

#### Operational Panels
- provider approval panel
- live requests table
- live jobs table
- pricing configuration view
- surge monitor
- zone monitor
- cancellation review view
- support notes tools
- analytics summary view

### Deliverables
- usable admin dashboard
- provider approval workflow
- live operational visibility
- basic control surfaces

### Phase Gate
Do not move to Phase 10 until:
- you can approve providers
- you can see active jobs
- you can see pricing data
- you can monitor issues from one screen

## Phase 10: Testing, QA, and Calibration
**Target:** stabilize the product before launch.

### Objectives
- test end to end flows
- catch edge cases
- calibrate logic and thresholds
- validate reliability

### Tasks

#### Functional Testing
- auth tests
- onboarding tests
- request creation tests
- provider acceptance tests
- cancellation tests
- payment tests
- review tests

#### Operational Testing
- internal booking simulations
- multiple live request tests
- provider online and offline tests
- pricing scenario tests
- zone pressure tests
- surge threshold tests
- distance pricing tests

#### Reliability Testing
- permission denied states
- app closed or backgrounded
- network failure
- duplicate actions
- stale request handling
- payment failure handling

### Deliverables
- issue list
- calibrated thresholds
- stabilized request lifecycle
- launch checklist draft

### Phase Gate
Do not move to Phase 11 until:
- critical bugs are resolved
- pricing feels logical
- lifecycle flows are reliable
- admin tools are usable
- push and payments are stable

## Phase 11: Launch Preparation
**Target:** prepare the MVP for controlled public release.

### Objectives
- lock release build
- prepare stores
- prepare launch ops
- keep launch disciplined

### Tasks

#### Release Preparation
- app branding assets
- store listing drafts
- screenshots
- privacy policy and terms placeholders if needed
- test flight or internal testing
- closed testing track on Android
- production environment verification

#### Operations Preparation
- define launch city
- define provider launch cohort
- define manual support process
- define launch monitoring checklist
- define rollback and issue plan

### Deliverables
- app store ready builds
- store listing materials
- launch operations checklist
- production configuration review

### Phase Gate
Do not move to Phase 12 until:
- builds are stable
- store submission materials are ready
- launch city and provider group are confirmed
- monitoring plan exists

## Phase 12: Controlled Launch and Learning Loop
**Target:** launch with focus and gather the first meaningful data.

### Objectives
- fulfill real requests successfully
- monitor pricing and fulfillment closely
- learn fast without expanding too early

### Tasks

#### Launch Rules
- one city only
- oyster shucker only
- controlled provider count
- daily monitoring
- manual intervention where needed
- log all major issues

#### Data Review Routine
- review quote acceptance
- review completion rate
- review cancellations
- review provider reliability
- review distance patterns
- review surge activations
- review user feedback
- review repeat behavior

### Deliverables
- first launch performance reports
- first pricing calibration notes
- first provider performance review
- expansion readiness assessment template

## Phase 13: Post Launch Optimization
**Target:** strengthen the engine before expanding categories.

### Objectives
- improve pricing
- improve fulfillment
- improve provider quality
- prepare for future category rollout

### Tasks
- tune surge thresholds
- tune distance logic
- tune provider ranking logic
- improve event dashboards
- review time based pricing
- review zone definitions
- identify operational bottlenecks
- identify future automation opportunities

## Recommended Weekly Focus Rhythm
- one active build phase at a time
- one visible milestone per week
- one weekly review of bugs and blockers
- one weekly review of pricing and event data once data exists
- no new features added mid phase unless critical

## Ongoing Documentation to Maintain in the Codebase
Create and keep updated:
- `/docs/product-scope.md`
- `/docs/technical-blueprint.md`
- `/docs/execution-roadmap.md`
- `/docs/firestore-schema.md`
- `/docs/event-taxonomy.md`
- `/docs/pricing-engine-v1.md`
- `/docs/request-lifecycle.md`
- `/docs/provider-lifecycle.md`
- `/docs/admin-dashboard-modules.md`
- `/docs/launch-checklist.md`

## Suggested Cursor Reference Usage
Put these markdown files inside the repo so the coding agent can reference:
- product blueprint
- execution roadmap
- pricing logic
- schema definitions
- state machine definitions

When prompting Cursor, reference the exact phase. Example:
- Implement Phase 3 customer onboarding using the execution roadmap
- Build Phase 7 pricing engine v1 using the documented pricing rules
- Update the Firestore schema to match the Phase 1 locked data model

## Final Build Principle
RIFCO wins by staying simple in product experience and sophisticated in data, pricing, and fulfillment logic. The MVP should not try to feel huge. It should feel reliable, clean, focused, and intelligently structured from day one.
