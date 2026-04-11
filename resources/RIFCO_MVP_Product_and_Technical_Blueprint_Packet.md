# RIFCO MVP Product and Technical Blueprint Packet

## Document Purpose
This document is the master product and technical blueprint for the RIFCO MVP. It is intended for internal planning, founder reference, executive review, and technical execution alignment. It defines the product vision, launch strategy, technology stack, algorithm direction, architecture approach, and phase based development plan.

## Product Vision

RIFCO launches as a narrowly focused, high clarity request app for one initial service category:

**Request an Oyster Shucker for your party or event.**

This narrow launch is intentional. It provides:
- clear market positioning
- simpler operations at launch
- easier provider onboarding
- tighter quality control
- cleaner early data for pricing and matching systems
- a strong category specific marketing wedge

Once the platform is stable, the pricing engine is calibrated, and usage data is flowing correctly, RIFCO expands into a broader experience request platform. Future categories may include:
- bartenders
- magicians
- chefs
- hibachi chefs
- musicians
- other premium event based experiences

The long term business is not just an oyster shucker app. It is an on demand experience request platform powered by strong pricing, dispatch, and demand intelligence.

## Product Philosophy

### Surface Simplicity
The user experience should feel extremely simple:
1. Open app
2. Request service
3. See pricing
4. Confirm booking
5. Track provider
6. Complete payment

### Back End Sophistication
Under the surface, the product should be highly intelligent, with structured data and decision systems around:
- pricing
- distance
- supply and demand
- time based adjustments
- zone pressure
- provider quality
- fulfillment performance
- future category expansion

### Launch Focus
The MVP remains intentionally disciplined. RIFCO should **not** launch as a broad all in one services platform. It launches with a single service category so the system can learn in a controlled environment.

## Locked Technology Stack

### Mobile Application
- **Framework:** React Native with TypeScript
- **Reasoning:** one cross platform codebase, simultaneous iOS and Android launch, faster MVP delivery, scalable startup friendly choice

### Native Performance Modules
- **iOS:** Swift native modules
- **Android:** Kotlin native modules

Use native modules for:
- live tracking
- background location handling
- map intensive workflows
- location optimization
- OS specific performance behaviors

### Backend Platform
- **Core Backend:** Firebase
- **Services:**
  - Firebase Auth
  - Cloud Firestore
  - Cloud Functions
  - Cloud Storage
  - Firebase Cloud Messaging
  - Firebase Analytics
  - Firebase Realtime Database for provider presence and live connection style status if needed

### Web and Admin Layer
- **Framework:** Next.js
- **Hosting:** Vercel

Use this for:
- marketing site
- admin dashboard
- support tools
- provider management panel
- pricing controls
- ops visibility

### Maps and Routing
- Google Maps Platform
- geocoding
- map rendering
- route visualization
- ETA estimation
- distance calculations

### Payments
- Stripe
- customer charges
- refunds
- payout infrastructure later
- payment event handling
- tipping support later if desired

## MVP Scope

### Customer Side MVP
- sign up and login
- profile creation
- location input
- request oyster shucker flow
- quote and pricing display
- booking confirmation
- live status updates
- tracking experience
- payment
- booking history
- ratings and reviews

### Provider Side MVP
- provider sign up
- profile and credential collection
- approval flow
- online and offline status
- accept and decline requests
- navigation to job
- job status updates
- completion flow
- ratings visibility
- payout readiness for future finance layer

### Admin Side MVP
- provider approval
- live job monitoring
- request monitoring
- pricing control
- zone control
- cancellation review
- support tooling
- analytics overview
- surge monitoring

## Strategic Goal of V1
The MVP is not only about proving consumer demand. It is about training the RIFCO intelligence layer.

RIFCO must collect structured data from day one across:
- pricing decisions
- quote acceptance
- location and zone behavior
- supply and demand pressure
- provider performance
- request lifecycle outcomes
- fulfillment reliability
- repeat behavior
- conversion behavior

## Algorithm and Intelligence Strategy

### Core Principle
Do not start with a black box AI system. Start with a structured rules and scoring engine that is observable, testable, and tunable.

### Algorithm Layers

#### Layer 1: Event Collection Engine
Captures all meaningful product activity.

Examples:
- request created
- price quoted
- price accepted
- provider matched
- provider accepted
- provider arrived
- job completed
- job canceled
- rating submitted

