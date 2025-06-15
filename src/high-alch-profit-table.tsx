import { Suspense, useMemo, type JSX } from 'react';
import DefaultErrorBoundary from './shared/default-error-boundary';
import { OsrsItem, useOsrsItems } from './shared/use-osrs-items';
import filterUndefined from './shared/filter-undefined';
import { ColumnDef, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

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
      columnHelper.accessor(row => row, {
        id: 'itemName',
        header: () => 'Item',
        cell: row => <ItemNameComponent item={row.getValue()}/>,
      }),
      columnHelper.accessor('geValue', {
        header: () => 'GE Value',
      }),
      columnHelper.accessor('cost', {
        header: () => 'Total Cost',
      }),
      columnHelper.accessor('highAlch', {
        header: () => 'High Alch Value',
      }),
      columnHelper.accessor('profit', {
        header: () => 'Profit (gold)',
      }),
      columnHelper.accessor('precentageProfit', {
        header: () => 'Profit (percentage)',
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable<TableRow>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table>
      <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

type TableRow = OsrsItem & {
  profit: number;
  cost: number,
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
      items
        .filter(filterUndefined('highAlch'))
        .map((item) => {
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

function ItemNameComponent(props: {item: TableRow}): JSX.Element {
  const {item} = props;
  return <>
    {item.iconComponent}
    <a
      href={`https://prices.runescape.wiki/osrs/item/${item.id}`}
      target="_blank"
      rel="noreferrer"
    >
      {item.name}
    </a>
  </>;
}

export default HighAlchProfitTable;
