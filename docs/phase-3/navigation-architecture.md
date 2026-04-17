# Phase 3, Step 2 — Navigation Architecture

## What Was Done

Built the full navigation structure for both the customer and provider sides of the app. This defines every area of the app a user can move through and how screens connect to each other.

## How Navigation Works

The app has one "root" navigator that decides what to show based on who's logged in and what state they're in:

1. **Not logged in** → Auth screens (Welcome, Login, Signup, Forgot Password)
2. **Customer, hasn't completed onboarding** → Customer Onboarding flow
3. **Customer, onboarding done** → Customer main tabs (Home, Bookings, Profile)
4. **Provider, hasn't completed onboarding** → Provider Onboarding flow
5. **Provider, waiting for approval** → "Under Review" holding screen
6. **Provider, approved** → Provider main tabs (Dashboard, Jobs, Profile)

## Customer Navigation Map

```
Customer Tabs
├── Home Tab
│   ├── Home (main screen)
│   ├── Request: Event Details
│   ├── Request: Date & Time
│   ├── Request: Location
│   ├── Request: Quote
│   ├── Finding Shucker (loading/matching)
│   ├── Shucker Confirmed
│   ├── Live Tracking
│   ├── Service Complete
│   └── Rate Experience
├── Bookings Tab
│   ├── Bookings List
│   └── Booking Detail
└── Profile Tab
    ├── Profile
    ├── Edit Profile
    ├── Notification Settings
    ├── Payment Methods
    └── Support
```

## Provider Navigation Map

```
Provider Tabs
├── Dashboard Tab
│   ├── Dashboard (main screen)
│   ├── Active Job
│   ├── Job Navigation
│   ├── Job Arrived
│   ├── Job In Progress
│   ├── Job Complete
│   └── Job Summary
├── Jobs Tab
│   ├── Jobs List
│   └── Job Detail
└── Profile Tab
    ├── Profile
    ├── Edit Profile
    ├── Earnings History
    ├── Availability Settings
    └── Support
```

## Onboarding Flows

**Customer Onboarding (3 screens):**
1. Location Permission — ask for location access
2. Default Location — confirm their area on a map
3. Onboarding Complete — confirmation screen

**Provider Onboarding (5 screens):**
1. Profile Basics — name, phone, photo
2. Service Info — experience, service area, travel radius
3. Credentials — certifications, licenses
4. Location Setup — confirm home base on a map
5. Submit Profile — review and submit for approval

## Files Created

| File | Purpose |
|---|---|
| `app/src/navigation/types.ts` | All TypeScript navigation types in one place |
| `app/src/navigation/RootNavigator.tsx` | Top-level routing based on auth and onboarding state |
| `app/src/navigation/AuthStack.tsx` | Welcome, Login, Signup, Forgot Password |
| `app/src/navigation/CustomerOnboardingStack.tsx` | 3-step customer onboarding |
| `app/src/navigation/ProviderOnboardingStack.tsx` | 5-step provider onboarding |
| `app/src/navigation/CustomerTabs.tsx` | Customer tab bar with nested stacks |
| `app/src/navigation/ProviderTabs.tsx` | Provider tab bar with nested stacks |
| `app/src/screens/onboarding/*.tsx` | 9 onboarding placeholder screens |
| `app/src/screens/customer/*.tsx` | 10 customer flow placeholder screens |
| `app/src/screens/provider/*.tsx` | 8 provider flow placeholder screens |
| `app/src/screens/shared/*.tsx` | 4 shared screens (edit profile, notifications, payments, support) |

## Plain English

This step is like drawing the floor plan of a building before you start decorating the rooms. Every screen in the app now has a defined place and a route to get there. The actual screen content (forms, maps, data) gets built in later phases — but the architecture is locked in so nothing is guesswork when we get there.
