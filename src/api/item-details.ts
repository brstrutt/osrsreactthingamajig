import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export type ItemDetails = {
  id: number;
  name: string;
  members: boolean;
  examine: string;
  lowalch: number;
  highalch: number;
  limit: number;
  value: number;
  icon: string;
};

type ResponseObject = ItemDetails[];

export function useItemDetails(): UseQueryResult<ResponseObject> {
  const getItemDetails = useCallback<() => Promise<ResponseObject>>(
    async () =>
      (await fetch('https://prices.runescape.wiki/api/v1/osrs/mapping')).json(),
    [],
  );
  return useQuery({ queryKey: ['item_details'], queryFn: getItemDetails });
}
