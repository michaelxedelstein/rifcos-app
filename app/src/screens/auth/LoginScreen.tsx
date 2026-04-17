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
import { signIn } from '../../services/auth';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await signIn(email.trim(), password);
    } catch (err: any) {
      const code = err?.code;
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Please try again later.');
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.back}>← Back</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>

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
              <Input
                label="PASSWORD"
                placeholder="Your password"
                value={password}
                onChangeText={setPassword}
                isPassword
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </View>

          <Button title="Sign In" onPress={handleSignIn} loading={loading} />
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
    gap: Spacing.md,
  },
  forgotText: {
    ...Typography.caption,
    color: Colors.primary,
    textAlign: 'right',
    fontWeight: '600',
  },
  error: {
    ...Typography.caption,
    color: Colors.error,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
