import { JSX, Suspense } from 'react';
import { OsrsItemData, useOsrsItems } from './use-osrs-items';
import DefaultErrorBoundary from './default-error-boundary';
import './osrs-item.css';
import { ItemId, ItemName } from './items';

export function OsrsItem(props: {
  itemName: ItemName;
  data?: keyof OsrsItemData;
}): JSX.Element {
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

function Component(props: {
  itemName: ItemName;
  data?: keyof OsrsItemData;
}): JSX.Element {
  const { itemName, data } = props;
  const items = useOsrsItems();
  const itemData = items.find((item) => item.id === ItemId[itemName]);

  return (
    <div className="OsrsItem">
      {itemData ? (
        <OsrsItemComponent
          item={itemData}
          data={data ?? 'geValue'}
          postfix={'g'}
        />
      ) : (
        'Item not found'
      )}
    </div>
  );
}

export function OsrsItemComponent(props: {
  item: OsrsItemData;
  className?: string;
  data?: keyof OsrsItemData;
  postfix?: string;
}): JSX.Element {
  const { item, className, data = 'name', postfix } = props;
  return (
    <>
      {item.iconComponent}
      <a
        href={`https://prices.runescape.wiki/osrs/item/${item.id}`}
        target="_blank"
        rel="noreferrer"
        title={item.name}
        className={['text-clip-ellipsis', className].join(' ')}
      >
        {item[data]}
        {postfix}
      </a>
    </>
  );
}
