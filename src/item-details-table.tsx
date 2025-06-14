import { Suspense, useMemo, type JSX } from 'react';
import { useOsrsMappingApi } from './shared/api';
import DefaultErrorBoundary from './shared/default-error-boundary';

function ItemDetailsTable(): JSX.Element {
  return (
    <DefaultErrorBoundary>
      <Suspense fallback={<div>Loading Item Details Table...</div>}>
        <LoadedTable />
      </Suspense>
    </DefaultErrorBoundary>
  );
}

function LoadedTable(): JSX.Element {
  const items = useOsrsMappingApi().data;
  const freeToPlayItems = useMemo(
    () => items.filter((item) => !item.members),
    [items],
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {freeToPlayItems.map((item) => (
          <tr key={item.id}>
            <th>
              <img
                src={`https://oldschool.runescape.wiki/images/${item.icon.replaceAll(' ', '_')}`}
              />
              {item.name}:
              <a
                href={`https://prices.runescape.wiki/osrs/item/${item.id}`}
                target="_blank"
                rel="noreferrer"
              >
                Prices
              </a>
              :
              <a
                href={`https://oldschool.runescape.wiki/w/Special:Lookup?type=item&id=${item.id}`}
                target="_blank"
                rel="noreferrer"
              >
                Wiki
              </a>
            </th>
            <th>{item.value}</th>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ItemDetailsTable;
