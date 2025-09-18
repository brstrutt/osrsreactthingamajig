import { Suspense, useMemo, type JSX } from 'react';
import './App.css';
import {CraftingProfitTab, GatheringProfitTab, HighAlchProfitTab, PickupProfitTab, ShopFlippingProfitTab} from './tabs';
import { useTabs } from './shared';
import DefaultErrorBoundary from './shared/default-error-boundary';

type Tabs = 'highalch' | 'pickup' | 'shop' | 'crafting' | 'gathering';

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
        {
          id: 'crafting',
          name: 'Crafting',
          content: <CraftingProfitTab />,
        },
        {
          id: 'gathering',
          name: 'Gathering',
          content: <GatheringProfitTab />,
        }
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
