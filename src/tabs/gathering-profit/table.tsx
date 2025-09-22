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
import { allF2pGatheringItems } from './items';

export function GatheringProfitTable(): JSX.Element {
  const tableData = useTableData();

  const columnHelper = createColumnHelper<OsrsItemData>();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row, {
        id: 'itemName',
        header: () => 'Item',
        maxSize: 200,
        cell: (row) => <OsrsItemComponent item={row.getValue()} />,
      }),
      columnHelper.accessor('geValue', {
        header: () => 'GE Value',
        maxSize: 100,
      }),
      columnHelper.accessor('value', {
        header: () => 'Item Value',
        maxSize: 100,
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

function useTableData(): OsrsItemData[] {
  const items = useOsrsItems();

  return useMemo(
    () =>
      items
        .filter(filterUndefined('geValue'))
        .filter((item) =>
          allF2pGatheringItems.includes(ItemId[item.id] as ItemName),
        ),
    [items],
  );
}
