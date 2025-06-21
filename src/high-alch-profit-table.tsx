import { Suspense, useMemo, type JSX } from 'react';
import DefaultErrorBoundary from './shared/default-error-boundary';
import { OsrsItem, useOsrsItems } from './shared/use-osrs-items';
import filterUndefined from './shared/filter-undefined';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';

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
        cell: (row) => row.getValue() + '%',
      }),
    ],
    [columnHelper],
  );

  const table = useReactTable<TableRow>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    state: {
      sorting: useMemo(() => [{ id: 'precentageProfit', desc: true }], []),
    },
  });

  return (
    <table className='osrsTable'>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <TableFooter table={table}/>
    </table>
  );
}

function TableFooter(props: {table: Table<TableRow>}): JSX.Element {
  const {table} = props;

  const currentPageIndex = table.getState().pagination.pageIndex;

  const totalRowcount = useMemo(() => table.getRowCount(), [table]);
  const numberOfRowsShown = useMemo(() => table.getRowModel().rows.length, [table]);
  const rowsPerPage = useMemo(() => table.getState().pagination.pageSize, [table]);
  const numberOfPages = useMemo(() => table.getPageCount(), [table]);

  const currentPageFirstRowIndex = useMemo(() => currentPageIndex * rowsPerPage, [currentPageIndex, rowsPerPage]);
  const currentPageLastRowIndex = useMemo(() => currentPageFirstRowIndex + numberOfRowsShown - 1, [currentPageFirstRowIndex, numberOfRowsShown]);

  return (
    <tfoot className='tableFooter'>
      <span>
        Showing {currentPageFirstRowIndex + 1} to {currentPageLastRowIndex + 1} of {totalRowcount} rows
      </span>
      <span>
        <button
          onClick={table.firstPage}
          disabled={!table.getCanPreviousPage()}
        >
          1
        </button>
        <button
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button disabled={true}>
          {currentPageIndex + 1}
        </button>
        <button
          onClick={table.nextPage}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button onClick={table.lastPage} disabled={!table.getCanNextPage()}>
          {numberOfPages}
        </button>
      </span>
    </tfoot>
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
