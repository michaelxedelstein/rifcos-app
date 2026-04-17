# RIFCOS — UI Design Prompts for AI Builder

> Use these prompts in Figma AI, v0, or any AI design tool to generate mockups for every screen in the RIFCOS app.
>
> **Prefix for React Native output:** Add this to the beginning of any prompt if the tool supports React Native:
> "Build this for React Native (Expo) using TypeScript. Use View, Text, TouchableOpacity, and StyleSheet from react-native — no HTML, no CSS classes, no Tailwind. All styling should use StyleSheet.create(). Use inline hex colors for now."
>
> If the tool only supports web, just use the prompts as-is for visual design reference.

---

## 1. Design System / Component Library

Design a mobile app component library for "RIFCOS," an on-demand oyster shucker booking app. Include: primary button (filled), secondary button (outlined), ghost button, text input with label and error state, password input with show/hide toggle, card component, badge component (green/yellow/red/blue/gray variants), avatar component (photo or initials fallback), loading spinner screen, error screen with retry button, toast notification (success/error/info), and a horizontal divider. The app should feel premium and clean. Show all components on one canvas so I can compare styles. Mobile-first, iPhone sized.

---

## 2. Welcome Screen

Design a mobile welcome screen for "RIFCOS," an on-demand oyster shucker app. Dark background. Large brand name "RIFCOS" centered near the top with generous letter spacing. Tagline below: "Request an Oyster Shucker for your next event." Two buttons at the bottom: "Sign In" (primary filled) and "Create Account" (secondary outlined). Clean, premium, minimal. No illustrations or icons. iPhone sized.

---

## 3. Sign Up Screen

Design a mobile sign up screen. Light background. Title: "Create account." Subtitle: "Choose how you want to use RIFCOS." Two role selector cards side by side: "I need a shucker" and "I am a shucker" — the selected one has a colored border and tinted background. Below: three form fields — Full name, Email, Password (with show/hide toggle). "Get Started" button at the bottom. Include an error message area between the form and button. iPhone sized.

---

## 4. Login Screen

Design a mobile login screen. Light background. Title: "Welcome back." Subtitle: "Sign in to your account." Two form fields: Email and Password (with show/hide toggle). A "Forgot password?" link aligned right below the password field. "Sign In" button at the bottom. Error message area above the button. iPhone sized.

---

## 5. Forgot Password Screen

Design a mobile forgot password screen. Light background. Title: "Reset password." Subtitle: "Enter your email and we'll send you a reset link." One email input field. "Send Reset Link" button at the bottom. Also design a success state: centered envelope icon, title "Check your email," and message "We sent a password reset link to you@example.com." iPhone sized.

---

## 6. Customer Onboarding — Location Permission

Design a mobile onboarding screen for requesting location access. Light background. Illustration or icon of a map pin at the top. Title: "Enable Location." Subtitle: "RIFCOS needs your location to find oyster shuckers near you." "Allow Location" primary button at the bottom. "Skip for now" text link below. Progress indicator showing step 1 of 3. iPhone sized.

---

## 7. Customer Onboarding — Default Location

Design a mobile onboarding screen for confirming the user's default location. A map takes up the top 60% of the screen with a draggable pin. Below the map: an address text field (pre-filled, editable), and a "Confirm Location" button. Progress indicator showing step 2 of 3. iPhone sized.

---

## 8. Customer Onboarding — Complete

Design a mobile onboarding completion screen. Light background. Checkmark icon or celebratory illustration at center. Title: "You're All Set!" Subtitle: "Start browsing and request an oyster shucker for your next event." "Get Started" primary button at the bottom. Progress indicator showing step 3 of 3. iPhone sized.

---

## 9. Provider Onboarding — Profile Basics

Design a mobile provider onboarding screen. Title: "Tell us about yourself." Fields: Full name (pre-filled), Phone number, and a profile photo upload area (circle with camera icon, tap to upload). "Continue" button at bottom. Progress bar showing step 1 of 5. iPhone sized.

---

## 10. Provider Onboarding — Service Info

Design a mobile provider onboarding screen. Title: "Your shucking experience." Fields: Years of experience (number input), General service area (city/region text input), Travel radius in miles (slider or dropdown). "Continue" button at bottom. Progress bar showing step 2 of 5. iPhone sized.

---

## 11. Provider Onboarding — Credentials

