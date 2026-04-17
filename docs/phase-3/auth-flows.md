# Phase 3, Step 6 — Auth Flows

## Decision

**MVP auth method: Email and password only.**

Phone auth and social sign-in (Google, Apple) are deferred to post-launch. Email/password is the simplest to implement, doesn't require additional SDK setup (native builds for Google/Apple sign-in), and works in Expo Go for development.

## What's Built

### Signup Flow
1. User selects role ("I need a shucker" or "I am a shucker")
2. Fills in full name, email, password
3. Taps "Get Started"
4. Firebase Auth creates the account
5. Display name is set on the Firebase Auth user
6. A `users` document is created in Firestore with role, profile fields, and `onboardingComplete: false`
7. If provider role, a `providers` document is also created with approval fields
8. AuthContext picks up the new user, fetches their profile, and routes them based on role and onboarding state

### Login Flow
1. User enters email and password
2. Firebase Auth verifies credentials
3. AuthContext picks up the auth state, fetches their Firestore profile
4. RootNavigator routes them to the correct area (customer tabs, provider tabs, onboarding, or pending approval)

### Password Reset
1. User enters email
2. Firebase sends a reset link
3. Success screen confirms it was sent

### Session Persistence
- Auth session is stored in AsyncStorage via `getReactNativePersistence`
- Users stay logged in between app restarts — no need to sign in again
- On app open, AuthContext checks the persisted session and fetches the profile automatically

### Sign Out
- Clears Firebase Auth session
- Clears local profile state
- User returns to the Welcome screen

### Error Handling
| Error Code | User Message |
|---|---|
| `auth/email-already-in-use` | "An account with this email already exists" |
| `auth/weak-password` | "Password is too weak. Use at least 8 characters." |
| `auth/invalid-email` | "Please enter a valid email address" |
| `auth/invalid-credential` | "Invalid email or password" |
| `auth/user-not-found` | "No account found with this email" |
| `auth/too-many-requests` | "Too many attempts. Please try again later." |
| Other | "Something went wrong. Please try again." |

### Routing Logic (RootNavigator)
| State | Destination |
|---|---|
| Not logged in | Auth screens (Welcome → Login/Signup) |
| Customer, onboarding incomplete | Customer Onboarding flow |
| Customer, onboarding complete | Customer Tabs (Home, Bookings, Profile) |
| Provider, onboarding incomplete | Provider Onboarding flow |
| Provider, pending approval | "Under Review" holding screen |
| Provider, approved | Provider Tabs (Dashboard, Jobs, Profile) |

## Files Involved

| File | Role |
|---|---|
| `services/auth.ts` | All Firebase Auth operations (signup, login, logout, reset, profile fetch) |
| `contexts/AuthContext.tsx` | Global auth state, auto-profile fetch, sign-out handler |
| `hooks/useAuth.ts` | Hook to access auth state from any component |
| `config/firebase.ts` | Firebase initialization with AsyncStorage persistence |
| `navigation/RootNavigator.tsx` | Conditional routing based on auth + profile state |
| `screens/auth/WelcomeScreen.tsx` | Entry point — Sign In / Create Account |
| `screens/auth/SignupScreen.tsx` | Role selection + signup form |
| `screens/auth/LoginScreen.tsx` | Login form |
| `screens/auth/ForgotPasswordScreen.tsx` | Password reset form + success state |

## What's Deferred
- **Phone auth** — requires additional Firebase setup and native build for SMS
- **Google Sign-In** — requires native module and Google OAuth configuration
- **Apple Sign-In** — requires native module and Apple Developer setup
- **Email verification** — not blocking for MVP, can be added in Phase 9 polish

## Plain English

Right now, the only way into the app is email and password. That's intentional for MVP — it keeps things simple and works with our current dev setup (Expo Go). When we're ready to ship to the app stores, we can add "Sign in with Google" and "Sign in with Apple" as nice-to-haves.
