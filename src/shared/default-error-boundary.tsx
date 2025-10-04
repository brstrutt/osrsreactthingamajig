import { JSX, ReactNode } from 'react';
import { ErrorBoundary } from './error-boundary';

function DefaultErrorBoundary(props: { children: ReactNode }): JSX.Element {
  return (
    <ErrorBoundary fallback={(error: Error) => <Fallback error={error} />}>
      {props.children}
    </ErrorBoundary>
  );
}

function Fallback(props: { error: Error }): JSX.Element {
  return <div>Error:{props.error.message}</div>;
}

export default DefaultErrorBoundary;
