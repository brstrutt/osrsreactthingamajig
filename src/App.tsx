import { useState, type JSX } from 'react';
import './App.css';
import HighAlchProfitTable from './tables/high-alch-profit-table';
import PickupProfitTable from './tables/pickup-profit-table';

type Tabs = 'highalch' | 'pickup' | 'other';

function App(): JSX.Element {
  const [currentTab, setCurrentTab] = useState<Tabs>('highalch');

  return (
    <>
      <header>
        <div className="title">React OSRS Price Thingamajig</div>
        <div className="tabBar">
          <button
            onClick={() => setCurrentTab('highalch')}
            disabled={currentTab === 'highalch'}
            className="tab"
          >
            High Alch
          </button>
          <button
            onClick={() => setCurrentTab('pickup')}
            disabled={currentTab === 'pickup'}
            className="tab"
          >
            Pickup
          </button>
          <button
            onClick={() => setCurrentTab('other')}
            disabled={currentTab === 'other'}
            className="tab"
          >
            Other
          </button>
        </div>
      </header>
      <main>
        {currentTab === 'highalch' && <HighAlchProfitTable />}
        {currentTab === 'pickup' && <PickupProfitTable />}
        {currentTab === 'other' && <div>Other</div>}
      </main>
    </>
  );
}

export default App;
