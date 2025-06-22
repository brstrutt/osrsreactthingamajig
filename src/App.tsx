import { useMemo, type JSX } from 'react';
import './App.css';
import HighAlchProfitTable from './tables/high-alch-profit-table';
import PickupProfitTable from './tables/pickup-profit-table';
import { useTabs } from './shared';
import { ShopFlippingProfitTable } from './tables';

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
      <main>{tabContents}</main>
    </>
  );
}

export default App;
