import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabBar } from '../components/ui';
import {
  CustomerTabParamList,
  CustomerHomeStackParamList,
  CustomerBookingsStackParamList,
  CustomerProfileStackParamList,
} from './types';

import { HomeScreen } from '../screens/customer/HomeScreen';
import { RequestEventDetailsScreen } from '../screens/customer/RequestEventDetailsScreen';
import { RequestDateTimeScreen } from '../screens/customer/RequestDateTimeScreen';
import { RequestLocationScreen } from '../screens/customer/RequestLocationScreen';
import { RequestQuoteScreen } from '../screens/customer/RequestQuoteScreen';
import { FindingShuckerScreen } from '../screens/customer/FindingShuckerScreen';
import { ShuckerConfirmedScreen } from '../screens/customer/ShuckerConfirmedScreen';
import { LiveTrackingScreen } from '../screens/customer/LiveTrackingScreen';
import { ServiceCompleteScreen } from '../screens/customer/ServiceCompleteScreen';
import { RateExperienceScreen } from '../screens/customer/RateExperienceScreen';

import { BookingsScreen } from '../screens/customer/BookingsScreen';
import { BookingDetailScreen } from '../screens/customer/BookingDetailScreen';

import { ProfileScreen } from '../screens/shared/ProfileScreen';
import { EditProfileScreen } from '../screens/shared/EditProfileScreen';
import { NotificationSettingsScreen } from '../screens/shared/NotificationSettingsScreen';
import { PaymentMethodsScreen } from '../screens/shared/PaymentMethodsScreen';
import { SupportScreen } from '../screens/shared/SupportScreen';

// --- Home Tab Stack ---
const HomeStack = createNativeStackNavigator<CustomerHomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen name="RequestEventDetails" component={RequestEventDetailsScreen} />
      <HomeStack.Screen name="RequestDateTime" component={RequestDateTimeScreen} />
      <HomeStack.Screen name="RequestLocation" component={RequestLocationScreen} />
      <HomeStack.Screen name="RequestQuote" component={RequestQuoteScreen} />
      <HomeStack.Screen name="FindingShucker" component={FindingShuckerScreen} />
      <HomeStack.Screen name="ShuckerConfirmed" component={ShuckerConfirmedScreen} />
      <HomeStack.Screen name="LiveTracking" component={LiveTrackingScreen} />
      <HomeStack.Screen name="ServiceComplete" component={ServiceCompleteScreen} />
      <HomeStack.Screen name="RateExperience" component={RateExperienceScreen} />
    </HomeStack.Navigator>
  );
}

// --- Bookings Tab Stack ---
const BookingsStack = createNativeStackNavigator<CustomerBookingsStackParamList>();

function BookingsStackNavigator() {
  return (
    <BookingsStack.Navigator screenOptions={{ headerShown: false }}>
      <BookingsStack.Screen name="BookingsList" component={BookingsScreen} />
      <BookingsStack.Screen name="BookingDetail" component={BookingDetailScreen} />
    </BookingsStack.Navigator>
  );
}

// --- Profile Tab Stack ---
const ProfileStack = createNativeStackNavigator<CustomerProfileStackParamList>();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
      <ProfileStack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <ProfileStack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <ProfileStack.Screen name="Support" component={SupportScreen} />
    </ProfileStack.Navigator>
  );
}

// --- Customer Tab Navigator ---
const Tab = createBottomTabNavigator<CustomerTabParamList>();

export function CustomerTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsStackNavigator}
        options={{ tabBarLabel: 'Bookings' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}
