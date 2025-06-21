import { type JSX } from 'react';
import './App.css';
import HighAlchProfitTable from './high-alch-profit-table';
import PickupProfitTable from './pickup-profit-table';

function App(): JSX.Element {
  return (
    <>
      <header>React OSRS Price Thingamajig</header>
      <main>
        <HighAlchProfitTable />
        <PickupProfitTable />
      </main>
    </>
  );
}

export default App;
