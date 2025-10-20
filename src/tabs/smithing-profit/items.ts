import { assertTypeExtendsType, ItemName } from '../../shared';

export type Metal = 'Bronze bar' | 'Iron bar' | 'Steel bar' | 'Mithril bar' | 'Adamantite bar' | 'Runite bar';
assertTypeExtendsType<Metal, ItemName>();

export type Ore = 'Tin ore' | 'Copper ore' |'Iron ore' | 'Coal' | 'Mithril ore' | 'Adamantite ore' | 'Runite ore';
assertTypeExtendsType<Ore, ItemName>();

export type Resource = {
  name: Ore,
  amount: number,
};

export type MetalBar = {
  name: Metal,
  ores: Resource[],
}

const bronzeBar: MetalBar = {
  name: 'Bronze bar',
  ores: [
    {
      name: 'Tin ore',
      amount: 1,
    },
    {
      name: 'Copper ore',
      amount: 1,
    },
  ],
}
const ironBar: MetalBar = {
  name: 'Iron bar',
  ores: [
    {
      name: 'Iron ore',
      amount: 2, // 50% smithing failure, represented as 2 ore per bar
    },
  ],
}
const steelBar: MetalBar = {
  name: 'Steel bar',
  ores: [
    {
      name: 'Iron ore',
      amount: 1,
    },
    {
      name: 'Coal',
      amount: 2,
    },
  ],
}
const mithrilBar: MetalBar = {
  name: 'Mithril bar',
  ores: [
    {
      name: 'Mithril ore',
      amount: 1,
    },
    {
      name: 'Coal',
      amount: 4,
    },
  ],
}
const adamantiteBar: MetalBar = {
  name: 'Adamantite bar',
  ores: [
    {
      name: 'Adamantite ore',
      amount: 1,
    },
    {
      name: 'Coal',
      amount: 6,
    },
  ],
}
const runiteBar: MetalBar = {
  name: 'Runite bar',
  ores: [
    {
      name: 'Runite ore',
      amount: 1,
    },
    {
      name: 'Coal',
      amount: 8,
    },
  ],
}

export type SmithableItem = {
  name: ItemName;
  metal: MetalBar;
  numberOfBars: number;
};

const weapons: SmithableItem[] = [
  { name: 'Bronze dagger#(unp)', metal: bronzeBar, numberOfBars: 1 },
  { name: 'Bronze axe', metal: bronzeBar, numberOfBars: 1 },
  { name: 'Bronze sword', metal: bronzeBar, numberOfBars: 1 },
  { name: 'Bronze scimitar', metal: bronzeBar, numberOfBars: 2 },
  { name: 'Bronze longsword', metal: bronzeBar, numberOfBars: 2 },
  { name: 'Bronze 2h sword', metal: bronzeBar, numberOfBars: 3 },
  { name: 'Bronze battleaxe', metal: bronzeBar, numberOfBars: 3 },
  { name: 'Bronze warhammer', metal: bronzeBar, numberOfBars: 3 },
  { name: 'Bronze mace', metal: bronzeBar, numberOfBars: 1  },
  { name: 'Iron dagger#(unp)', metal: ironBar, numberOfBars: 1 },
  { name: 'Iron axe', metal: ironBar, numberOfBars: 1 },
  { name: 'Iron sword', metal: ironBar, numberOfBars: 1 },
  { name: 'Iron scimitar', metal: ironBar, numberOfBars: 2 },
  { name: 'Iron longsword', metal: ironBar, numberOfBars: 2 },
  { name: 'Iron 2h sword', metal: ironBar, numberOfBars: 3 },
  { name: 'Iron battleaxe', metal: ironBar, numberOfBars: 3 },
  { name: 'Iron warhammer', metal: ironBar, numberOfBars: 3 },
  { name: 'Iron mace', metal: ironBar, numberOfBars: 1  },
  { name: 'Steel dagger#(unp)', metal: steelBar, numberOfBars: 1 },
  { name: 'Steel axe', metal: steelBar, numberOfBars: 1 },
  { name: 'Steel sword', metal: steelBar, numberOfBars: 1 },
  { name: 'Steel scimitar', metal: steelBar, numberOfBars: 2 },
  { name: 'Steel longsword', metal: steelBar, numberOfBars: 2 },
  { name: 'Steel 2h sword', metal: steelBar, numberOfBars: 3 },
  { name: 'Steel battleaxe', metal: steelBar, numberOfBars: 3 },
  { name: 'Steel warhammer', metal: steelBar, numberOfBars: 3 },
  { name: 'Steel mace', metal: steelBar, numberOfBars: 1  },
  { name: 'Mithril dagger#(unp)', metal: mithrilBar, numberOfBars: 1 },
  { name: 'Mithril axe', metal: mithrilBar, numberOfBars: 1 },
  { name: 'Mithril sword', metal: mithrilBar, numberOfBars: 1 },
  { name: 'Mithril scimitar', metal: mithrilBar, numberOfBars: 2 },
  { name: 'Mithril longsword', metal: mithrilBar, numberOfBars: 2 },
  { name: 'Mithril 2h sword', metal: mithrilBar, numberOfBars: 3 },
  { name: 'Mithril battleaxe', metal: mithrilBar, numberOfBars: 3 },
  { name: 'Mithril warhammer', metal: mithrilBar, numberOfBars: 3 },
  { name: 'Mithril mace', metal: mithrilBar, numberOfBars: 1  },
  { name: 'Adamant dagger#(unp)', metal: adamantiteBar, numberOfBars: 1 },
  { name: 'Adamant axe', metal: adamantiteBar, numberOfBars: 1 },
  { name: 'Adamant sword', metal: adamantiteBar, numberOfBars: 1 },
  { name: 'Adamant scimitar', metal: adamantiteBar, numberOfBars: 2 },
  { name: 'Adamant longsword', metal: adamantiteBar, numberOfBars: 2 },
  { name: 'Adamant 2h sword', metal: adamantiteBar, numberOfBars: 3 },
  { name: 'Adamant battleaxe', metal: adamantiteBar, numberOfBars: 3 },
  { name: 'Adamant warhammer', metal: adamantiteBar, numberOfBars: 3 },
  { name: 'Adamant mace', metal: adamantiteBar, numberOfBars: 1  },
  { name: 'Rune dagger#(unp)', metal: runiteBar, numberOfBars: 1 },
  { name: 'Rune axe', metal: runiteBar, numberOfBars: 1 },
  { name: 'Rune sword', metal: runiteBar, numberOfBars: 1 },
  { name: 'Rune scimitar', metal: runiteBar, numberOfBars: 2 },
  { name: 'Rune longsword', metal: runiteBar, numberOfBars: 2 },
  { name: 'Rune 2h sword', metal: runiteBar, numberOfBars: 3 },
  { name: 'Rune battleaxe', metal: runiteBar, numberOfBars: 3 },
  { name: 'Rune warhammer', metal: runiteBar, numberOfBars: 3 },
  { name: 'Rune mace', metal: runiteBar, numberOfBars: 1  },
];

