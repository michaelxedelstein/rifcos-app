import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

interface ToastProps {
  message: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

const typeConfig = {
  success: { border: Colors.success, icon: '✓', iconColor: Colors.success },
  error: { border: Colors.error, icon: '✕', iconColor: Colors.error },
  info: { border: Colors.info, icon: 'ⓘ', iconColor: Colors.info },
};

export function Toast({
  message,
  description,
  type = 'info',
  visible,
  onDismiss,
  duration = 4000,
}: ToastProps) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const config = typeConfig[type];

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
        Animated.delay(duration),
        Animated.timing(translateY, {
          toValue: -100,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => onDismiss());
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { borderLeftColor: config.border, transform: [{ translateY }] },
      ]}
    >
      <View style={[styles.iconCircle, { borderColor: config.border }]}>
        <Text style={[styles.icon, { color: config.iconColor }]}>
          {config.icon}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.message}>{message}</Text>
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 2,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 4,
    padding: Spacing.md,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  message: {
    ...Typography.captionBold,
    color: Colors.text,
  },
  description: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
