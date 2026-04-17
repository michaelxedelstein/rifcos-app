import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { Button } from './Button';

interface ErrorScreenProps {
  message?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorScreen({
  message = 'Something went wrong',
  description = "We couldn't connect to the RIFCOS network. Check your connection and try again.",
  onRetry,
}: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>⚠</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.description}>{description}</Text>
        {onRetry && (
          <Button
            title="↻  Try Again"
            onPress={onRetry}
            variant="secondary"
            size="md"
            style={{ marginTop: Spacing.md, borderColor: Colors.primary }}
          />
        )}
      </View>
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
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.errorBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  icon: {
    fontSize: 24,
    color: Colors.error,
  },
  message: {
    ...Typography.bodyBold,
    color: Colors.text,
    textAlign: 'center',
  },
  description: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
});
