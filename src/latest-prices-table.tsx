import { Suspense, type JSX } from 'react';
import { useOsrsLatestApi } from './api';
import DefaultErrorBoundary from './default-error-boundary';

function PricesTable(): JSX.Element {
  return (
    <DefaultErrorBoundary>
      <Suspense fallback={<div>Loading Latest Prices Table...</div>}>
        <LoadedTable />
      </Suspense>
    </DefaultErrorBoundary>
  );
}

function LoadedTable(): JSX.Element {
  const prices = useOsrsLatestApi().data.data;

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
