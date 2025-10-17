import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  Table as TanstackTable,
  HeaderGroup,
  Header,
  ColumnDef as OGColumnDef,
  ColumnSort,
} from '@tanstack/react-table';
import { JSX, useCallback, useMemo, useState } from 'react';
import './table.css';
import Cell from './table-cell';

// We need to add the `accessorKey` because a lot of our columns don't provide an `id`, they provide an `accessorKey` instead, which the `ColumnDef` doesn't account for.
// Allow `any` here because that's what the library does. Also everything else I try draws a red squiggly at the callsite that only appears after restarting vscode.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ColumnDef<Row> = OGColumnDef<Row, any> & { accessorKey?: string };

function Table<Row>(props: {
  data: Row[];
  columns: ColumnDef<Row>[];
  defaultSort: ColumnSort;
}): JSX.Element {
  const { data, columns, defaultSort } = props;

  const [sorting, setSorting] = useState<SortingState>([defaultSort]);
  const toggleSorting = useCallback(
    (columnId: string) => {
      const columnHasRequestedId = (column: ColumnDef<Row>) =>
        column.id === columnId || column.accessorKey === columnId;
      if (!columns.some(columnHasRequestedId)) {
        console.log(
          `Tried to sort by a column ID that doesn't exist: ${columnId}`,
        );
        console.log(`Current columns:`);
        console.log(columns);
        return;
      }

      const currentSort = sorting.find((sort) => sort.id === columnId) ?? {
        desc: false,
        id: columnId,
      };

      currentSort.desc = !currentSort.desc;
      setSorting([currentSort]);
    },
    [columns, sorting],
  );

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
            <TableHeader
              key={headerGroup.id}
              headerGroup={headerGroup}
              toggleSorting={toggleSorting}
              currentSorting={sorting}
            />
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

function TableHeader<Row>(props: {
  headerGroup: HeaderGroup<Row>;
  toggleSorting: (columnId: string) => void;
  currentSorting: SortingState;
}): JSX.Element {
  const { headerGroup, toggleSorting, currentSorting } = props;
  return (
    <tr>
      {headerGroup.headers.map((header) => (
        <TableHeaderCell
          key={header.id}
          header={header}
          toggleSorting={() => toggleSorting(header.id)}
          currentSorting={currentSorting}
        />
      ))}
    </tr>
  );
}

function TableHeaderCell<Row>(props: {
  header: Header<Row, unknown>;
  toggleSorting: () => void;
  currentSorting: SortingState;
}): JSX.Element {
  const { header, toggleSorting, currentSorting } = props;
  const sortedDescending = useMemo(
    () => currentSorting.find((sort) => sort.id === header.id)?.desc,
    [currentSorting, header.id],
  );
  return (
    <th onClick={toggleSorting}>
      {!header.isPlaceholder && (
        <>
          <Cell column={header.column}>
            {flexRender(header.column.columnDef.header, header.getContext())}
            {sortedDescending !== undefined && (
              <span>
                {
                  sortedDescending
                    ? '\u{2193}' // Unicode down arrow
                    : '\u{2191}' // Unicode up arrow
                }
              </span>
            )}
          </Cell>
        </>
      )}
    </th>
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
