import { UseSuspenseQueryResult } from '@tanstack/react-query';
import { useOsrsApi } from './osrs';

type ItemPriceData = {
  high: number | null;
  highTime: number | null;
  low: number | null;
  lowTime: number | null;
};

export type ItemPrices = {
  [itemId: string]: ItemPriceData;
};

export function useOsrsLatestApi(): UseSuspenseQueryResult<{
  data: ItemPrices;
}> {
  return useOsrsApi('latest');
}
