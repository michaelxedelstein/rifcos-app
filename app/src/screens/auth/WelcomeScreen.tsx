import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { APP_NAME, LAUNCH_CATEGORY_DISPLAY } from '../../constants/config';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.brand}>{APP_NAME}</Text>
        <Text style={styles.tagline}>
          Request an {LAUNCH_CATEGORY_DISPLAY} for your next event
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundDark,
    justifyContent: 'space-between',
    padding: Spacing.lg,
    paddingTop: 120,
    paddingBottom: 60,
  },
  hero: {
    alignItems: 'center',
  },
  brand: {
    ...Typography.h1,
    color: Colors.textLight,
    fontSize: 48,
    lineHeight: 58,
    letterSpacing: 4,
  },
  tagline: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
    maxWidth: 280,
  },
  actions: {
    gap: Spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...Typography.bodyBold,
    color: Colors.textLight,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.textMuted,
  },
  secondaryButtonText: {
    ...Typography.bodyBold,
    color: Colors.textLight,
  },
});
