import { Suspense, useMemo, type JSX } from 'react';
import { useItemDetails } from './api';
import { ErrorBoundary } from 'react-error-boundary';

function ItemDetailsTable(): JSX.Element {
  return (
    <ErrorBoundary fallback={<div>Failed to load Item Details Table</div>}>
      <Suspense fallback={<div>Loading Item Details Table...</div>}>
        <LoadedTable />
      </Suspense>
    </ErrorBoundary>
  )
}

function LoadedTable(): JSX.Element {
  const items = useItemDetails().data;
  const freeToPlayItems = useMemo(
    () => items.filter((item) => !item.members),
    [items],
  );

  return (
    <table>
      <tr>
        <th>Item</th>
        <th>Value</th>
      </tr>
      {freeToPlayItems.map((item) => (
        <tr key={item.id}>
          <th>
            <img src={`https://oldschool.runescape.wiki/images/${item.icon.replaceAll(' ', '_')}`}/>
            {item.name}
            :
            <a href={`https://prices.runescape.wiki/osrs/item/${item.id}`} target="_blank" rel="noreferrer">
              Prices
            </a>
            :
            <a href={`https://oldschool.runescape.wiki/w/Special:Lookup?type=item&id=${item.id}`} target="_blank" rel="noreferrer">
              Wiki
            </a>
          </th>
          <th>{item.value}</th>
        </tr>
      ))}
    </table>
  );
}

export default ItemDetailsTable;
