import { useMemo, type JSX } from 'react';
import './App.css';
import HighAlchProfitTable from './tables/high-alch-profit-table';
import PickupProfitTable from './tables/pickup-profit-table';
import { useTabs } from './shared';

type Tabs = 'highalch' | 'pickup' | 'other';

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
          id: 'other',
          name: 'Other',
          content: <div>other!</div>,
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
