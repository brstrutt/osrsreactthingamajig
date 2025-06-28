import { JSX, Suspense, useMemo } from 'react';
import { useOsrsItems } from './use-osrs-items';
import DefaultErrorBoundary from './default-error-boundary';
import './osrs-item.css';

export function OsrsItem(props: { id: number }): JSX.Element {
  const { id } = props;

  return (
    <>
      <DefaultErrorBoundary>
        <Suspense fallback={<div>Loading Item with ID {id}</div>}>
          <Component {...props} />
        </Suspense>
      </DefaultErrorBoundary>
    </>
  );
}

export function Component(props: { id: number }): JSX.Element {
  const { id } = props;
  const items = useOsrsItems();
  const item = useMemo(() => items.find((item) => item.id === id), [items, id]);

  return (
    <div className="OsrsItem">
      {item ? (
        <>
          {item.iconComponent}
          <a
            href={`https://prices.runescape.wiki/osrs/item/${item.id}`}
            target="_blank"
            rel="noreferrer"
            title={item.name}
            className="text-clip-ellipsis"
          >
            {item.geValue ?? 0}g
          </a>
        </>
      ) : (
        'Item not found'
      )}
    </div>
  );
}
