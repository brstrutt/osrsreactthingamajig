import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { useOsrsApiQueryOptions } from './osrs';

export type AverageItemPriceData = {
  avgHighPrice: number | null;
  highPriceVolume: number;
  avgLowPrice: number | null;
  lowPriceVolume: number;
};

export type AverageItemPrices = {
  [itemId: string]: AverageItemPriceData;
};

type Response = { data: AverageItemPrices };

export function useOsrs5mApi(): UseSuspenseQueryResult<Response> {
  return useSuspenseQuery(useOsrs5mApiQueryOptions());
}

export function useOsrs5mApiQueryOptions(): UseSuspenseQueryOptions<Response> {
  return useOsrsApiQueryOptions('5m');
}

export function useOsrs1hApi(): UseSuspenseQueryResult<Response> {
  return useSuspenseQuery(useOsrs1hApiQueryOptions());
}

export function useOsrs1hApiQueryOptions(): UseSuspenseQueryOptions<Response> {
  return useOsrsApiQueryOptions('1h');
}
