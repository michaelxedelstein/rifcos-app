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
import { Colors, Typography, Spacing } from '../../constants/theme';
import { Button, Input } from '../../components/ui';
import { resetPassword } from '../../services/auth';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await resetPassword(email.trim());
      setSuccess(true);
    } catch (err: any) {
      const code = err?.code;
      if (code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.successIcon}>✉</Text>
        <Text style={styles.title}>Check your email</Text>
        <Text style={styles.successText}>
          We sent a password reset link to {email}. Check your inbox and follow
          the link to reset your password.
        </Text>
        <Button
          title="Back to Sign In"
          variant="secondary"
          onPress={() => navigation.navigate('Login')}
          style={{ marginTop: Spacing.xl }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.flex} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.back}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.subtitle}>
              Enter your email and we'll send you a reset link
            </Text>

            <View style={styles.form}>
              <Input
                label="EMAIL ADDRESS"
                placeholder="you@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <Button title="Send Reset Link" onPress={handleReset} loading={loading} />
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
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  back: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
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
  form: {
    marginTop: Spacing.xl,
  },
  error: {
    ...Typography.caption,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  successIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
    color: Colors.primary,
  },
  successText: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
    maxWidth: 300,
  },
});
