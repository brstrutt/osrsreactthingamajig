import { JSX, useMemo } from 'react';
import Table from '../shared/table/table';
import { OsrsItem, useOsrsItems } from '../shared';
import filterUndefined from '../shared/filter-undefined';
import { createColumnHelper } from '@tanstack/react-table';
import './pickup-profit-table.css';

function PickupProfitTable(): JSX.Element {
  const tableData = useTableData();

  const columnHelper = createColumnHelper<TableRow>();
  const columns = useMemo(
    () => [
      columnHelper.accessor((row) => row, {
        id: 'itemName',
        header: () => 'Item',
        maxSize: 200,
        cell: (row) => (
          <>
            {row.getValue().iconComponent}
            <a
              href={`https://prices.runescape.wiki/osrs/item/${row.getValue().id}`}
              target="_blank"
              rel="noreferrer"
              className={row.getValue().location}
            >
              {row.getValue().name}
            </a>
          </>
        ),
      }),
      columnHelper.accessor('geValue', {
        header: () => 'GE Value',
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

type TableRow = OsrsItem & {
  location: 'safe' | 'dangerous';
};

const knownGoodPickupItemIds = [
  273, //Poison(item)
  272, //Fish food
  544, //Monk robe top
  542, //Monk robe bottoms
];

const allF2pNonWildernessItemPickups = [
  1061, // Leather boots
  1059, // Leather gloves
  1511, // Logs
  946, // Knife
  1935, // Jug
  1923, // Bowl
  1931, // Pot
  1925, // Bucket
  1965, // Cabbage
  1957, // Onion
  1942, // Potatoes
  1944, // Egg
  314, // Feather
  882, // Bronze arrow
  1205, // Bronze dagger
  556, // Air rune
  555, // Water rune
  557, // Earth rune
  554, // Fire rune
  558, // Mind rune
  559, // Body rune
  2313, // pie dish
  1734, // Thread
  952, // Spade
  1009, // Brass necklace
  2357, // Gold bar
  223, // Red spiders eggs
  526, // Bones
  1982, // Tomato
  1985, // Cheese
  877, // Bronze bolts
  1005, // White apron
  1963, // Banana
  1735, // Shears
  245, // Wine of Zamorak
];

const allF2pWildernessItemPickups = [
  562, // Chaos rune
  2351, // Iron bar
  1887, // Cake tin
  960, // Plank
  837, // Crossbow
  1203, // Iron dagger
  1137, // Iron med helm
  1207, // Steel dagger
  1281, // Steel sword
  69, // Iron kiteshield
  444, // Gold ore
  1069, // Steel platelegs
  1323, // Iron scimitar
  561, // Nature rune
  1119, // Steel platebody
  1385, // Staff of Earth
  1654, // Gold necklace
  1607, // Sapphire
  564, // Cosmic rune
];

const allF2pPickupItems = [
  ...knownGoodPickupItemIds,
  ...allF2pNonWildernessItemPickups,
  ...allF2pWildernessItemPickups,
];

function useTableData(): TableRow[] {
  const items = useOsrsItems();

  return useMemo(
    () =>
      items
        .filter(filterUndefined('geValue'))
        .filter((item) => allF2pPickupItems.includes(item.id))
        .map((item) => ({
          ...item,
          location: allF2pWildernessItemPickups.includes(item.id)
            ? 'dangerous'
            : 'safe',
        })),
    [items],
  );
}

export default PickupProfitTable;