const armour: SmithableItem[] = [
  { name: 'Bronze med helm', metal: bronzeBar, numberOfBars: 1 },
  { name: 'Bronze full helm', metal: bronzeBar, numberOfBars: 2 },
  { name: 'Bronze chainbody', metal: bronzeBar, numberOfBars: 3},
  { name: 'Bronze platebody', metal: bronzeBar, numberOfBars: 5 },
  { name: 'Bronze plateskirt', metal: bronzeBar, numberOfBars: 3 },
  { name: 'Bronze platelegs', metal: bronzeBar, numberOfBars: 3 },
  { name: 'Bronze sq shield', metal: bronzeBar, numberOfBars: 2 },
  { name: 'Bronze kiteshield', metal: bronzeBar, numberOfBars: 3 },
  { name: 'Iron med helm', metal: ironBar, numberOfBars: 1 },
  { name: 'Iron full helm', metal: ironBar, numberOfBars: 2 },
  { name: 'Iron chainbody', metal: ironBar, numberOfBars: 3},
  { name: 'Iron platebody', metal: ironBar, numberOfBars: 5 },
  { name: 'Iron plateskirt', metal: ironBar, numberOfBars: 3 },
  { name: 'Iron platelegs', metal: ironBar, numberOfBars: 3 },
  { name: 'Iron sq shield', metal: ironBar, numberOfBars: 2 },
  { name: 'Iron kiteshield', metal: ironBar, numberOfBars: 3 },
  { name: 'Steel med helm', metal: steelBar, numberOfBars: 1 },
  { name: 'Steel full helm', metal: steelBar, numberOfBars: 2 },
  { name: 'Steel chainbody', metal: steelBar, numberOfBars: 3},
  { name: 'Steel platebody', metal: steelBar, numberOfBars: 5 },
  { name: 'Steel plateskirt', metal: steelBar, numberOfBars: 3 },
  { name: 'Steel platelegs', metal: steelBar, numberOfBars: 3 },
  { name: 'Steel sq shield', metal: steelBar, numberOfBars: 2 },
  { name: 'Steel kiteshield', metal: steelBar, numberOfBars: 3 },
  { name: 'Mithril med helm', metal: mithrilBar, numberOfBars: 1 },
  { name: 'Mithril full helm', metal: mithrilBar, numberOfBars: 2 },
  { name: 'Mithril chainbody', metal: mithrilBar, numberOfBars: 3},
  { name: 'Mithril platebody', metal: mithrilBar, numberOfBars: 5 },
  { name: 'Mithril plateskirt', metal: mithrilBar, numberOfBars: 3 },
  { name: 'Mithril platelegs', metal: mithrilBar, numberOfBars: 3 },
  { name: 'Mithril sq shield', metal: mithrilBar, numberOfBars: 2 },
  { name: 'Mithril kiteshield', metal: mithrilBar, numberOfBars: 3 },
  { name: 'Adamant med helm', metal: adamantiteBar, numberOfBars: 1 },
  { name: 'Adamant full helm', metal: adamantiteBar, numberOfBars: 2 },
  { name: 'Adamant chainbody', metal: adamantiteBar, numberOfBars: 3},
  { name: 'Adamant platebody', metal: adamantiteBar, numberOfBars: 5 },
  { name: 'Adamant plateskirt', metal: adamantiteBar, numberOfBars: 3 },
  { name: 'Adamant platelegs', metal: adamantiteBar, numberOfBars: 3 },
  { name: 'Adamant sq shield', metal: adamantiteBar, numberOfBars: 2 },
  { name: 'Adamant kiteshield', metal: adamantiteBar, numberOfBars: 3 },
  { name: 'Rune med helm', metal: runiteBar, numberOfBars: 1 },
  { name: 'Rune full helm', metal: runiteBar, numberOfBars: 2 },
  { name: 'Rune chainbody', metal: runiteBar, numberOfBars: 3},
  { name: 'Rune platebody', metal: runiteBar, numberOfBars: 5 },
  { name: 'Rune plateskirt', metal: runiteBar, numberOfBars: 3 },
  { name: 'Rune platelegs', metal: runiteBar, numberOfBars: 3 },
  { name: 'Rune sq shield', metal: runiteBar, numberOfBars: 2 },
  { name: 'Rune kiteshield', metal: runiteBar, numberOfBars: 3 },
];

export const smithableItems = [...weapons, ...armour];
