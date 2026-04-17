import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/theme';

interface LoadingScreenProps {
  message?: string;
  subtitle?: string;
}

export function LoadingScreen({
  message = 'Loading',
  subtitle = 'Finding your perfect shucker...',
}: LoadingScreenProps) {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Text style={styles.icon}>≋</Text>
          <Animated.View
            style={[styles.ring, { transform: [{ rotate: spin }] }]}
          />
        </View>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
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
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  icon: {
    fontSize: 28,
    color: Colors.primary,
  },
  ring: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2.5,
    borderColor: 'transparent',
    borderTopColor: Colors.primary,
    borderRightColor: Colors.primaryMuted,
  },
  message: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
    marginTop: Spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textMuted,
  },
  dotActive: {
    backgroundColor: Colors.primary,
  },
});
