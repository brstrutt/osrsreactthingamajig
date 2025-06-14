import { Suspense, type JSX } from 'react';
import { useLatestPrices } from './api';
import { ErrorBoundary } from 'react-error-boundary';

function PricesTable(): JSX.Element {
  return (
    <ErrorBoundary fallback={<div>Failed to load Latest Prices Table</div>}>
      <Suspense fallback={<div>Loading Latest Prices Table...</div>}>
        <LoadedTable />
      </Suspense>
    </ErrorBoundary>
  );
}

function LoadedTable(): JSX.Element {
  const prices = useLatestPrices().data.data;

  return (
    <table>
      <thead>
        <tr>
          <th>ItemID</th>
          <th>High</th>
          <th>Low</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(prices).map(([key, price]) => (
          <tr key={key}>
            <th>{key}</th>
            <th>{price.high}</th>
            <th>{price.low}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PricesTable;
