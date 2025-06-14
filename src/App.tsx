import { type JSX } from 'react';
import './App.css';
import Header from './header';
import HighAlchProfitTable from './high-alch-profit-table';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <HighAlchProfitTable />
    </>
  );
}

export default App;
