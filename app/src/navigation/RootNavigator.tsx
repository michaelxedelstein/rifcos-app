import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { CustomerTabs } from './CustomerTabs';
import { ProviderTabs } from './ProviderTabs';
import { type UserRole, USER_ROLES } from '../constants/config';

/**
 * Temporary auth state for the app shell.
 * Will be replaced with Firebase Auth + Firestore user role lookup in Phase 3.
 */
export function RootNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(USER_ROLES.CUSTOMER);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {userRole === USER_ROLES.CUSTOMER ? (
        <CustomerTabs onLogout={handleLogout} />
      ) : (
        <ProviderTabs onLogout={handleLogout} />
      )}
    </NavigationContainer>
  );
}
