import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

type BadgeColor = 'green' | 'yellow' | 'red' | 'blue' | 'gray';

interface BadgeProps {
  label: string;
  color?: BadgeColor;
}

const colorMap: Record<BadgeColor, { bg: string; text: string }> = {
  green: { bg: '#E8F9EE', text: Colors.success },
  yellow: { bg: '#FFF8E6', text: Colors.warningStrong },
  red: { bg: '#FFECEB', text: Colors.error },
  blue: { bg: '#EBF3FF', text: Colors.info },
  gray: { bg: Colors.surface, text: Colors.textSecondary },
};

export function Badge({ label, color = 'gray' }: BadgeProps) {
  const c = colorMap[color];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.label, { color: c.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  label: {
    ...Typography.small,
    fontWeight: '600',
  },
});
