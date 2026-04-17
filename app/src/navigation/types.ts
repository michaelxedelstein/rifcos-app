/**
 * Central navigation type definitions for the entire app.
 * Every navigator and screen route is defined here so navigation
 * is type-safe throughout the codebase.
 */

// --- Auth (unauthenticated) ---
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

// --- Customer Onboarding (post-signup, before full access) ---
export type CustomerOnboardingParamList = {
  LocationPermission: undefined;
  DefaultLocation: undefined;
  OnboardingComplete: undefined;
};

// --- Provider Onboarding (post-signup, before approval) ---
export type ProviderOnboardingParamList = {
  ProfileBasics: undefined;
  ServiceInfo: undefined;
  Credentials: undefined;
  LocationSetup: undefined;
  SubmitProfile: undefined;
};

// --- Customer Tab Screens ---

export type CustomerHomeStackParamList = {
  HomeMain: undefined;
  RequestEventDetails: undefined;
  RequestDateTime: undefined;
  RequestLocation: undefined;
  RequestQuote: { requestId: string };
  FindingShucker: { requestId: string };
  ShuckerConfirmed: { jobId: string };
  LiveTracking: { jobId: string };
  ServiceComplete: { jobId: string };
  RateExperience: { jobId: string };
};

export type CustomerBookingsStackParamList = {
  BookingsList: undefined;
  BookingDetail: { requestId: string };
};

export type CustomerProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  NotificationSettings: undefined;
  PaymentMethods: undefined;
  Support: undefined;
};

export type CustomerTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Profile: undefined;
};

// --- Provider Tab Screens ---

export type ProviderDashboardStackParamList = {
  DashboardMain: undefined;
  ActiveJob: { jobId: string };
  JobNavigation: { jobId: string };
  JobArrived: { jobId: string };
  JobInProgress: { jobId: string };
  JobComplete: { jobId: string };
  JobSummary: { jobId: string };
};

export type ProviderJobsStackParamList = {
  JobsList: undefined;
  JobDetail: { jobId: string };
};

export type ProviderProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  EarningsHistory: undefined;
  AvailabilitySettings: undefined;
  Support: undefined;
};

export type ProviderTabParamList = {
  Dashboard: undefined;
  Jobs: undefined;
  Profile: undefined;
};
