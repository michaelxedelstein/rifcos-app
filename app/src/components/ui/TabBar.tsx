import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Colors, Typography, Spacing } from '../../constants/theme';

const TAB_ICONS: Record<string, { default: string; active: string }> = {
  Home: { default: '⌂', active: '⌂' },
  Bookings: { default: '☐', active: '☐' },
  Profile: { default: '☻', active: '☻' },
  Dashboard: { default: '⊞', active: '⊞' },
  Jobs: { default: '☰', active: '☰' },
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, Spacing.sm) },
      ]}
    >
      <View style={styles.border} />
      <View style={styles.tabs}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = (options.tabBarLabel ?? route.name) as string;
          const isFocused = state.index === index;
          const icons = TAB_ICONS[route.name] || { default: '•', active: '•' };

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tab}
              onPress={onPress}
              activeOpacity={0.7}
            >
              {isFocused && <View style={styles.activeIndicator} />}
              <View
                style={[
                  styles.iconWrap,
                  isFocused && styles.iconWrapActive,
                ]}
              >
                <Text
                  style={[
                    styles.icon,
                    { color: isFocused ? Colors.primary : Colors.inactive },
                  ]}
                >
                  {isFocused ? icons.active : icons.default}
                </Text>
              </View>
              <Text
                style={[
                  isFocused ? styles.labelActive : styles.label,
                  { color: isFocused ? Colors.primary : Colors.inactive },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.tabBarBg,
    paddingTop: Spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  border: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.border,
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.xs,
    gap: 2,
  },
  activeIndicator: {
    position: 'absolute',
    top: -Spacing.sm,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  iconWrap: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  iconWrapActive: {
    backgroundColor: Colors.primaryMuted,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    ...Typography.tabLabel,
    color: Colors.inactive,
  },
  labelActive: {
    ...Typography.tabLabelActive,
    color: Colors.primary,
  },
});
