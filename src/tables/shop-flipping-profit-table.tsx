import { JSX, Suspense, useMemo } from 'react';
import Table from '../shared/table/table';
import { OsrsItem, useOsrsItems } from '../shared';
import filterUndefined from '../shared/filter-undefined';
import { createColumnHelper } from '@tanstack/react-table';
import './pickup-profit-table.css';
import { allShopItems } from './shop-flipping-profit-table-items';
import DefaultErrorBoundary from '../shared/default-error-boundary';

export function ShopFlippingProfitTable(): JSX.Element {
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
            >
              {row.getValue().name}
            </a>
          </>
        ),
      }),
      columnHelper.accessor('value', {
        header: () => 'Item Value',
        maxSize: 100,
      }),
      columnHelper.accessor('geValue', {
        header: () => 'GE Value',
        maxSize: 100,
      }),
      columnHelper.accessor('profit', {
        header: () => 'Profit (g)',
        maxSize: 100,
      }),
      columnHelper.accessor('precentageProfit', {
        header: () => 'Profit (%)',
        cell: (row) => row.getValue() + '%',
        maxSize: 100,
      }),
    ],
    [columnHelper],
  );

  return (
    <Table
      data={tableData}
      columns={columns}
      sorting={useMemo(() => [{ id: 'profit', desc: true }], [])}
    />
  );
}

type TableRow = OsrsItem & {
  profit: number;
  precentageProfit: number;
};

const allF2pShopItems = [...allShopItems];

function useTableData(): TableRow[] {
  const items = useOsrsItems();

  return useMemo(
    () =>
      items
        .filter(filterUndefined('geValue'))
        .filter((item) => allF2pShopItems.includes(item.id))
        .map((item) => {
          const profit = item.geValue - item.value;
          const precentageProfit = Math.round((profit / item.value) * 100);

          return {
            ...item,
            profit,
            precentageProfit,
          };
        }),
    [items],
  );
}
