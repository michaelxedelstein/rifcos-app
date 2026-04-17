import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors } from '../../constants/theme';

interface AvatarProps {
  photoUrl?: string | null;
  name?: string | null;
  size?: number;
  showOnlineIndicator?: boolean;
  online?: boolean;
}

const fallbackColors = [
  '#22C55E',
  '#3B82F6',
  '#F97316',
  '#EF4444',
  '#A855F7',
  '#EC4899',
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return fallbackColors[Math.abs(hash) % fallbackColors.length];
}

export function Avatar({
  photoUrl,
  name,
  size = 48,
  showOnlineIndicator = false,
  online = false,
}: AvatarProps) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  const bgColor = name ? getColorFromName(name) : Colors.textMuted;
  const indicatorSize = Math.max(12, size * 0.22);

  return (
    <View style={{ width: size, height: size }}>
      {photoUrl ? (
        <Image
          source={{ uri: photoUrl }}
          style={[
            styles.image,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: bgColor,
            },
          ]}
        >
          <Text style={[styles.initials, { fontSize: size * 0.36 }]}>
            {initials}
          </Text>
        </View>
      )}
      {showOnlineIndicator && (
        <View
          style={[
            styles.indicator,
            {
              width: indicatorSize,
              height: indicatorSize,
              borderRadius: indicatorSize / 2,
              backgroundColor: online ? Colors.success : Colors.inactive,
              borderWidth: 2,
              borderColor: Colors.background,
              bottom: 0,
              right: 0,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.surface,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
  },
});
