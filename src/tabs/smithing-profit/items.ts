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
  { name: 'Iron dagger#(unp)', metal: 'Iron bar', numberOfBars: 1 },
  { name: 'Iron axe', metal: 'Iron bar', numberOfBars: 1 },
  { name: 'Iron sword', metal: 'Iron bar', numberOfBars: 1 },
  { name: 'Iron scimitar', metal: 'Iron bar', numberOfBars: 2 },
  { name: 'Iron longsword', metal: 'Iron bar', numberOfBars: 2 },
  { name: 'Iron 2h sword', metal: 'Iron bar', numberOfBars: 3 },
  { name: 'Iron battleaxe', metal: 'Iron bar', numberOfBars: 3 },
  { name: 'Iron warhammer', metal: 'Iron bar', numberOfBars: 3 },
  { name: 'Iron mace', metal: 'Iron bar', numberOfBars: 1  },
  { name: 'Steel dagger#(unp)', metal: 'Steel bar', numberOfBars: 1 },
  { name: 'Steel axe', metal: 'Steel bar', numberOfBars: 1 },
  { name: 'Steel sword', metal: 'Steel bar', numberOfBars: 1 },
  { name: 'Steel scimitar', metal: 'Steel bar', numberOfBars: 2 },
  { name: 'Steel longsword', metal: 'Steel bar', numberOfBars: 2 },
  { name: 'Steel 2h sword', metal: 'Steel bar', numberOfBars: 3 },
  { name: 'Steel battleaxe', metal: 'Steel bar', numberOfBars: 3 },
  { name: 'Steel warhammer', metal: 'Steel bar', numberOfBars: 3 },
  { name: 'Steel mace', metal: 'Steel bar', numberOfBars: 1  },
  { name: 'Mithril dagger#(unp)', metal: 'Mithril bar', numberOfBars: 1 },
  { name: 'Mithril axe', metal: 'Mithril bar', numberOfBars: 1 },
  { name: 'Mithril sword', metal: 'Mithril bar', numberOfBars: 1 },
  { name: 'Mithril scimitar', metal: 'Mithril bar', numberOfBars: 2 },
  { name: 'Mithril longsword', metal: 'Mithril bar', numberOfBars: 2 },
  { name: 'Mithril 2h sword', metal: 'Mithril bar', numberOfBars: 3 },
  { name: 'Mithril battleaxe', metal: 'Mithril bar', numberOfBars: 3 },
  { name: 'Mithril warhammer', metal: 'Mithril bar', numberOfBars: 3 },
  { name: 'Mithril mace', metal: 'Mithril bar', numberOfBars: 1  },
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
  { name: 'Iron med helm', metal: 'Iron bar', numberOfBars: 1 },
  { name: 'Iron full helm', metal: 'Iron bar', numberOfBars: 2 },
  { name: 'Iron chainbody', metal: 'Iron bar', numberOfBars: 3},
  { name: 'Iron platebody', metal: 'Iron bar', numberOfBars: 5 },
  { name: 'Iron plateskirt', metal: 'Iron bar', numberOfBars: 3 },
  { name: 'Iron platelegs', metal: 'Iron bar', numberOfBars: 3 },
  { name: 'Iron sq shield', metal: 'Iron bar', numberOfBars: 2 },
  { name: 'Iron kiteshield', metal: 'Iron bar', numberOfBars: 3 },
  { name: 'Steel med helm', metal: 'Steel bar', numberOfBars: 1 },
  { name: 'Steel full helm', metal: 'Steel bar', numberOfBars: 2 },
  { name: 'Steel chainbody', metal: 'Steel bar', numberOfBars: 3},
  { name: 'Steel platebody', metal: 'Steel bar', numberOfBars: 5 },
  { name: 'Steel plateskirt', metal: 'Steel bar', numberOfBars: 3 },
  { name: 'Steel platelegs', metal: 'Steel bar', numberOfBars: 3 },
  { name: 'Steel sq shield', metal: 'Steel bar', numberOfBars: 2 },
  { name: 'Steel kiteshield', metal: 'Steel bar', numberOfBars: 3 },
  { name: 'Mithril med helm', metal: 'Mithril bar', numberOfBars: 1 },
  { name: 'Mithril full helm', metal: 'Mithril bar', numberOfBars: 2 },
  { name: 'Mithril chainbody', metal: 'Mithril bar', numberOfBars: 3},
  { name: 'Mithril platebody', metal: 'Mithril bar', numberOfBars: 5 },
  { name: 'Mithril plateskirt', metal: 'Mithril bar', numberOfBars: 3 },
  { name: 'Mithril platelegs', metal: 'Mithril bar', numberOfBars: 3 },
  { name: 'Mithril sq shield', metal: 'Mithril bar', numberOfBars: 2 },
  { name: 'Mithril kiteshield', metal: 'Mithril bar', numberOfBars: 3 },
];

export const smithableItems = [...weapons, ...armour];
