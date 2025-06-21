import { Suspense, useMemo, type JSX } from 'react';
import DefaultErrorBoundary from './shared/default-error-boundary';
import { OsrsItem, useOsrsItems } from './shared/use-osrs-items';
import filterUndefined from './shared/filter-undefined';
import { createColumnHelper } from '@tanstack/react-table';
import Table from './shared/table';

function HighAlchProfitTable(): JSX.Element {
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
        size: 270,
        cell: (row) => (
          <div className="osrsItemColumnCell">
            {row.getValue().iconComponent}
            <a
              href={`https://prices.runescape.wiki/osrs/item/${row.getValue().id}`}
              target="_blank"
              rel="noreferrer"
            >
              {row.getValue().name}
            </a>
          </div>
        ),
      }),
      columnHelper.accessor('geValue', {
        header: () => 'GE Value',
        size: 100,
      }),
      columnHelper.accessor('cost', {
        header: () => 'Total Cost',
        size: 100,
      }),
      columnHelper.accessor('highAlch', {
        header: () => 'High Alch Value',
        size: 100,
      }),
      columnHelper.accessor('profit', {
        header: () => 'Profit (gold)',
        size: 100,
      }),
      columnHelper.accessor('precentageProfit', {
        header: () => 'Profit (percentage)',
        cell: (row) => row.getValue() + '%',
        size: 100,
      }),
    ],
    [columnHelper],
  );

  return (
    <Table
      data={tableData}
      columns={columns}
      sorting={useMemo(
        () => [
          { id: 'precentageProfit', desc: true },
          { id: 'profit', desc: true },
        ],
        [],
      )}
    />
  );
}

type TableRow = OsrsItem & {
  profit: number;
  cost: number;
  precentageProfit: number;
};

function useTableData(): TableRow[] {
  const items = useOsrsItems();
  const natureRune = useMemo(
    () => items.find((item) => item.id === 561),
    [items],
  );
  const natureRunePrice: number = useMemo(
    () => natureRune?.geValue ?? 180,
    [natureRune],
  );

  return useMemo(
    () =>
      items.filter(filterUndefined('highAlch')).map((item) => {
        const geValue = item.geValue ?? item.value;
        const cost = geValue + natureRunePrice;
        const profit = item.highAlch - cost;
        const precentageProfit = Math.round((profit / cost) * 100);
        return {
          ...item,
          profit,
          cost,
          precentageProfit,
        };
      }),
    [items, natureRunePrice],
  );
}

export default HighAlchProfitTable;
