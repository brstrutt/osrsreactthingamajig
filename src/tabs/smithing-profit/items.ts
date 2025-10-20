import { assertTypeExtendsType, ItemName } from '../../shared';

export type Metal = 'Bronze bar' | 'Iron bar' | 'Steel bar' | 'Mithril bar' | 'Adamantite bar' | 'Runite bar';
assertTypeExtendsType<Metal, ItemName>();

export type SmithableItem = {
  name: ItemName;
  metal: Metal;
  numberOfBars: number;
};

const weapons: SmithableItem[] = [
  { name: 'Bronze dagger#(unp)', metal: 'Bronze bar', numberOfBars: 1 },
  { name: 'Bronze axe', metal: 'Bronze bar', numberOfBars: 1 },
  { name: 'Bronze sword', metal: 'Bronze bar', numberOfBars: 1 },
  { name: 'Bronze scimitar', metal: 'Bronze bar', numberOfBars: 2 },
  { name: 'Bronze longsword', metal: 'Bronze bar', numberOfBars: 2 },
  { name: 'Bronze 2h sword', metal: 'Bronze bar', numberOfBars: 3 },
  { name: 'Bronze battleaxe', metal: 'Bronze bar', numberOfBars: 3 },
  { name: 'Bronze warhammer', metal: 'Bronze bar', numberOfBars: 3 },
  { name: 'Bronze mace', metal: 'Bronze bar', numberOfBars: 1  },
];

const armour: SmithableItem[] = [
  { name: 'Bronze med helm', metal: 'Bronze bar', numberOfBars: 1 },
  { name: 'Bronze full helm', metal: 'Bronze bar', numberOfBars: 2 },
  { name: 'Bronze chainbody', metal: 'Bronze bar', numberOfBars: 3},
  { name: 'Bronze platebody', metal: 'Bronze bar', numberOfBars: 5 },
  { name: 'Bronze plateskirt', metal: 'Bronze bar', numberOfBars: 3 },
  { name: 'Bronze platelegs', metal: 'Bronze bar', numberOfBars: 3 },
  { name: 'Bronze sq shield', metal: 'Bronze bar', numberOfBars: 2 },
  { name: 'Bronze kiteshield', metal: 'Bronze bar', numberOfBars: 3 },
];

export const smithableItems = [...weapons, ...armour];
