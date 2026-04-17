import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStack } from './AuthStack';
import { CustomerOnboardingStack } from './CustomerOnboardingStack';
import { ProviderOnboardingStack } from './ProviderOnboardingStack';
import { CustomerTabs } from './CustomerTabs';
import { ProviderTabs } from './ProviderTabs';
import { ProviderPendingApprovalScreen } from '../screens/onboarding/ProviderPendingApprovalScreen';
import { useAuth } from '../hooks/useAuth';
import { LoadingScreen } from '../components/ui';
import { USER_ROLES } from '../constants/config';

export function RootNavigator() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Loading..." />;
  }

  if (!user) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  }

  const role = profile?.role;
  const onboardingComplete = profile?.onboardingComplete === true;

  if (role === USER_ROLES.PROVIDER) {
    const accountStatus = profile?.accountStatus;

    if (!onboardingComplete) {
      return (
        <NavigationContainer>
          <ProviderOnboardingStack />
        </NavigationContainer>
      );
    }

    if (accountStatus === 'pending_approval') {
      return (
        <NavigationContainer>
          <ProviderPendingApprovalScreen />
        </NavigationContainer>
      );
    }

    return (
      <NavigationContainer>
        <ProviderTabs />
      </NavigationContainer>
    );
  }

  // Customer flow
  if (!onboardingComplete) {
    return (
      <NavigationContainer>
        <CustomerOnboardingStack />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <CustomerTabs />
    </NavigationContainer>
  );
}
