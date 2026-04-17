import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

type BadgeVariant = 'dot' | 'pill';
type BadgeColor = 'green' | 'yellow' | 'red' | 'blue' | 'gray' | 'gold';

interface BadgeProps {
  label: string;
  color?: BadgeColor;
  variant?: BadgeVariant;
}

const dotColorMap: Record<BadgeColor, string> = {
  green: Colors.success,
  yellow: Colors.warning,
  red: Colors.error,
  blue: Colors.info,
  gray: Colors.inactive,
  gold: Colors.primary,
};

const pillColorMap: Record<BadgeColor, { bg: string; text: string }> = {
  green: { bg: Colors.successBg, text: Colors.success },
  yellow: { bg: Colors.warningBg, text: Colors.warning },
  red: { bg: Colors.errorBg, text: Colors.error },
  blue: { bg: Colors.infoBg, text: Colors.info },
  gray: { bg: Colors.surface, text: Colors.textSecondary },
  gold: { bg: Colors.primaryMuted, text: Colors.primary },
};

export function Badge({ label, color = 'gray', variant = 'dot' }: BadgeProps) {
  if (variant === 'pill') {
    const c = pillColorMap[color];
    return (
      <View style={[styles.pill, { backgroundColor: c.bg }]}>
        <Text style={[styles.pillText, { color: c.text }]}>{label}</Text>
      </View>
    );
  }

  return (
    <View style={styles.dotContainer}>
      <View style={[styles.dot, { backgroundColor: dotColorMap[color] }]} />
      <Text style={styles.dotLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotLabel: {
    ...Typography.small,
    fontWeight: '500',
    color: Colors.text,
  },
  pill: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: 3,
    borderRadius: BorderRadius.sm,
    alignSelf: 'flex-start',
  },
  pillText: {
    ...Typography.small,
    fontWeight: '600',
  },
});
