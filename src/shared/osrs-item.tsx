import { JSX, Suspense, useMemo } from 'react';
import { useOsrsItems } from './use-osrs-items';
import DefaultErrorBoundary from './default-error-boundary';
import './osrs-item.css';
import { ItemId, ItemName } from './items';

export function OsrsItem(props: { itemName: ItemName }): JSX.Element {
  const { itemName } = props;

  return (
    <>
      <DefaultErrorBoundary>
        <Suspense fallback={<div>Loading {itemName} data</div>}>
          <Component {...props} />
        </Suspense>
      </DefaultErrorBoundary>
    </>
  );
}

export function Component(props: { itemName: ItemName }): JSX.Element {
  const { itemName } = props;
  const items = useOsrsItems();
  const itemData = useMemo(
    () => items.find((item) => item.id === ItemId[itemName]),
    [items, itemName],
  );

  return (
    <div className="OsrsItem">
      {itemData ? (
        <>
          {itemData.iconComponent}
          <a
            href={`https://prices.runescape.wiki/osrs/item/${itemData.id}`}
            target="_blank"
            rel="noreferrer"
            title={itemData.name}
            className="text-clip-ellipsis"
          >
            {itemData.geValue ?? 0}g
          </a>
        </>
      ) : (
        'Item not found'
      )}
    </div>
  );
}
