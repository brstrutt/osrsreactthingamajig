import { UseSuspenseQueryResult } from '@tanstack/react-query';
import { useOsrsApi } from './osrs';

export type AverageItemPriceData = {
  avgHighPrice: number | null;
  highPriceVolume: number | null;
  avgLowPrice: number | null;
  lowPriceVolume: number | null;
};

export type AverageItemPrices = {
  [itemId: string]: AverageItemPriceData;
};

export function useOsrs5mApi(): UseSuspenseQueryResult<{
  data: AverageItemPrices;
}> {
  return useOsrsApi('5m');
}

export function useOsrs1hApi(): UseSuspenseQueryResult<{
  data: AverageItemPrices;
}> {
  return useOsrsApi('1h');
}
