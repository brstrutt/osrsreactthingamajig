import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  Table as TanstackTable,
  ColumnDef,
} from '@tanstack/react-table';
import { JSX, useMemo } from 'react';
import './table.css';
import Cell from './table-cell';

function Table<Row>(props: {
  data: Row[];
  // Allow `any` here because that's what the library does. Also everything else I try draws a red squiggly at the callsite that only appears after restarting vscode.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<Row, any>[];
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
        pageSize: 15,
      },
    },
    state: {
      sorting,
    },
    autoResetPageIndex: false,
  });

  return (
    <div className="osrsTableWrapper">
      <table className="osrsTable">
        <colgroup>
          {table.getAllColumns().map((column) => (
            <col
              key={column.id}
              style={{
                width: column.columnDef.maxSize,
                maxWidth: column.columnDef.maxSize,
              }}
            />
          ))}
        </colgroup>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <Cell column={header.column}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </Cell>
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
                  <Cell
                    column={cell.column}
                    title={(cell.getValue() as string | number).toString()}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Cell>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter table={table} />
    </div>
  );
}

function TableFooter<Row>(props: { table: TanstackTable<Row> }): JSX.Element {
  const { table } = props;

  const currentPageIndex = table.getState().pagination.pageIndex;

  const totalRowcount = useMemo(() => table.getRowCount(), [table]);
  const numberOfRowsShown = useMemo(
    () => table.getRowModel().rows.length,
    [table],
  );
  const rowsPerPage = useMemo(
    () => table.getState().pagination.pageSize,
    [table],
  );
  const numberOfPages = useMemo(() => table.getPageCount(), [table]);

  const currentPageFirstRowIndex = useMemo(
    () => currentPageIndex * rowsPerPage,
    [currentPageIndex, rowsPerPage],
  );
  const currentPageLastRowIndex = useMemo(
    () => currentPageFirstRowIndex + numberOfRowsShown - 1,
    [currentPageFirstRowIndex, numberOfRowsShown],
  );

  return (
    <div className="tableFooter">
      <span>
        Rows {currentPageFirstRowIndex + 1} to {currentPageLastRowIndex + 1} of{' '}
        {totalRowcount}
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
        <button disabled={true}>{currentPageIndex + 1}</button>
        <button onClick={table.nextPage} disabled={!table.getCanNextPage()}>
          {'>'}
        </button>
        <button onClick={table.lastPage} disabled={!table.getCanNextPage()}>
          {numberOfPages}
        </button>
      </span>
    </div>
  );
}

export default Table;
