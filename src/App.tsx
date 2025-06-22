import { useState, type JSX } from 'react';
import './App.css';
import HighAlchProfitTable from './tables/high-alch-profit-table';
import PickupProfitTable from './tables/pickup-profit-table';

type Tabs = 'highalch' | 'pickup';

function App(): JSX.Element {
  const [currentTab, setCurrentTab] = useState<Tabs>('highalch');

  return (
    <>
      <header>
        React OSRS Price Thingamajig
        <div>
          <button
            onClick={() => setCurrentTab('highalch')}
            disabled={currentTab === 'highalch'}
          >
            High Alch
          </button>
          <button
            onClick={() => setCurrentTab('pickup')}
            disabled={currentTab === 'pickup'}
          >
            Pickup
          </button>
        </div>
      </header>
      <main>
        {currentTab === 'highalch' && <HighAlchProfitTable />}
        {currentTab === 'pickup' && <PickupProfitTable />}
      </main>
    </>
  );
}

export default App;
