/**
 * RIFCOS Design System — "Deep Navy · Pearl Gold · Ocean Blue"
 * Extracted from v1.0 component library mockups.
 */

export const Colors = {
  // Core backgrounds
  background: '#0E1B2E',
  backgroundLight: '#121F33',
  surface: '#162236',
  surfaceLight: '#1A2840',
  surfaceHighlight: '#1E3048',

  // Borders
  border: '#1E2F47',
  borderLight: '#2A3F5A',
  borderFocus: '#C9A84C',

  // Primary — Pearl Gold
  primary: '#C9A84C',
  primaryDark: '#A88A3A',
  primaryLight: '#D4B85C',
  primaryMuted: 'rgba(201, 168, 76, 0.12)',

  // Accent — Ocean Blue
  accent: '#3B82F6',
  accentLight: '#60A5FA',

  // Text
  text: '#FFFFFF',
  textSecondary: '#8B9DB5',
  textMuted: '#4A5B73',
  textDark: '#0E1B2E',
  textGold: '#C9A84C',

  // Status
  success: '#22C55E',
  successBg: 'rgba(34, 197, 94, 0.12)',
  warning: '#F97316',
  warningBg: 'rgba(249, 115, 22, 0.12)',
  error: '#EF4444',
  errorBg: 'rgba(239, 68, 68, 0.12)',
  info: '#3B82F6',
  infoBg: 'rgba(59, 130, 246, 0.12)',

  // Misc
  overlay: 'rgba(0, 0, 0, 0.6)',
  tabBarBg: 'rgba(14, 27, 46, 0.95)',
  badgeRed: '#EF4444',
  inactive: '#6B7B8F',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  captionBold: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700' as const,
    lineHeight: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '400' as const,
    lineHeight: 14,
  },
  tabLabelActive: {
    fontSize: 10,
    fontWeight: '600' as const,
    lineHeight: 14,
  },
} as const;
