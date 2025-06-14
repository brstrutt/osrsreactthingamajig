import { UseSuspenseQueryResult } from '@tanstack/react-query';
import { useOsrsApi } from './osrs';

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

export function useOsrsMappingApi(): UseSuspenseQueryResult<ItemDetails[]> {
  return useOsrsApi('mapping');
}
