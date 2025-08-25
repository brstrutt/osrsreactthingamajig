import { JSX, useMemo } from 'react';
import Table from '../../shared/table/table';
import {
  ItemId,
  ItemName,
  OsrsItemComponent,
  OsrsItemData,
  useOsrsItems,
} from '../../shared';
import filterUndefined from '../../shared/filter-undefined';
import { createColumnHelper } from '@tanstack/react-table';
import '../styles.css';
import { allShopItems } from './items';

export function ShopFlippingProfitTable(): JSX.Element {
  const tableData = useTableData();

  const columnHelper = createColumnHelper<TableRow>();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row, {
        id: 'itemName',
        header: () => 'Item',
        maxSize: 200,
        cell: (row) => <OsrsItemComponent item={row.getValue()} />,
      }),
      columnHelper.accessor('value', {
        header: () => 'Item Value',
        maxSize: 100,
      }),
      columnHelper.accessor('geValue', {
        header: () => 'GE Value',
        maxSize: 100,
      }),
      columnHelper.accessor('profit', {
        header: () => 'Profit (g)',
        maxSize: 100,
      }),
      columnHelper.accessor('precentageProfit', {
        header: () => 'Profit (%)',
        cell: (row) => row.getValue() + '%',
        maxSize: 100,
      }),
    ],
    [columnHelper],
  );

  return (
    <Table
      data={tableData}
      columns={columns}
      sorting={useMemo(() => [{ id: 'profit', desc: true }], [])}
    />
  );
}

type TableRow = OsrsItemData & {
  profit: number;
  precentageProfit: number;
};

const allF2pShopItems = [...allShopItems];

function useTableData(): TableRow[] {
  const items = useOsrsItems();

  return useMemo(
    () =>
      items
        .filter(filterUndefined('geValue'))
        .filter((item) => allF2pShopItems.includes(ItemId[item.id] as ItemName))
        .map((item) => {
          const profit = item.geValue - item.value;
          const precentageProfit = Math.round((profit / item.value) * 100);

          return {
            ...item,
            profit,
            precentageProfit,
          };
        }),
    [items],
  );
}
