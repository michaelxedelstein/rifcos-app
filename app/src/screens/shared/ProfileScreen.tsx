import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { useAuth } from '../../hooks/useAuth';
import { Avatar, Divider, Button } from '../../components/ui';

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          photoUrl={profile?.photoUrl}
          name={profile?.fullName}
          size={72}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{profile?.fullName || 'User'}</Text>
          <Text style={styles.email}>{profile?.email}</Text>
          <Text style={styles.role}>
            {profile?.role === 'provider' ? 'Oyster Shucker' : 'Customer'}
          </Text>
        </View>
      </View>

      <Divider />

      <View style={styles.section}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Edit Profile</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notifications</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
        {profile?.role === 'customer' && (
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Payment Methods</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Support</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signOutSection}>
        <Button
          title="Sign Out"
          variant="ghost"
          onPress={handleSignOut}
          loading={signingOut}
          style={{ opacity: 1 }}
        />
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    ...Typography.h3,
    color: Colors.text,
  },
  email: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  role: {
    ...Typography.small,
    color: Colors.accent,
    fontWeight: '600',
    marginTop: 4,
  },
  section: {
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
