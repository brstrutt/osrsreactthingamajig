import { useMemo, type JSX } from 'react';
import { ItemDetails, useItemDetails } from './api';

function ItemDetailsTable(): JSX.Element {
  const items = useItemDetails();
  return (
    <>
      {items.status === 'pending' && <div>table loading</div>}
      {items.status === 'error' && <div>table ERROR!</div>}
      {items.status === 'success' && (
        <LoadedTable items={items.data} />
      )}
    </>
  );
}

function LoadedTable(props: { items: ItemDetails[] }): JSX.Element {
  const { items } = props;
  const freeToPlayItems = useMemo(
    () => items.filter((item) => !item.members),
    [items],
  );
  return (
    <>
      {freeToPlayItems.map((item) => (
        <div key={item.id}>{JSON.stringify(item)}</div>
      ))}
    </>
  );
}

export default ItemDetailsTable;
