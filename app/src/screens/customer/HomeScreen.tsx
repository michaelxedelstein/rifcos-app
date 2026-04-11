import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { LAUNCH_CATEGORY_DISPLAY } from '../../constants/config';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>What's the occasion?</Text>

      <TouchableOpacity style={styles.requestCard}>
        <Text style={styles.cardEmoji}>🦪</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Request a {LAUNCH_CATEGORY_DISPLAY}</Text>
          <Text style={styles.cardSubtitle}>
            Fresh shucked oysters at your next event
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
    paddingTop: 80,
  },
  greeting: {
    ...Typography.h1,
    color: Colors.text,
    marginBottom: Spacing.xl,
  },
  requestCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  cardEmoji: {
    fontSize: 40,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    ...Typography.h3,
    color: Colors.text,
  },
  cardSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});
