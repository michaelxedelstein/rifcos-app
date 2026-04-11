export const APP_NAME = 'RIFCOS';
export const LAUNCH_CATEGORY = 'oyster-shucker';
export const LAUNCH_CATEGORY_DISPLAY = 'Oyster Shucker';

export const USER_ROLES = {
  CUSTOMER: 'customer',
  PROVIDER: 'provider',
  ADMIN: 'admin',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
