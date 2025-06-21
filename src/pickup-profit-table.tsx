import { JSX, useMemo } from 'react';
import Table from './shared/table';
import { OsrsItem, useOsrsItems } from './shared';
import filterUndefined from './shared/filter-undefined';
import { createColumnHelper } from '@tanstack/react-table';

function PickupProfitTable(): JSX.Element {
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
    ],
    [columnHelper],
  );

  return (
    <Table
      data={tableData}
      columns={columns}
      sorting={useMemo(() => [{ id: 'geValue', desc: true }], [])}
    />
  );
}

type TableRow = OsrsItem;

const knownGoodPickupItemIds = [
  273, //Poison(item)
  272, //Fish food
  544, //Monk robe top
  542, //Monk robe bottoms
];

function useTableData(): TableRow[] {
  const items = useOsrsItems();

  return useMemo(
    () =>
      items
        .filter(filterUndefined('geValue'))
        .filter((item) => knownGoodPickupItemIds.includes(item.id)),
    [items],
  );
}

export default PickupProfitTable;
