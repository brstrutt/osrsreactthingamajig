import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { getOsrsApiQueryOptions } from './osrs';

export type ItemDetails = {
  id: number;
  name: string;
  members: boolean;
  examine: string;
  lowalch?: number;
  highalch?: number;
  limit: number;
  value: number;
  icon: string;
};

export function useOsrsMappingApi(): UseSuspenseQueryResult<
  ItemDetails[],
  unknown
> {
  return useSuspenseQuery(useOsrsMappingApiQueryOptions());
}

export function useOsrsMappingApiQueryOptions(): UseSuspenseQueryOptions<
  ItemDetails[],
  unknown
> {
  return getOsrsApiQueryOptions('mapping');
}
