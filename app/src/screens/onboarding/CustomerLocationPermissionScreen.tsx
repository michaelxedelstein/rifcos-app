import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { Colors, Typography, Spacing } from '../../constants/theme';
import { Button } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../config/firebase';

export function CustomerLocationPermissionScreen() {
  const { user, refreshProfile } = useAuth();

  const handleSkip = async () => {
    if (!user) return;
    await updateDoc(doc(db, 'users', user.uid), {
      onboardingComplete: true,
    });
    await refreshProfile();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>📍</Text>
        <Text style={styles.title}>Enable Location</Text>
        <Text style={styles.subtitle}>
          RIFCOS needs your location to find oyster shuckers near you
        </Text>
      </View>

      <View style={styles.actions}>
        <Button title="Allow Location" onPress={handleSkip} />
        <Button title="Skip for now" variant="ghost" onPress={handleSkip} />
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
    paddingTop: 120,
    paddingBottom: 60,
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 48,
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
    maxWidth: 280,
  },
  actions: {
    gap: Spacing.md,
  },
});
