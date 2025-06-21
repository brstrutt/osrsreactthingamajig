import { type JSX } from 'react';
import './App.css';
import HighAlchProfitTable from './high-alch-profit-table';

function App(): JSX.Element {
  return (
    <>
      <header>React OSRS Price Thingamajig</header>
      <main>
        <HighAlchProfitTable />
      </main>
    </>
  );
}

export default App;
