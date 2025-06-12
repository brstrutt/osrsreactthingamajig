import type { JSX } from 'react';
import { ItemPrices, useLatestPrices } from './api';

function PricesTable(): JSX.Element {
  const latestPrices = useLatestPrices();
  return (
    <LoadedTable prices={latestPrices.data.data} />
  );
}

function LoadedTable(props: { prices: ItemPrices }): JSX.Element {
  const { prices } = props;

  return (
    <table>
      <tr>
        <th>ItemID</th>
        <th>High</th>
        <th>Low</th>
      </tr>
      {Object.entries(prices).map(([key, price]) => (
          <tr key={key}>
            <th>{key}</th>
            <th>{price.high}</th>
            <th>{price.low}</th>
          </tr>
        ))
      }
    </table>
  );
}

export default PricesTable;
