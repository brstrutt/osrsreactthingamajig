import { Suspense, useMemo, type JSX } from 'react';
import DefaultErrorBoundary from '../../shared/default-error-boundary';
import { OsrsItemData, useOsrsItems } from '../../shared/use-osrs-items';
import filterUndefined from '../../shared/filter-undefined';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../shared/table/table';
import { ItemId, OsrsItemComponent } from '../../shared';

export function HighAlchProfitTable(): JSX.Element {
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
        maxSize: 150,
        cell: (row) => <OsrsItemComponent item={row.getValue()} />,
      }),
      columnHelper.accessor('geValue', {
        header: () => 'GE Value',
        maxSize: 90,
      }),
      columnHelper.accessor('cost', {
        header: () => 'Total Cost',
        maxSize: 90,
      }),
      columnHelper.accessor('highAlch', {
        header: () => 'High Alch Value',
        maxSize: 70,
      }),
      columnHelper.accessor('profit', {
        header: () => 'Profit (g)',
        maxSize: 90,
      }),
      columnHelper.accessor('precentageProfit', {
        header: () => 'Profit (%)',
        cell: (row) => row.getValue() + '%',
        maxSize: 70,
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

type TableRow = OsrsItemData & {
  profit: number;
  cost: number;
  precentageProfit: number;
};

function useTableData(): TableRow[] {
  const items = useOsrsItems();
  const natureRune = useMemo(
    () => items.find((item) => item.id === ItemId['Nature rune']),
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