Design a mobile provider onboarding screen. Title: "Credentials & Certifications." Fields: Food handler certification (yes/no toggle), Certification details (text input, shown if yes), Other licenses (text input, optional), Additional notes about experience (multi-line text area). "Continue" button at bottom. Progress bar showing step 3 of 5. iPhone sized.

---

## 12. Provider Onboarding — Location Setup

Design a mobile provider onboarding screen. Title: "Set your home base." A map taking up the top 60% of the screen with a draggable pin. Below: address field (pre-filled, editable). Subtitle: "We use this to match you with nearby jobs." "Continue" button at bottom. Progress bar showing step 4 of 5. iPhone sized.

---

## 13. Provider Onboarding — Submit Profile

Design a mobile provider onboarding review screen. Title: "Review & Submit." Show a summary card with all the info they entered: name, phone, experience, service area, radius, certifications, home base. Each section is a compact row. "Submit for Approval" primary button at the bottom. "Edit" text links next to each section. Progress bar showing step 5 of 5. iPhone sized.

---

## 14. Provider — Pending Approval

Design a mobile holding/waiting screen. Light background. Clock or hourglass icon centered. Title: "Application Under Review." Subtitle: "We're reviewing your profile. You'll get a notification when you're approved." No action buttons — just a "Contact Support" text link at the bottom. iPhone sized.

---

## 15. Customer Home Screen

Design a mobile home screen for an on-demand oyster shucker app. Top area: greeting "Hi, [Name]" with the user's avatar. Main content: one large card — "Request an Oyster Shucker" with a brief description "Fresh shucked oysters at your next event" and a right-arrow or "Book Now" button. Below: a section for any active booking (show a card with status badge "En Route" and provider name, or show empty state "No active bookings"). Bottom tab bar with three tabs: Home, Bookings, Profile. iPhone sized.

---

## 16. Request — Event Details

Design a mobile form screen for booking an oyster shucker. Title: "Event Details." Fields: Estimated guest count (stepper or dropdown), Type of event (segmented buttons or dropdown: Party, Wedding, Corporate, Other), Special notes (optional multi-line text). "Continue" button at the bottom. Step indicator showing step 1 of 3. iPhone sized.

---

## 17. Request — Date & Time

Design a mobile date and time picker screen. Title: "When is your event?" A calendar date picker component. Below: a time picker. If the selected date is today and less than 6 hours away, show a yellow warning note: "Same-day requests may have limited availability." "Continue" button at the bottom. Step indicator showing step 2 of 3. iPhone sized.

---

## 18. Request — Location

Design a mobile location selection screen. Title: "Event Location." A map taking up the top half with a pin on the user's default location. Below: a search bar for address, the confirmed address displayed, and a "Confirm Location" button. Step indicator showing step 3 of 3. iPhone sized.

---

## 19. Quote Screen

Design a mobile pricing quote screen for an on-demand service. Large prominent total price at the top (e.g. "$185"). Below: a breakdown card showing Base Fee, Distance, Time, and any Surge as line items. If surge is active, show an orange banner: "High demand — prices are elevated." Two buttons at the bottom: "Confirm Booking" (primary) and "Modify Request" (text link). iPhone sized.

---

## 20. Finding Shucker Screen

Design a mobile waiting/loading screen. Centered animated dots or pulsing circle animation. Title: "Finding your shucker..." Subtitle: "We're matching you with the best available shucker nearby." No buttons — just a "Cancel Request" text link at the bottom. iPhone sized.

---

## 21. Shucker Confirmed Screen

Design a mobile confirmation screen. Checkmark animation or icon at top. Title: "Your Shucker is Confirmed!" Card below showing: provider's avatar, name, star rating, and a summary of the job (date, time, location, guest count). "View Details" button. iPhone sized.

---

## 22. Live Tracking Screen

Design a mobile live tracking screen for an on-demand service. Full-width map showing a route line from the provider's location to the customer's event location, with a moving provider icon. Below the map: a status bar showing "Your shucker is on the way" with an ETA. Provider card showing their avatar, name, and a "Contact" button. A "Cancel" text link. iPhone sized.

---

## 23. Service Complete Screen

Design a mobile completion screen. Celebration icon or confetti illustration. Title: "Experience Complete!" Summary card: provider name, service duration, final charge amount. "Rate Your Experience" primary button. iPhone sized.

---

## 24. Rate Experience Screen

Design a mobile rating screen. Title: "How was your experience?" Provider avatar and name at top. Five-star rating selector (tap to select 1-5 stars). Below: optional text review field (multi-line, placeholder "Tell us more..."). "Submit Review" primary button. "Skip" text link. iPhone sized.

