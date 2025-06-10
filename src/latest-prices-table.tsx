import type { JSX } from 'react';
import { useLatestPrices } from './latest-prices-api';

function PricesTable(): JSX.Element {
  const latestPrices = useLatestPrices();
  return (
    <>
      {latestPrices.status === 'pending' && <div>table loading</div>}
      {latestPrices.status === 'error' && <div>table ERROR!</div>}
      {latestPrices.status === 'success' &&
        Object.entries(latestPrices.data).map(([key, priceData]) => (
          <div key={key}>{JSON.stringify(priceData)}</div>
        ))}
    </>
  );
}

export default PricesTable;
