import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabBar } from '../components/ui';
import {
  ProviderTabParamList,
  ProviderDashboardStackParamList,
  ProviderJobsStackParamList,
  ProviderProfileStackParamList,
} from './types';

import { DashboardScreen } from '../screens/provider/DashboardScreen';
import { ActiveJobScreen } from '../screens/provider/ActiveJobScreen';
import { JobNavigationScreen } from '../screens/provider/JobNavigationScreen';
import { JobArrivedScreen } from '../screens/provider/JobArrivedScreen';
import { JobInProgressScreen } from '../screens/provider/JobInProgressScreen';
import { JobCompleteScreen } from '../screens/provider/JobCompleteScreen';
import { JobSummaryScreen } from '../screens/provider/JobSummaryScreen';

import { JobsScreen } from '../screens/provider/JobsScreen';
import { JobDetailScreen } from '../screens/provider/JobDetailScreen';

import { ProfileScreen } from '../screens/shared/ProfileScreen';
import { EditProfileScreen } from '../screens/shared/EditProfileScreen';
import { EarningsScreen } from '../screens/provider/EarningsScreen';
import { AvailabilitySettingsScreen } from '../screens/provider/AvailabilitySettingsScreen';
import { SupportScreen } from '../screens/shared/SupportScreen';

// --- Dashboard Tab Stack ---
const DashboardStack = createNativeStackNavigator<ProviderDashboardStackParamList>();

function DashboardStackNavigator() {
  return (
    <DashboardStack.Navigator screenOptions={{ headerShown: false }}>
      <DashboardStack.Screen name="DashboardMain" component={DashboardScreen} />
      <DashboardStack.Screen name="ActiveJob" component={ActiveJobScreen} />
      <DashboardStack.Screen name="JobNavigation" component={JobNavigationScreen} />
      <DashboardStack.Screen name="JobArrived" component={JobArrivedScreen} />
      <DashboardStack.Screen name="JobInProgress" component={JobInProgressScreen} />
      <DashboardStack.Screen name="JobComplete" component={JobCompleteScreen} />
      <DashboardStack.Screen name="JobSummary" component={JobSummaryScreen} />
    </DashboardStack.Navigator>
  );
}

// --- Jobs Tab Stack ---
const JobsStack = createNativeStackNavigator<ProviderJobsStackParamList>();

function JobsStackNavigator() {
  return (
    <JobsStack.Navigator screenOptions={{ headerShown: false }}>
      <JobsStack.Screen name="JobsList" component={JobsScreen} />
      <JobsStack.Screen name="JobDetail" component={JobDetailScreen} />
    </JobsStack.Navigator>
  );
}

// --- Profile Tab Stack ---
const ProfileStack = createNativeStackNavigator<ProviderProfileStackParamList>();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="EarningsHistory" component={EarningsScreen} />
      <ProfileStack.Screen name="AvailabilitySettings" component={AvailabilitySettingsScreen} />
      <ProfileStack.Screen name="Support" component={SupportScreen} />
    </ProfileStack.Navigator>
  );
}

// --- Provider Tab Navigator ---
const Tab = createBottomTabNavigator<ProviderTabParamList>();

export function ProviderTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackNavigator}
        options={{ tabBarLabel: 'Dashboard' }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsStackNavigator}
        options={{ tabBarLabel: 'Jobs' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
