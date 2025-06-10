import { JSX, useCallback } from 'react';
import './App.css';
import Header from './header';
import { useQuery } from '@tanstack/react-query';

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
  const getPriceData = useCallback<() => Promise<ItemPrices>>(
    async () => (await fetch('https://localhost:3000/osrs/latest')).json(),
    []
  );
  const latestPrices = useQuery({queryKey: ['latest_prices'], queryFn: getPriceData});
  
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

type ItemPriceData = {
  high: number,
  highTime: number,
  low: number,
  lowTime: number
}

type ItemPrices = {
  [itemId: string]: ItemPriceData
}

export default App;
