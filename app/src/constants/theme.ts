export const Colors = {
  primary: '#1A1A2E',
  primaryLight: '#2D2D44',
  accent: '#E94560',
  accentLight: '#FF6B81',
  background: '#FFFFFF',
  backgroundDark: '#0A0A0A',
  surface: '#F5F5F7',
  surfaceDark: '#1C1C1E',
  text: '#1A1A2E',
  textSecondary: '#6E6E80',
  textLight: '#FFFFFF',
  textMuted: '#9E9EB0',
  border: '#E5E5EA',
  borderDark: '#2C2C2E',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  info: '#007AFF',
  warningStrong: '#FF6B00',
  gold: '#D4A017',
  overlay: 'rgba(0, 0, 0, 0.5)',
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
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
} as const;
