import type { JSX } from 'react';
import { useItemDetails } from './api';

function ItemDetailsTable(): JSX.Element {
  const latestPrices = useItemDetails();
  return (
    <>
      {latestPrices.status === 'pending' && <div>table loading</div>}
      {latestPrices.status === 'error' && <div>table ERROR!</div>}
      {latestPrices.status === 'success' &&
        latestPrices.data.map((itemDetails) => (
          <div key={itemDetails.id}>{JSON.stringify(itemDetails)}</div>
        ))}
    </>
  );
}

export default ItemDetailsTable;
