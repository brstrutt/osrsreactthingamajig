import { Suspense, useMemo, type JSX } from 'react';
import './App.css';
import {HighAlchProfitTab, PickupProfitTab, ShopFlippingProfitTab} from './tabs';
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
          content: <HighAlchProfitTab />,
        },
        {
          id: 'pickup',
          name: 'Pickup',
          content: <PickupProfitTab />,
        },
        {
          id: 'shop',
          name: 'Shop',
          content: <ShopFlippingProfitTab />,
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
