import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';
import { USER_ROLES, type UserRole } from '../../constants/config';
import { Button, Input } from '../../components/ui';
import { signUp } from '../../services/auth';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export function SignupScreen({ navigation }: Props) {
  const [selectedRole, setSelectedRole] = useState<UserRole>(USER_ROLES.CUSTOMER);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName.trim() || !email.trim() || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await signUp(email.trim(), password, fullName.trim(), selectedRole);
    } catch (err: any) {
      const code = err?.code;
      if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 8 characters.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address');
      } else {
        setError('Something went wrong. Please try again.');
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.flex} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View>
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
              <Input
                label="Full name"
                placeholder="Your full name"
                value={fullName}
                onChangeText={setFullName}
                autoComplete="name"
              />
              <Input
                label="Email"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              <Input
                label="Password"
                placeholder="At least 8 characters"
                value={password}
                onChangeText={setPassword}
                isPassword
              />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <Button title="Get Started" onPress={handleSignUp} loading={loading} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flexGrow: 1,
    padding: Spacing.lg,
    paddingTop: 40,
    justifyContent: 'space-between',
    paddingBottom: 40,
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
  error: {
    ...Typography.caption,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
