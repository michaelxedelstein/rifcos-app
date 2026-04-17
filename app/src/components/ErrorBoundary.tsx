import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logError } from '../services/logger';
import { ErrorScreen } from './ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, errorMessage: '' };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logError('fatal', 'React ErrorBoundary caught render crash', error, {
      componentStack: info.componentStack?.slice(0, 2000),
      source: 'errorBoundary',
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: '' });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <ErrorScreen
          message="Something went wrong"
          description="The app ran into an unexpected problem. Tap below to try again."
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}
