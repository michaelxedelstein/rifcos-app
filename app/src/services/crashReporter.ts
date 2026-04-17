import { logError } from './logger';

let isInitialized = false;

/**
 * Sets up global handlers for uncaught JS errors and unhandled
 * promise rejections. Call once at app startup.
 */
export function initCrashReporting() {
  if (isInitialized) return;
  isInitialized = true;

  const originalHandler = ErrorUtils.getGlobalHandler();

  ErrorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
    logError(
      isFatal ? 'fatal' : 'error',
      isFatal ? 'Uncaught fatal error' : 'Uncaught JS error',
      error,
      { source: 'globalHandler' }
    );

    if (originalHandler) {
      originalHandler(error, isFatal);
    }
  });

  const win = global as any;
  const originalPromiseRejection = win.onunhandledrejection;
  win.onunhandledrejection = (event: any) => {
    const reason = event?.reason;
    logError('error', 'Unhandled promise rejection', reason, {
      source: 'promiseRejection',
    });

    if (typeof originalPromiseRejection === 'function') {
      originalPromiseRejection(event);
    }
  };
}
