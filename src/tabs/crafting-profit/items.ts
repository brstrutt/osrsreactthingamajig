import { assertTypeExtendsType, ItemName } from "../../shared";

export type GemName = 'Sapphire' | 'Emerald' | 'Ruby' | 'Diamond';
assertTypeExtendsType<GemName, ItemName>();

export type CraftableJewellery = {
  name: ItemName,
  gem: GemName,
}

export const jewellery: CraftableJewellery[] = [
  {name: 'Sapphire ring', gem: 'Sapphire'},
  {name: 'Sapphire necklace', gem: 'Sapphire'},
  {name: 'Sapphire amulet (u)', gem: 'Sapphire'},
  {name: 'Emerald ring', gem: 'Emerald'},
  {name: 'Emerald necklace', gem: 'Emerald'},
  {name: 'Emerald amulet (u)', gem: 'Emerald'},
  {name: 'Ruby ring', gem: 'Ruby'},
  {name: 'Ruby necklace', gem: 'Ruby'},
  {name: 'Ruby amulet (u)', gem: 'Ruby'},
  {name: 'Diamond ring', gem: 'Diamond'},
  {name: 'Diamond necklace', gem: 'Diamond'},
  {name: 'Diamond amulet (u)', gem: 'Diamond'},
];
