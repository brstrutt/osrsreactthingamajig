import type { JSX } from 'react';
import './App.css';
import Header from './header';
import ItemDetailsTable from './item-details-table';
import LatestPricesTable from './latest-prices-table';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <ItemDetailsTable />
      <LatestPricesTable />
    </>
  );
}

export default App;
