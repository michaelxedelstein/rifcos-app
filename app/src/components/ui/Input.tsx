import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  type TextInputProps,
} from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  isPassword?: boolean;
}

export function Input({
  label,
  error,
  hint,
  isPassword = false,
  style,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? Colors.error
    : focused
    ? Colors.borderFocus
    : 'transparent';

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, { borderColor }]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={Colors.textMuted}
          selectionColor={Colors.primary}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.toggle}
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.toggleText}>{showPassword ? '◉' : '◎'}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {hint && !error && <Text style={styles.hintText}>{hint}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    ...Typography.label,
    color: Colors.textSecondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceLight,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
  },
  input: {
    ...Typography.body,
    flex: 1,
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.md,
    color: Colors.text,
  },
  toggle: {
    paddingHorizontal: Spacing.md,
  },
  toggleText: {
    fontSize: 20,
    color: Colors.textMuted,
  },
  errorText: {
    ...Typography.small,
    color: Colors.error,
  },
  hintText: {
    ...Typography.small,
    color: Colors.textMuted,
  },
});
