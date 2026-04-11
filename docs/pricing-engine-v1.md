# RIFCOS — Pricing Engine v1

## Design Principle

Every quote should be explainable internally. The team should know exactly why the system produced the number it produced. No black box pricing. Version 1 is a rules-based formula with observable, testable, and tunable inputs.

---

## The Formula

```
finalQuote = (baseFee + distanceComponent + timeComponent) × surgeMultiplier
```

Where `surgeMultiplier` is derived from demand and supply pressure combined.

---

## Input 1: Base Fee

The starting price for the service before any adjustments.

| Parameter | Description | MVP Default |
|---|---|---|
| `baseFee` | Flat fee for an oyster shucker booking | Configured in `adminConfig` |

This is the floor. Every quote starts here regardless of distance, time, or demand. Adjusted through the admin dashboard as we learn from real bookings.

---

## Input 2: Distance Component

Adjusts the price based on how far the provider has to travel.

| Input | Source | Description |
|---|---|---|
| `providerToCustomerDistance` | Google Maps / Geocoding | Straight-line or route distance in miles |
| `distanceRate` | `adminConfig` | Cost per mile beyond a free threshold |
| `freeDistanceThreshold` | `adminConfig` | Miles included in the base fee (e.g. first 10 miles free) |

### Calculation

```
if distance <= freeDistanceThreshold:
  distanceComponent = 0
else:
  distanceComponent = (distance - freeDistanceThreshold) × distanceRate
```

### Later Improvements (post-launch)
- Route complexity instead of straight-line distance
- Traffic weighting from Google Directions API
- Historical provider acceptance rates by distance bracket

---

## Input 3: Time Component

Adjusts the price based on when the service is requested and when it happens.

| Input | Source | Description |
|---|---|---|
| `dayOfWeek` | Request data | Monday–Sunday |
| `timeOfDay` | Request data | Bucketed: morning, afternoon, evening, night |
| `leadTimeHours` | Calculated | Hours between now and the event time |
| `isWeekend` | Derived | Saturday or Sunday |

### Time Adjustments

| Condition | Adjustment | Reason |
|---|---|---|
| Weekday daytime | No adjustment (baseline) | Normal demand |
| Weekend | `weekendPremium` added | Higher hosting activity |
| Evening (after 6pm) | `eveningPremium` added | Peak event hours |
| Late night (after 10pm) | `lateNightPremium` added | Reduced provider availability |
| Same-day request (< 6 hours lead time) | `urgencyPremium` added | Short notice, harder to fill |
| Advance booking (> 72 hours) | No adjustment or slight discount | Easier to plan |

### Calculation

```
timeComponent = weekendPremium + eveningPremium + lateNightPremium + urgencyPremium
```

Only applicable premiums are added. Most requests will hit zero or one of these.

### All premium values are stored in `adminConfig.pricing.timeRates` and adjustable from the dashboard.

---

## Input 4: Demand Multiplier

Measures how many people are requesting service in a given area.

| Input | Source | Description |
|---|---|---|
| `activeRequestsInZone` | Firestore query / zone snapshot | Number of open requests in the customer's zone |
| `recentRequestVelocity` | Calculated | Requests in the last 30–60 minutes in this zone |
| `historicalDemandAtTime` | Zone summaries | Average demand for this zone at this day/time (built over time) |

### How it's used

Demand pressure feeds into the surge multiplier calculation (see below). It does not add a separate line item — it influences the multiplier.

---

## Input 5: Supply Pressure

Measures how many providers are available to fill requests.

| Input | Source | Description |
|---|---|---|
| `activeProvidersInZone` | Firestore query / presence data | Online providers in the customer's zone |
| `providerCoverage` | Calculated | Ratio of providers to open requests |
| `nearestProviderDistance` | Calculated | How far away the closest available provider is |

### How it's used

Low supply feeds into the surge multiplier. Fewer available providers = higher multiplier.

---

## Surge Multiplier

Combines demand and supply signals into a single multiplier applied to the base calculation.

### Surge Bands

