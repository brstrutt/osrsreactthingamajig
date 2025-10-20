import { useMemo, type JSX } from 'react';
import { OsrsItemData, useOsrsItems } from '../../shared/use-osrs-items';
import filterUndefined from '../../shared/filter-undefined';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../shared/table/table';
import {
  assertTypeExtendsType,
  ItemId,
  ItemName,
  OsrsItemComponent,
} from '../../shared';
import { GemName, jewellery } from './items';

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
      columnHelper.accessor('geProfitFromOre', {
        header: () => 'GE Profit (ore)',
        maxSize: 70,
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
  geProfitFromOre: number;
  geProfitFromBar: number;
};

type GoldType = 'Gold ore' | 'Gold bar';
assertTypeExtendsType<GoldType, ItemName>();

function useTableData(): TableRow[] {
  const items = useOsrsItems();
  const jewelleryNames = useMemo(() => jewellery.map((item) => item.name), []);
  const materials = useMemo<
    Record<GemName | GoldType, OsrsItemData | undefined>
  >(
    () => ({
      'Gold ore': items.find((item) => item.id === ItemId['Gold ore']),
      'Gold bar': items.find((item) => item.id === ItemId['Gold bar']),
      Sapphire: items.find((item) => item.id === ItemId['Sapphire']),
      Emerald: items.find((item) => item.id === ItemId['Emerald']),
      Ruby: items.find((item) => item.id === ItemId['Ruby']),
      Diamond: items.find((item) => item.id === ItemId['Diamond']),
    }),
    [items],
  );

  return useMemo(
    () =>
      items
        .filter(filterUndefined('highAlch'))
        .filter(filterUndefined('geValue'))
        .filter((item) => jewelleryNames.includes(ItemId[item.id] as GemName))
        .map((item) => {
          const gem = jewellery.find(
            (product) => product.name === (ItemId[item.id] as string),
          )?.gem as GemName;

          const value = item.geValue ?? item.value;

          const oreCost =
            (materials['Gold ore']?.geValue ?? 300) +
            (materials[gem]?.geValue ?? 9999);
          const barCost =
            (materials['Gold bar']?.geValue ?? 300) +
            (materials[gem]?.geValue ?? 9999);

          const geProfitFromOre = value - oreCost;
          const geProfitFromBar = value - barCost;
          return {
            ...item,
            value,
            geProfitFromOre,
            geProfitFromBar,
          };
        }),
    [items, jewelleryNames, materials],
  );
}
