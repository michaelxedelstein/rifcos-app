import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { USER_ROLES, type UserRole } from '../../constants/config';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export function SignupScreen({ navigation }: Props) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(USER_ROLES.CUSTOMER);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Choose how you want to use RIFCOS</Text>

      <View style={styles.roleSelector}>
        <TouchableOpacity
          style={[
            styles.roleOption,
            selectedRole === USER_ROLES.CUSTOMER && styles.roleOptionActive,
          ]}
          onPress={() => setSelectedRole(USER_ROLES.CUSTOMER)}
        >
          <Text
            style={[
              styles.roleLabel,
              selectedRole === USER_ROLES.CUSTOMER && styles.roleLabelActive,
            ]}
          >
            I need a shucker
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleOption,
            selectedRole === USER_ROLES.PROVIDER && styles.roleOptionActive,
          ]}
          onPress={() => setSelectedRole(USER_ROLES.PROVIDER)}
        >
          <Text
            style={[
              styles.roleLabel,
              selectedRole === USER_ROLES.PROVIDER && styles.roleLabelActive,
            ]}
          >
            I am a shucker
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          placeholderTextColor={Colors.textMuted}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={Colors.textMuted}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={Colors.textMuted}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
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
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  roleSelector: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  roleOption: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  roleOptionActive: {
    borderColor: Colors.accent,
    backgroundColor: '#FFF0F2',
  },
  roleLabel: {
    ...Typography.bodyBold,
    color: Colors.textSecondary,
  },
  roleLabelActive: {
    color: Colors.accent,
  },
  form: {
    marginTop: Spacing.lg,
    gap: Spacing.md,
  },
  input: {
    ...Typography.body,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    color: Colors.text,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  buttonText: {
    ...Typography.bodyBold,
    color: Colors.textLight,
  },
});