#### Layer 2: Pricing and Dispatch Logic Engine
Applies rules, formulas, and weighted scoring.

#### Layer 3: Learning and Optimization Engine
Uses historical data to adjust weights, thresholds, and priorities.

#### Layer 4: Predictive Intelligence Layer
Future phase system that predicts:
- conversion likelihood
- best surge multiplier
- best provider match
- expected cancellation risk
- demand by zone and time
- optimal provider activation windows

## Data Collection Requirements

### Customer Data
Track:
- request location
- time of request
- date of service
- quote shown
- final price
- accepted or abandoned quote
- completed or canceled request
- rating
- tip amount
- repeat booking behavior
- lead time before service

### Provider Data
Track:
- online and offline state
- response time
- acceptance rate
- decline rate
- completion rate
- cancellation rate
- location at acceptance
- travel distance
- arrival punctuality
- rating score
- active hours

### System Data
Track:
- active requests by zone
- active providers by zone
- request to provider ratio
- average match time
- average quoted price
- average accepted price
- conversion rate
- completion rate
- cancellation rate
- peak usage windows

### Pricing Data
Store every pricing decision with:
- base fee
- distance component
- time component
- demand multiplier
- supply pressure multiplier
- final quote
- final paid price
- quote acceptance outcome
- booking outcome

## Pricing Engine Vision

### Version 1 Approach
Use a rules based pricing formula that combines:
- base service fee
- distance fee
- time premium
- demand multiplier
- low supply multiplier

### Inputs
- user location
- provider distance
- service timing
- day of week
- time of day
- zone pressure
- available provider count
- active request count
- lead time to service

### Design Principle
Every quote should be explainable internally. The team should know why the system produced the number it produced.

## Surge Pricing Logic

### Goal
Introduce intelligent but controlled dynamic pricing similar in spirit to ride share pricing, without making the product feel random or unfair.

### Surge Inputs
- active requests in zone
- available providers in zone
- recent request velocity
- provider coverage
- historical demand at current time window
- acceptance performance at similar price ranges
- urgency level
- lead time to service

### Example Surge Bands
- Normal: 1.0
- Busy: 1.1 to 1.2
- High Demand: 1.3 to 1.5
- Hot Zone: 1.6 to 1.9
- Extreme Demand: capped range

### User Facing Messaging
Examples:
- High demand in your area
- Prime time pricing active
- Limited providers available nearby

## Distance Pricing Logic

### Initial Approach
Distance based adjustment should start simple and grow smarter over time.

Inputs:
- provider to customer distance
- expected travel burden
- zone density
- service timing
- provider scarcity in radius

### Later Improvements
- route complexity
- traffic weighting
- historical provider acceptance by distance
- estimated travel time instead of just mileage

## Time Based Pricing Logic
The pricing system should consider:
- weekday versus weekend
- day versus evening
- late night premium
- same day urgency premium
- peak hosting hours
- holiday premium later

## Matching Logic

### Version 1 Matching Priorities
Rank providers by:
- availability
- distance
- reliability
- rating
- responsiveness
- completion history

### Provider Scoring Concept
Provider Match Score may combine:
- Availability Score
- Distance Score
- Reliability Score
- Quality Score
- Responsiveness Score

## How the Algorithm Evolves

### Phase A
Rules and scoring

### Phase B
Weight tuning based on historical data

### Phase C
Predictive models for:
- conversion
- acceptance
- cancellation risk
- arrival prediction
- surge optimization

### Phase D
Full intelligence engine for pricing, matching, provider activation, and category expansion

## Continuous System Operation

### Real Time Layer
Handles:
- live request intake
- provider status
- price calculation
- match triggers
- status updates
- live monitoring

### Scheduled Intelligence Layer
Runs:
- zone snapshots
- hourly summaries
- daily recalibration
- nightly provider scoring refresh
- demand summaries

### Long Horizon Learning Layer
Runs:
- trend analysis
- category readiness analysis
- zone growth modeling
- performance studies
- future predictive training inputs

## Firebase Architecture Role

### Firestore
Use for:
- users
- providers
- requests
- jobs
- pricing records
- ratings
- event logs
- summaries

