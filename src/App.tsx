import { useMemo, type JSX } from 'react';
import './App.css';
import {HighAlchProfitTable, PickupProfitTable, ShopFlippingProfitTable} from './tables';
import { useTabs } from './shared';
import { OsrsItem } from './shared/osrs-item';

type Tabs = 'highalch' | 'pickup' | 'shop';

function App(): JSX.Element {
  const { tabButtons, tabContents } = useTabs<Tabs>(
    useMemo(
      () => [
        {
          id: 'highalch',
          name: 'High Alch',
          content: <HighAlchTab />,
        },
        {
          id: 'pickup',
          name: 'Pickup',
          content: <PickupTab />,
        },
        {
          id: 'shop',
          name: 'Shop',
          content: <ShopTab />,
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
      <main>{tabContents}</main>
    </>
  );
}

function HighAlchTab(): JSX.Element {
  return (
    <>
      <OsrsItem itemName={'Nature rune'} />
      <HighAlchProfitTable />
    </>
  );
}

function PickupTab(): JSX.Element {
  return <PickupProfitTable />;
}

function ShopTab(): JSX.Element {
  return <ShopFlippingProfitTable />;
}

export default App;
