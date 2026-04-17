import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerOnboardingParamList } from './types';
import { CustomerLocationPermissionScreen } from '../screens/onboarding/CustomerLocationPermissionScreen';
import { CustomerDefaultLocationScreen } from '../screens/onboarding/CustomerDefaultLocationScreen';
import { CustomerOnboardingCompleteScreen } from '../screens/onboarding/CustomerOnboardingCompleteScreen';

const Stack = createNativeStackNavigator<CustomerOnboardingParamList>();

export function CustomerOnboardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="LocationPermission"
        component={CustomerLocationPermissionScreen}
      />
      <Stack.Screen
        name="DefaultLocation"
        component={CustomerDefaultLocationScreen}
      />
      <Stack.Screen
        name="OnboardingComplete"
        component={CustomerOnboardingCompleteScreen}
      />
    </Stack.Navigator>
  );
}
