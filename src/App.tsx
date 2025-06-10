import { JSX } from 'react';
import './App.css';
import Header from './header';
import { useLatestPrices } from './latest-prices-api';

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

function PricesTable(): JSX.Element {
  const latestPrices = useLatestPrices();
  return <>
    {latestPrices.status === 'pending' &&
      <div>table loading</div>
    }
    {latestPrices.status === 'error' &&
      <div>table ERROR!</div>
    }
    {latestPrices.status === 'success' &&
      Object.entries(latestPrices.data).map(
        (entry: any) => <div>{JSON.stringify(entry)}</div>
      )
    }
  </>;
}

export default App;
