import { Suspense, type JSX } from 'react';
import './App.css';
import Header from './header';
import ItemDetailsTable from './item-details-table';
import LatestPricesTable from './latest-prices-table';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Suspense>
        <ItemDetailsTable />
      </Suspense>
      <Suspense>
        <LatestPricesTable />
      </Suspense>
    </>
  );
}

export default App;