---

## 25. Bookings List Screen

Design a mobile bookings/history list screen. Title: "Your Bookings." Tab bar or toggle at top: "Upcoming" and "Past." Each booking is a card showing: date, time, status badge (Confirmed, En Route, Completed, Cancelled), provider name, and location snippet. Empty state: illustration with "No bookings yet — request your first shucker!" Bottom tab bar visible. iPhone sized.

---

## 26. Booking Detail Screen

Design a mobile booking detail screen. Back arrow at top. Status badge prominently displayed (e.g. "Completed" in green). Sections: Event Details (date, time, location, guest count, event type), Provider Info (avatar, name, rating), Pricing Breakdown (base fee, distance, time, surge, total), and a "Rebook" button if the booking is past. iPhone sized.

---

## 27. Customer Profile Screen

Design a mobile profile screen. Top area: user's avatar (large), full name, email, and role badge ("Customer"). Below: menu list with rows for Edit Profile, Notifications, Payment Methods, and Support — each row has the label and a right chevron. "Sign Out" button at the very bottom (ghost/text style, red). Bottom tab bar visible. iPhone sized.

---

## 28. Edit Profile Screen

Design a mobile edit profile screen. Back arrow. User's avatar at top with a "Change Photo" button overlay. Fields: Full name, Email (read-only/grayed), Phone number. "Save Changes" primary button at the bottom. iPhone sized.

---

## 29. Provider Dashboard

Design a mobile provider dashboard for an on-demand service app. Top area: greeting "Hi, [Name]" with avatar. Prominent online/offline toggle (large, clearly showing current state — green for online, gray for offline). Stats cards below: "Today's Jobs" (number), "Rating" (stars + number), "Total Earnings" (dollar amount). If online: a section showing "Waiting for requests..." with a subtle pulse animation. If there's an active job, show a card with job status, customer name, and time. Bottom tab bar: Dashboard, Jobs, Profile. iPhone sized.

---

## 30. Incoming Request Screen

Design a mobile incoming request notification/screen for a provider. Should feel urgent and time-sensitive. Card or modal showing: "New Request!" at top, customer's event distance (e.g. "3.2 miles away"), event date and time, estimated payout (e.g. "$185"), and a countdown timer bar (e.g. 60 seconds). Two large buttons: "Accept" (green/primary) and "Decline" (outlined/gray). iPhone sized.

---

## 31. Active Job Detail Screen

Design a mobile job detail screen for a provider who just accepted a job. Sections: Customer name, Event address (with small map preview), Date and time, Guest count and event type, Special notes from customer. Large "Start Navigation" button at the bottom. Back arrow to dashboard. iPhone sized.

---

## 32. Job Navigation Screen

Design a mobile navigation screen. Full-screen map showing the route from the provider to the customer's location with turn-by-turn-style route line. Bottom bar: ETA, distance remaining, and an "I've Arrived" button. iPhone sized.

---

## 33. Job Arrived Screen

Design a mobile screen for a provider who has arrived at the location. Status: "You've arrived at the event." Customer name and address displayed. "Start Service" large primary button. iPhone sized.

---

## 34. Job In Progress Screen

Design a mobile screen showing an active service session. Status: "Service In Progress." A running timer showing elapsed time (e.g. "01:23:45"). Customer name and event details visible. "Complete Job" button at the bottom. iPhone sized.

---

## 35. Job Complete / Summary Screen

Design a mobile job completion summary screen. Title: "Job Complete!" Summary card: customer name, service duration, earnings for this job. "Back to Dashboard" button. Subtle celebration element. iPhone sized.

---

## 36. Provider Jobs List

Design a mobile past jobs list screen. Title: "Your Jobs." Toggle: "Upcoming" and "Completed." Each job card: date, time, customer name, location, earnings amount, and status badge. Empty state: "No jobs yet — go online to start receiving requests!" Bottom tab bar visible. iPhone sized.

---

## 37. Provider Profile Screen

Design a mobile provider profile screen. Top: avatar (large), name, email, role badge ("Oyster Shucker"), star rating. Menu list: Edit Profile, Earnings History, Availability Settings, Support. "Sign Out" at bottom. Bottom tab bar visible. iPhone sized.

---

## 38. Earnings History Screen

Design a mobile earnings screen for a provider. Title: "Earnings." Summary card at top: This Week, This Month, All Time earnings. Below: a list of individual job payouts with date, customer name, and amount. iPhone sized.
