import { JSX, ReactNode } from 'react';
import './table-cell.css';
import { CellContext } from '@tanstack/react-table';

function Cell<T>(props: {
  rowData: CellContext<T, T>;
  children: ReactNode;
}): JSX.Element {
  const { rowData, children } = props;
  return (
    <div
      className="osrsTableCell text-clip-ellipsis"
      style={{
        width: rowData.column.columnDef.size,
        maxWidth: rowData.column.columnDef.maxSize,
      }}
    >
      {children}
    </div>
  );
}

export default Cell;
