import { ItemName } from '../../shared';

const miningItems: ItemName[] = [
  'Rune essence',
  'Clay',
  'Copper ore',
  'Tin ore',
  'Blurite ore',
  'Barronite shards',
  'Iron ore',
  'Silver ore',
  'Coal',
  'Gold ore',
  'Mithril ore',
  'Adamantite ore',
  'Runite ore',
];

const woodcuttingItems: ItemName[] = [
  'Logs',
  'Oak logs',
  'Willow logs',
  'Maple logs',
  'Yew logs',
];

const fishingItems: ItemName[] = [
  'Raw shrimps',
  'Raw guppy',
  'Raw anchovies',
  'Raw cavefish',
  'Raw tetra',
  'Raw sardine',
  'Raw herring',
  'Raw trout',
  'Raw pike',
  'Raw salmon',
  'Raw tuna',
  'Raw swordfish',
  'Raw lobster',
];

const cookingItems: ItemName[] = [
  'Shrimps',
  'Guppy',
  'Anchovies',
  'Cavefish',
  'Tetra',
  'Sardine',
  'Herring',
  'Trout',
  'Pike',
  'Salmon',
  'Tuna',
  'Swordfish',
  'Lobster',
];

export const allF2pGatheringItems: ItemName[] = [
  ...miningItems,
  ...woodcuttingItems,
  ...fishingItems,
  ...cookingItems,
];
