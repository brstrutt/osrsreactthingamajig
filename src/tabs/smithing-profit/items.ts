import { assertTypeExtendsType, ItemName } from '../../shared';

export type Metal = 'Bronze bar' | 'Iron bar' | 'Steel bar' | 'Mithril bar' | 'Adamantite bar' | 'Runite bar';
assertTypeExtendsType<Metal, ItemName>();

export type SmithableItem = {
  name: ItemName;
  metal: Metal;
};

const weapons: SmithableItem[] = [
  { name: 'Bronze dagger#(unp)', metal: 'Bronze bar' },
  { name: 'Bronze sword', metal: 'Bronze bar' },
  { name: 'Bronze scimitar', metal: 'Bronze bar' },
  { name: 'Bronze longsword', metal: 'Bronze bar' },
  { name: 'Bronze 2h sword', metal: 'Bronze bar' },
  { name: 'Bronze battleaxe', metal: 'Bronze bar' },
  { name: 'Bronze warhammer', metal: 'Bronze bar' },
  { name: 'Bronze mace', metal: 'Bronze bar' },
];

const armour: SmithableItem[] = [
  { name: 'Bronze med helm', metal: 'Bronze bar' },
  { name: 'Bronze full helm', metal: 'Bronze bar' },
  { name: 'Bronze chainbody', metal: 'Bronze bar' },
  { name: 'Bronze platebody', metal: 'Bronze bar' },
  { name: 'Bronze plateskirt', metal: 'Bronze bar' },
  { name: 'Bronze platelegs', metal: 'Bronze bar' },
  { name: 'Bronze sq shield', metal: 'Bronze bar' },
  { name: 'Bronze kiteshield', metal: 'Bronze bar' },
];

export const smithableItems = [...weapons, ...armour];
