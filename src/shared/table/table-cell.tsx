import { JSX, ReactNode } from 'react';
import './table-cell.css';
import { Column } from '@tanstack/react-table';

function Cell<T>(props: {
  column: Column<T, unknown>;
  title?: string;
  children: ReactNode;
  onClick?: () => void;
}): JSX.Element {
  const { column, title = '', children, onClick } = props;
  return (
    <div
      className="osrsTableCell"
      style={{
        width: column.columnDef.size,
        maxWidth: column.columnDef.maxSize,
      }}
      title={title}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Cell;
