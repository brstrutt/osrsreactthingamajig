import { Suspense, type JSX } from 'react';
import './App.css';
import Header from './header';
import ItemDetailsTable from './item-details-table';
import LatestPricesTable from './latest-prices-table';
import { ErrorBoundary } from 'react-error-boundary';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <ErrorBoundary fallback={<div>Failed to load Item Details Table</div>}>
        <Suspense fallback={<div>Loading Item Details Table...</div>}>
          <ItemDetailsTable />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<div>Failed to load Latest Prices Table</div>}>
        <Suspense fallback={<div>Loading Latest Prices Table...</div>}>
          <LatestPricesTable />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
