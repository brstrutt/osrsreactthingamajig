import { JSX, Suspense, useMemo } from 'react';
import Table from '../../shared/table/table';
import {
  ItemId,
  ItemName,
  OsrsItemComponent,
  OsrsItemData,
  useOsrsItems,
} from '../../shared';
import filterUndefined from '../../shared/filter-undefined';
import { createColumnHelper } from '@tanstack/react-table';
import './pickup-profit-table.css';
import {
  allF2pPickupItems,
  allF2pWildernessItemPickups,
} from './pickup-profit-table-items';
import DefaultErrorBoundary from '../../shared/default-error-boundary';

export function PickupProfitTable(): JSX.Element {
  return (
    <DefaultErrorBoundary>
      <Suspense fallback={<div>Loading High Alch Profit Table...</div>}>
        <LoadedTable />
      </Suspense>
    </DefaultErrorBoundary>
  );
}

function LoadedTable(): JSX.Element {
  const tableData = useTableData();

  const columnHelper = createColumnHelper<TableRow>();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row, {
        id: 'itemName',
        header: () => 'Item',
        maxSize: 200,
        cell: (row) => (
          <OsrsItemComponent
            item={row.getValue()}
            className={
              row.getValue().location === 'dangerous' ? 'dangerous' : undefined
            }
          />
        ),
      }),
      columnHelper.accessor('geValue', {
        header: () => 'GE Value',
        maxSize: 100,
      }),
    ],
    [columnHelper],
  );

  return (
    <Table
      data={tableData}
      columns={columns}
      sorting={useMemo(() => [{ id: 'geValue', desc: true }], [])}
    />
  );
}

type TableRow = OsrsItemData & {
  location: 'safe' | 'dangerous';
};

function useTableData(): TableRow[] {
  const items = useOsrsItems();

  return useMemo(
    () =>
      items
        .filter(filterUndefined('geValue'))
        .filter((item) =>
          allF2pPickupItems.includes(ItemId[item.id] as ItemName),
        )
        .map((item) => ({
          ...item,
          location: allF2pWildernessItemPickups.includes(
            ItemId[item.id] as ItemName,
          )
            ? 'dangerous'
            : 'safe',
        })),
    [items],
  );
}