### Cloud Functions
Use for:
- price calculation
- surge updates
- provider matching triggers
- notifications
- aggregations
- scheduled recalculations
- system automation

### Realtime Database
Use for:
- provider presence
- online status
- heartbeat style availability
- lightweight live state

### Firebase Analytics
Use for:
- app usage
- funnel tracking
- product decisions
- activation monitoring

## Event Architecture
Every major action should be logged as a structured event.

Example events:
- user_signed_up
- provider_signed_up
- provider_approved
- request_created
- price_quoted
- price_accepted
- provider_matched
- provider_declined
- provider_accepted
- provider_arrived
- job_started
- job_completed
- job_cancelled
- tip_added
- review_submitted

## 90 to 120 Day MVP Delivery Plan

## Phase 1: Foundation and System Design
**Goal:** lock the product, architecture, and data model before building.

### Tasks
- finalize MVP feature scope
- finalize launch category as oyster shucking only
- finalize customer and provider user flows
- define request lifecycle states
- define provider lifecycle states
- define pricing logic version 1
- define event taxonomy
- define zone strategy
- define admin needs
- define analytics requirements

### Deliverables
- architecture document
- product scope sheet
- request lifecycle map
- provider lifecycle map
- event tracking plan
- pricing logic document
- admin dashboard requirements

## Phase 2: UX and Product Flow Design
**Goal:** create clean production ready screens and interaction flow.

### Tasks
- customer onboarding screens
- provider onboarding screens
- profile setup screens
- request flow screens
- quote screen
- status and tracking screen
- payment flow screens
- completion flow
- ratings flow
- provider availability flow
- admin flow design

### Deliverables
- screen inventory
- navigation map
- state transition diagrams
- design system base rules

## Phase 3: Core Mobile Build
**Goal:** build the primary customer and provider app experience.

### Tasks
- React Native project foundation
- authentication
- onboarding
- profile management
- request creation
- status and lifecycle UI
- booking history
- ratings and reviews
- push notification handling
- settings
- account basics
- error states and fallback flows

### Native Module Tasks
- background location handling
- map optimization
- live tracking support
- location permission handling

## Phase 4: Firebase Backend and Logic Layer
**Goal:** build the operational and intelligence backbone.

### Tasks
- configure Firebase project
- configure Auth
- create Firestore schema
- configure Functions
- build request lifecycle logic
- build provider lifecycle logic
- build pricing engine version 1
- build surge engine version 1
- build event logging pipeline
- build notifications
- build scheduled jobs
- build role based admin controls

## Phase 5: Web Admin and Operations Layer
**Goal:** provide the tools needed to monitor, adjust, and support early launch.

### Tasks
- create admin web app
- provider approval panel
- live request monitor
- live job monitor
- pricing controls
- zone controls
- cancellation review
- analytics dashboard
- support workflow tools

## Phase 6: Testing and Calibration
**Goal:** validate the app and tune the logic before launch.

### Tasks
- internal booking simulations
- test onboarding
- test pricing outputs
- test provider acceptance
- test cancellations
- test tracking
- test push notifications
- calibrate zone thresholds
- calibrate distance pricing
- validate edge cases
- validate failure handling

## Phase 7: Launch and Controlled Rollout
**Goal:** launch with discipline and learn fast.

### Launch Conditions
- one city focus
- oyster shucker category only
- vetted provider pool
- active monitoring
- manual ops oversight
- close measurement of pricing and fulfillment outcomes

### Success Indicators
- healthy conversion
- successful fulfillment
- working live tracking
- pricing feels logical
- acceptable cancellation rate
- early repeat usage
- usable ops dashboard
- clear first wave data patterns

## Expansion Strategy After Oyster Shucking
Expand only once:
- fulfillment quality is stable
- pricing logic is reliable
- provider operations are under control
- zone data is trustworthy
- admin tools are usable
- customer behavior is understood

Possible next category rollout order:
1. bartender
2. hibachi chef
3. private chef
4. musician
5. magician

Each category should be evaluated through the same pricing, distance, time, and reliability framework.

## Strategic Summary
RIFCO should be treated as a pricing and dispatch intelligence company wrapped inside a simple request app.

The consumer experience remains easy. The defensibility comes from:
- structured marketplace style data
- pricing intelligence
- location and demand intelligence
- provider quality intelligence
- disciplined category expansion
- operational visibility
