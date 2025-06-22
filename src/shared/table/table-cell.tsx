import { JSX, ReactNode } from 'react';
import './table-cell.css';
import { Column } from '@tanstack/react-table';

function Cell<T>(props: {
  column: Column<T, unknown>;
  children: ReactNode;
}): JSX.Element {
  const { column, children } = props;
  return (
    <div
      className="osrsTableCell"
      style={{
        width: column.columnDef.size,
        maxWidth: column.columnDef.maxSize,
      }}
    >
      {children}
    </div>
  );
}

export default Cell;
