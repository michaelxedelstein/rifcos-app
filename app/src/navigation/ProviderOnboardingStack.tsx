import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProviderOnboardingParamList } from './types';
import { ProviderProfileBasicsScreen } from '../screens/onboarding/ProviderProfileBasicsScreen';
import { ProviderServiceInfoScreen } from '../screens/onboarding/ProviderServiceInfoScreen';
import { ProviderCredentialsScreen } from '../screens/onboarding/ProviderCredentialsScreen';
import { ProviderLocationSetupScreen } from '../screens/onboarding/ProviderLocationSetupScreen';
import { ProviderSubmitProfileScreen } from '../screens/onboarding/ProviderSubmitProfileScreen';

const Stack = createNativeStackNavigator<ProviderOnboardingParamList>();

export function ProviderOnboardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="ProfileBasics" component={ProviderProfileBasicsScreen} />
      <Stack.Screen name="ServiceInfo" component={ProviderServiceInfoScreen} />
      <Stack.Screen name="Credentials" component={ProviderCredentialsScreen} />
      <Stack.Screen name="LocationSetup" component={ProviderLocationSetupScreen} />
      <Stack.Screen name="SubmitProfile" component={ProviderSubmitProfileScreen} />
    </Stack.Navigator>
  );
}
