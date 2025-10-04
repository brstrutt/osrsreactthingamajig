import React, { ReactNode } from 'react';

type ErrorBoundaryState = {
  error?: Error;
};

type ErrorBoundaryProps = {
  fallback: (error: Error) => ReactNode;
  children?: ReactNode;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: undefined };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Logged Error:', error, info);
  }

  render() {
    switch (this.state.error) {
      case undefined:
        return this.props.children;
      default:
        return this.props.fallback(this.state.error);
    }
  }
}
