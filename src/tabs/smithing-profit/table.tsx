import { useMemo, type JSX } from 'react';
import { OsrsItemData, useOsrsItems } from '../../shared/use-osrs-items';
import filterUndefined from '../../shared/filter-undefined';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../shared/table/table';
import { ItemId, OsrsItemComponent } from '../../shared';
import { Metal, smithableItems } from './items';

export function SmithingProfitTable(): JSX.Element {
  const tableData = useTableData();

  const columnHelper = createColumnHelper<TableRow>();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row, {
        id: 'itemName',
        header: () => 'Item',
        maxSize: 150,
        cell: (row) => <OsrsItemComponent item={row.getValue()} />,
      }),
      columnHelper.accessor('value', {
        header: () => 'Current Value',
        maxSize: 90,
      }),
      columnHelper.accessor('geProfitFromBar', {
        header: () => 'GE Profit (bar)',
        maxSize: 70,
      }),
    ],
    [columnHelper],
  );

  return (
    <Table
      data={tableData}
      columns={columns}
      defaultSort={useMemo(() => ({ id: 'geProfitFromOre', desc: true }), [])}
    />
  );
}

type TableRow = OsrsItemData & {
  value: number;
  geProfitFromBar: number;
};

function useTableData(): TableRow[] {
  const items = useOsrsItems();
  const smithableItemNames = useMemo(
    () => smithableItems.map((item) => item.name),
    [],
  );
  const materials = useMemo<Record<Metal, OsrsItemData | undefined>>(
    () => ({
      'Bronze bar': items.find((item) => item.id === ItemId['Bronze bar']),
      'Iron bar': items.find((item) => item.id === ItemId['Iron bar']),
      'Steel bar': items.find((item) => item.id === ItemId['Steel bar']),
      'Mithril bar': items.find((item) => item.id === ItemId['Mithril bar']),
      'Adamantite bar': items.find(
        (item) => item.id === ItemId['Adamantite bar'],
      ),
      'Runite bar': items.find((item) => item.id === ItemId['Runite bar']),
    }),
    [items],
  );

  return useMemo(
    () =>
      items
        .filter(filterUndefined('highAlch'))
        .filter(filterUndefined('geValue'))
        .filter((item) => smithableItemNames.includes(ItemId[item.id] as Metal))
        .map((item) => {
          const metal = smithableItems.find(
            (product) => product.name === (ItemId[item.id] as string),
          )?.metal as Metal;

          const value = item.geValue ?? item.value;
          const barCost = materials[metal]?.geValue ?? 9999;

          const geProfitFromBar = value - barCost;
          return {
            ...item,
            value,
            geProfitFromBar,
          };
        }),
    [items, smithableItemNames, materials],
  );
}