| Band | Multiplier Range | Trigger |
|---|---|---|
| `normal` | 1.0 | Supply meets or exceeds demand |
| `busy` | 1.1 – 1.2 | Moderate demand increase or slight supply drop |
| `high_demand` | 1.3 – 1.5 | Demand clearly outpacing supply |
| `hot_zone` | 1.6 – 1.9 | Significant imbalance, few providers available |
| `extreme` | Capped at max | Severe shortage — cap prevents runaway pricing |

### Surge Cap

A maximum surge multiplier is set in `adminConfig.pricing.surgeBands.maxMultiplier` to prevent quotes from becoming unreasonable. This is a hard ceiling.

### Determining the Band

```
requestToProviderRatio = activeRequestsInZone / activeProvidersInZone

if ratio <= 1.0 → normal
if ratio <= 2.0 → busy  
if ratio <= 3.0 → high_demand
if ratio <= 5.0 → hot_zone
if ratio > 5.0  → extreme (capped)

if activeProvidersInZone == 0 → extreme (capped)
```

These thresholds are stored in `adminConfig` and tuned based on real data after launch.

### Customer-Facing Surge Messaging

| Band | Message shown to customer |
|---|---|
| `normal` | (no message) |
| `busy` | "Slightly higher demand in your area" |
| `high_demand` | "High demand — prices are elevated" |
| `hot_zone` | "Very high demand — limited shuckers available" |
| `extreme` | "Peak pricing active — limited availability" |

---

## Provider Match Scoring

When multiple providers are available, the system ranks them to find the best match. This is separate from pricing but runs alongside it.

### Match Score Inputs

| Factor | Weight (v1) | Source |
|---|---|---|
| Availability | Required | Must be `online` and not `busy` |
| Distance | High | Closer providers ranked higher |
| Reliability | Medium | `completionRate` from provider record |
| Rating | Medium | Average `rating` score |
| Response speed | Low | `avgResponseTime` from provider record |

### V1 Scoring Formula

```
matchScore = (distanceScore × 0.40) + (reliabilityScore × 0.25) + (ratingScore × 0.20) + (responseScore × 0.15)
```

Where each component is normalized to 0–100:
- `distanceScore`: 100 for closest, decreasing with distance
- `reliabilityScore`: `completionRate` as-is (already 0–100)
- `ratingScore`: `(rating / 5) × 100`
- `responseScore`: 100 for fastest responders, decreasing with slower times

The provider with the highest `matchScore` gets the request first. If they decline or timeout, the next highest is tried.

### Weights are stored in `adminConfig.matching` and adjustable after launch.

---

## What Gets Stored

Every quote generates a `pricingRecords` document (see `firestore-schema.md`) that captures:
- Every input value at the time of the quote
- The formula components (base, distance, time)
- The surge band and multiplier
- The final quoted price
- The outcome (accepted, abandoned, expired)

This creates the dataset needed to evaluate and improve pricing over time.

---

## How the Algorithm Evolves

| Phase | Approach |
|---|---|
| **A — Launch (now)** | Rules and scoring as defined above. Observable and tunable. |
| **B — Post-launch** | Weight tuning based on historical data. Adjust surge thresholds, distance rates, and match weights using real conversion and acceptance patterns. |
| **C — Later** | Predictive models for conversion likelihood, optimal surge level, cancellation risk, and arrival time prediction. |
| **D — Future** | Full intelligence engine for pricing, matching, provider activation windows, and category expansion pricing. |

We are building Phase A. Everything above is designed so Phase B tuning is just changing config values — no code rewrite needed.

---

## Configuration Summary

All tunable values live in `adminConfig.pricing` and `adminConfig.matching`:

```
adminConfig: {
  pricing: {
    baseFee: number (cents)
    distanceRate: number (cents per mile)
    freeDistanceThreshold: number (miles)
    weekendPremium: number (cents)
    eveningPremium: number (cents)
    lateNightPremium: number (cents)
    urgencyPremium: number (cents)
    surgeBands: {
      busyThreshold: number
      highDemandThreshold: number
      hotZoneThreshold: number
      extremeThreshold: number
      maxMultiplier: number
    }
  }
  matching: {
    timeoutSeconds: number
    maxAttempts: number
    radiusMiles: number
    weights: {
      distance: number
      reliability: number
      rating: number
      response: number
    }
  }
}
```
