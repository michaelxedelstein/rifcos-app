import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';
import { Avatar, Badge, Divider, Button } from '../../components/ui';

export function ProfileScreen() {
  const { profile, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          setSigningOut(true);
          try {
            await signOut();
          } catch {
            setSigningOut(false);
          }
        },
      },
    ]);
  };

  const isProvider = profile?.role === 'provider';

  const menuItems = isProvider
    ? ['Edit Profile', 'Earnings History', 'Availability Settings', 'Support']
    : ['Edit Profile', 'Notifications', 'Payment Methods', 'Support'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Avatar
          photoUrl={profile?.photoUrl}
          name={profile?.fullName}
          size={80}
          showOnlineIndicator={isProvider}
          online={profile?.availabilityStatus === 'online'}
        />
        <Text style={styles.name}>{profile?.fullName || 'User'}</Text>
        <Text style={styles.email}>{profile?.email}</Text>
        <View style={styles.badgeRow}>
          <Badge
            label={isProvider ? 'Oyster Shucker' : 'Customer'}
            color="gold"
            variant="pill"
          />
        </View>
      </View>

      <Divider />

      <View style={styles.menu}>
        {menuItems.map((item) => (
          <TouchableOpacity key={item} style={styles.menuItem} activeOpacity={0.6}>
            <Text style={styles.menuText}>{item}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.signOutSection}>
        <Button
          title="Sign Out"
          variant="danger"
          onPress={handleSignOut}
          loading={signingOut}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.lg,
  },
  name: {
    ...Typography.h3,
    color: Colors.text,
    marginTop: Spacing.md,
  },
  email: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  badgeRow: {
    marginTop: Spacing.sm,
  },
  menu: {
    gap: Spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuText: {
    ...Typography.body,
    color: Colors.text,
  },
  chevron: {
    ...Typography.h3,
    color: Colors.textMuted,
  },
  signOutSection: {
    marginTop: 'auto',
    paddingBottom: Spacing.lg,
  },
});
