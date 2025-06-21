import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { useOsrsApiQueryOptions } from './osrs';

type ItemPriceData = {
  high: number | null;
  highTime: number | null;
  low: number | null;
  lowTime: number | null;
};

export type ItemPrices = {
  [itemId: string]: ItemPriceData;
};

type Response = { data: ItemPrices };

export function useOsrsLatestApi(): UseSuspenseQueryResult<Response, unknown> {
  return useSuspenseQuery(useOsrsLatestApiQueryOptions());
}

export function useOsrsLatestApiQueryOptions(): UseSuspenseQueryOptions<Response, unknown> {
  return useOsrsApiQueryOptions('latest');
}
