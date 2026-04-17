import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  type ViewStyle,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'lg',
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.textDark : Colors.primary}
        />
      ) : (
        <Text style={[styles.text, styles[`text_${variant}`]]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.lg,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: Colors.errorBg,
  },
  size_sm: {
    paddingVertical: Spacing.xs + 2,
    paddingHorizontal: Spacing.md,
  },
  size_md: {
    paddingVertical: Spacing.sm + 2,
    paddingHorizontal: Spacing.lg,
  },
  size_lg: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 52,
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    ...Typography.bodyBold,
  },
  text_primary: {
    color: Colors.textDark,
  },
  text_secondary: {
    color: Colors.text,
  },
  text_ghost: {
    color: Colors.primary,
  },
  text_danger: {
    color: Colors.error,
  },
});
