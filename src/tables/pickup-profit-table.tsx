import { JSX, Suspense, useMemo } from 'react';
import Table from '../shared/table/table';
import { OsrsItem, useOsrsItems } from '../shared';
import filterUndefined from '../shared/filter-undefined';
import { createColumnHelper } from '@tanstack/react-table';
import './pickup-profit-table.css';
import {
  allF2pPickupItems,
  allF2pWildernessItemPickups,
} from './pickup-profit-table-items';
import DefaultErrorBoundary from '../shared/default-error-boundary';

function PickupProfitTable(): JSX.Element {
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
          <>
            {row.getValue().iconComponent}
            <a
              href={`https://prices.runescape.wiki/osrs/item/${row.getValue().id}`}
              target="_blank"
              rel="noreferrer"
              className={row.getValue().location}
            >
              {row.getValue().name}
            </a>
          </>
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

type TableRow = OsrsItem & {
  location: 'safe' | 'dangerous';
};

function useTableData(): TableRow[] {
  const items = useOsrsItems();

  return useMemo(
    () =>
      items
        .filter(filterUndefined('geValue'))
        .filter((item) => allF2pPickupItems.includes(item.id))
        .map((item) => ({
          ...item,
          location: allF2pWildernessItemPickups.includes(item.id)
            ? 'dangerous'
            : 'safe',
        })),
    [items],
  );
}

export default PickupProfitTable;
