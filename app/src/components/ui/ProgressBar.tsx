import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../constants/theme';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={[
            styles.segment,
            i < current ? styles.active : styles.inactive,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  segment: {
    flex: 1,
    height: 3,
    borderRadius: BorderRadius.full,
  },
  active: {
    backgroundColor: Colors.primary,
  },
  inactive: {
    backgroundColor: Colors.border,
  },
});
