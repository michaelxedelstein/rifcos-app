import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { CustomerTabs } from './CustomerTabs';
import { ProviderTabs } from './ProviderTabs';
import { useAuth } from '../hooks/useAuth';
import { LoadingScreen } from '../components/ui';
import { USER_ROLES } from '../constants/config';

export function RootNavigator() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Loading..." />;
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthStack />
      ) : profile?.role === USER_ROLES.PROVIDER ? (
        <ProviderTabs />
      ) : (
        <CustomerTabs />
      )}
    </NavigationContainer>
  );
}
