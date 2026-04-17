import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

type LogLevel = 'info' | 'warn' | 'error' | 'fatal';

const APP_VERSION = Constants.expoConfig?.version ?? '0.0.0';

function getDeviceInfo() {
  return {
    platform: Platform.OS,
    osVersion: Platform.Version,
    appVersion: APP_VERSION,
  };
}

export async function logEvent(
  eventName: string,
  data: Record<string, any> = {}
) {
  try {
    await addDoc(collection(db, 'events'), {
      eventName,
      userId: auth.currentUser?.uid || null,
      data,
      timestamp: serverTimestamp(),
      ...getDeviceInfo(),
    });
  } catch (e) {
    console.warn('[Logger] Failed to log event:', eventName, e);
  }
}

export async function logError(
  level: LogLevel,
  message: string,
  error?: unknown,
  context: Record<string, any> = {}
) {
  const errorDetails: Record<string, any> = { message };

  if (error instanceof Error) {
    errorDetails.name = error.name;
    errorDetails.errorMessage = error.message;
    errorDetails.stack = error.stack?.slice(0, 2000);
  } else if (error !== undefined) {
    errorDetails.raw = String(error).slice(0, 2000);
  }

  if (__DEV__) {
    const tag = level === 'fatal' ? '🔴 FATAL' : level === 'error' ? '🟠 ERROR' : '🟡 WARN';
    console.warn(`${tag}: ${message}`, error);
  }

  try {
    await addDoc(collection(db, 'errorLogs'), {
      level,
      ...errorDetails,
      context,
      userId: auth.currentUser?.uid || null,
      timestamp: serverTimestamp(),
      ...getDeviceInfo(),
    });
  } catch (e) {
    console.warn('[Logger] Failed to log error:', message, e);
  }
}

export function logInfo(eventName: string, data?: Record<string, any>) {
  return logEvent(eventName, data);
}

export function logWarn(message: string, context?: Record<string, any>) {
  return logError('warn', message, undefined, context);
}
