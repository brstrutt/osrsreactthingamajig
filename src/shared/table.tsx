import {
  AccessorFnColumnDef,
  AccessorKeyColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  Table as TanstackTable,
} from '@tanstack/react-table';
import { JSX, useMemo } from 'react';
import './table.css';

type ColumnDef<Row> = AccessorKeyColumnDef<Row, Row> | AccessorFnColumnDef<Row, Row>;

function Table<Row>(props: {
  data: Row[];
  columns: ColumnDef<Row>[];
  sorting: SortingState;
}): JSX.Element {
  const { data, columns, sorting } = props;
  const table = useReactTable<Row>({
    data: data,
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
      sorting,
    },
  });

  return (
    <table className="osrsTable">
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
      <TableFooter table={table} />
    </table>
  );
}

function TableFooter<Row>(props: {table: TanstackTable<Row>}): JSX.Element {
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

export default Table;
