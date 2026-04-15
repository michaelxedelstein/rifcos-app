import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { Button } from './Button';

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorScreen({
  message = 'Something went wrong',
  onRetry,
}: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>!</Text>
      <Text style={styles.text}>{message}</Text>
      {onRetry && (
        <Button title="Try Again" onPress={onRetry} variant="secondary" size="md" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  icon: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.error,
  },
  text: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
