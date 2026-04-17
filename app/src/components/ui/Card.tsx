import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
  style?: ViewStyle;
}

export function Card({ children, variant = 'default', style }: CardProps) {
  return (
    <View style={[styles.card, variant === 'elevated' && styles.elevated, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  elevated: {
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});
