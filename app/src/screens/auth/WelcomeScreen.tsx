import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { APP_NAME, LAUNCH_CATEGORY_DISPLAY } from '../../constants/config';
import { Button } from '../../components/ui';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.brandIcon}>≋</Text>
        <Text style={styles.brand}>{APP_NAME}</Text>
        <Text style={styles.tagline}>
          Request an {LAUNCH_CATEGORY_DISPLAY} for your next event
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          title="Sign In"
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          title="Create Account"
          variant="secondary"
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
    padding: Spacing.lg,
    paddingTop: 160,
    paddingBottom: 60,
  },
  hero: {
    alignItems: 'center',
  },
  brandIcon: {
    fontSize: 36,
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  brand: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: 6,
    lineHeight: 52,
  },
  tagline: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.md,
    maxWidth: 280,
  },
  actions: {
    gap: Spacing.md,
  },
});
