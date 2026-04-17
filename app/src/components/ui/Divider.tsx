import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';

interface DividerProps {
  label?: string;
}

export function Divider({ label }: DividerProps) {
  if (label) {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.line} />
        <Text style={styles.label}>{label}</Text>
        <View style={styles.line} />
      </View>
    );
  }

  return <View style={styles.simple} />;
}

const styles = StyleSheet.create({
  simple: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
    gap: Spacing.sm + 4,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  label: {
    ...Typography.small,
    color: Colors.textMuted,
  },
});
