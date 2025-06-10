import { JSX } from 'react';
import './App.css';
import Header from './header';
import PricesTable from './latest-prices-table';

function App(): JSX.Element {
  return <>
    <Header/>
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <PricesTable/>
    </div>
  </>;
};

export default App;
