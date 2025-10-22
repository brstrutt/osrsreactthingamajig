import { type JSX } from 'react';
import { OsrsItemData, useOsrsItems } from '../../shared/use-osrs-items';
import filterUndefined from '../../shared/filter-undefined';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../shared/table/table';
import { ItemId, OsrsItemComponent } from '../../shared';
import { Metal, Ore, Resource, SmithableItem, smithableItems } from './items';

export function SmithingProfitTable(): JSX.Element {
  const tableData = useTableData();

  const columnHelper = createColumnHelper<TableRow>();
  const columns = [
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
    columnHelper.accessor('highAlchProfitFromOre', {
      header: () => 'High Alch Profit (ore)',
      maxSize: 70,
    }),
    columnHelper.accessor('geProfitFromBar', {
      header: () => 'GE Profit (bar)',
      maxSize: 70,
    }),
    columnHelper.accessor('highAlchProfitFromBar', {
      header: () => 'High Alch Profit (bar)',
      maxSize: 70,
    }),
  ];

  return (
    <Table
      data={tableData}
      columns={columns}
      defaultSort={{ id: 'geProfitFromBar', desc: true }}
    />
  );
}

type TableRow = OsrsItemData & {
  value: number;
  geProfitFromOre: number;
  highAlchProfitFromOre: number;
  geProfitFromBar: number;
  highAlchProfitFromBar: number;
};

function useTableData(): TableRow[] {
  const items = useOsrsItems();
  const smithableItemNames = smithableItems.map((item) => item.name);
  const currentMetalGeData: Record<Metal, OsrsItemData | undefined> = {
    'Bronze bar': items.find((item) => item.id === ItemId['Bronze bar']),
    'Iron bar': items.find((item) => item.id === ItemId['Iron bar']),
    'Steel bar': items.find((item) => item.id === ItemId['Steel bar']),
    'Mithril bar': items.find((item) => item.id === ItemId['Mithril bar']),
    'Adamantite bar': items.find(
      (item) => item.id === ItemId['Adamantite bar'],
    ),
    'Runite bar': items.find((item) => item.id === ItemId['Runite bar']),
  };
  const currentOreGeData: Record<Ore, OsrsItemData | undefined> = {
    'Copper ore': items.find((item) => item.id === ItemId['Copper ore']),
    'Tin ore': items.find((item) => item.id === ItemId['Tin ore']),
    'Iron ore': items.find((item) => item.id === ItemId['Iron ore']),
    Coal: items.find((item) => item.id === ItemId['Coal']),
    'Mithril ore': items.find((item) => item.id === ItemId['Mithril ore']),
    'Adamantite ore': items.find(
      (item) => item.id === ItemId['Adamantite ore'],
    ),
    'Runite ore': items.find((item) => item.id === ItemId['Runite ore']),
  };

  const natureRunePrice: number =
    items.find((item) => item.id === ItemId['Nature rune'])?.geValue ?? 180;

  return items
    .filter(filterUndefined('highAlch'))
    .filter(filterUndefined('geValue'))
    .filter((item) => smithableItemNames.includes(ItemId[item.id] as Metal))
    .map((item) => {
      const itemSmithingData = smithableItems.find(
        (product) => product.name === (ItemId[item.id] as string),
      );

      const value = item.geValueHigh ?? item.value;

      // Ore based calculations
      const oreCost = itemSmithingData?.metal.ores
        .map(
          (ore: Resource) =>
            (currentOreGeData[ore.name]?.geValueLow ?? 9999) * ore.amount,
        ) // Turn the resources array into an array of cost values in GP (cost per ore * ores rerquired)
        .reduce((totalCost: number, newCost: number) => totalCost + newCost);
      const totalOreCost =
        (oreCost ?? 9999) * (itemSmithingData?.numberOfBars ?? 5);

      // Bar based calculations
      const barCost =
        currentMetalGeData[(itemSmithingData as SmithableItem).metal.name]
          ?.geValueLow ?? 9999;
      const totalBarCost = barCost * (itemSmithingData?.numberOfBars ?? 5);

      const geProfitFromOre = value - totalOreCost;
      const highAlchProfitFromOre =
        item.highAlch - totalOreCost - natureRunePrice;

      const geProfitFromBar = value - totalBarCost;
      const highAlchProfitFromBar =
        item.highAlch - totalBarCost - natureRunePrice;
      return {
        ...item,
        value,
        geProfitFromOre,
        highAlchProfitFromOre,
        geProfitFromBar,
        highAlchProfitFromBar,
      };
    });
}
