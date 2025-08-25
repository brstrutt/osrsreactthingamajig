import { Suspense, useMemo, type JSX } from 'react';
import './App.css';
import {HighAlchProfitTable, PickupProfitTable, ShopFlippingProfitTable} from './tables';
import { useTabs } from './shared';
import DefaultErrorBoundary from './shared/default-error-boundary';

type Tabs = 'highalch' | 'pickup' | 'shop';

function App(): JSX.Element {
  const { tabButtons, tabContents } = useTabs<Tabs>(
    useMemo(
      () => [
        {
          id: 'highalch',
          name: 'High Alch',
          content: <HighAlchProfitTable />,
        },
        {
          id: 'pickup',
          name: 'Pickup',
          content: <PickupProfitTable />,
        },
        {
          id: 'shop',
          name: 'Shop',
          content: <ShopFlippingProfitTable />,
        },
      ],
      [],
    ),
  );

  return (
    <>
      <header>
        <div className="title">React OSRS Price Thingamajig</div>
        <div className="tabBar">{tabButtons}</div>
      </header>
      <main>
        <DefaultErrorBoundary>
          <Suspense fallback={<div>Loading Page...</div>}>
            {tabContents}
          </Suspense>
        </DefaultErrorBoundary>
      </main>
    </>
  );
}

export default App;
