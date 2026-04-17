import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { initCrashReporting } from './src/services/crashReporter';

initCrashReporting();

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <StatusBar style="auto" />
        <RootNavigator />
      </AuthProvider>
    </ErrorBoundary>
  );
}
