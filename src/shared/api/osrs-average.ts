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

export function useOsrs5mApi(): UseSuspenseQueryResult<Response, unknown> {
  return useSuspenseQuery(useOsrs5mApiQueryOptions());
}

export function useOsrs5mApiQueryOptions(): UseSuspenseQueryOptions<Response, unknown> {
  return useOsrsApiQueryOptions('5m');
}

export function useOsrs1hApi(): UseSuspenseQueryResult<Response, unknown> {
  return useSuspenseQuery(useOsrs1hApiQueryOptions());
}

export function useOsrs1hApiQueryOptions(): UseSuspenseQueryOptions<Response, unknown> {
  return useOsrsApiQueryOptions('1h');
}
