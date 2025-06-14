import { Suspense, useMemo, type JSX } from 'react';
import { useItemDetails, useLatestPrices } from './api';
import DefaultErrorBoundary from './default-error-boundary';

function HighAlchProfitTable(): JSX.Element {
  return (
    <DefaultErrorBoundary>
      <Suspense fallback={<div>Loading High Alch Profit Table...</div>}>
        <LoadedTable />
      </Suspense>
    </DefaultErrorBoundary>
  )
}

function LoadedTable(): JSX.Element {
  const items = useItemDetails().data;
  const prices = useLatestPrices().data.data;

  const freeToPlayItems = useMemo(
    () => items.filter((item) => !item.members),
    [items],
  );

  const freeToPlayItemsWithPriceData = useMemo(
    () => freeToPlayItems.map((item) => ({...item, ...prices[item.id]})),
    [freeToPlayItems, prices],
  );

  const natureRuneData = useMemo(
    () => freeToPlayItemsWithPriceData.find((item) => item.id === 561),
    [freeToPlayItemsWithPriceData]
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th>High Alch Value</th>
          <th>Profit</th>
          <th>Percentage Profit</th>
        </tr>
      </thead>
      <tbody>
        {natureRuneData &&
            <tr key={natureRuneData.id}>
            <th>
                <img src={`https://oldschool.runescape.wiki/images/${natureRuneData.icon.replaceAll(' ', '_')}`}/>
                {natureRuneData.name}
            </th>
            <th>{natureRuneData.low}</th>
            <th>{natureRuneData.highalch}</th>
            <th>{natureRuneData.highalch - natureRuneData.low}</th>
            <th>{(natureRuneData.highalch - natureRuneData.low)}</th>
            </tr>
        }
        {natureRuneData && freeToPlayItemsWithPriceData.map((item) => (
          <tr key={item.id}>
            <th>
              <img src={`https://oldschool.runescape.wiki/images/${item.icon.replaceAll(' ', '_')}`}/>
              {item.name}
            </th>
            <th>{item.low}</th>
            <th>{item.highalch}</th>
            <th>{item.highalch - item.low - natureRuneData?.low}</th>
            <th>{((item.highalch - item.low - natureRuneData?.low)/item.low) * 100}%</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HighAlchProfitTable;
