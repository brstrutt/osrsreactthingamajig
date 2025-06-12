import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

type ItemPriceData = {
  high: number;
  highTime: number;
  low: number;
  lowTime: number;
};

export type ItemPrices = {
  [itemId: string]: ItemPriceData;
};

type ResponseObject = {
  data: ItemPrices;
};

export function useLatestPrices(): UseQueryResult<ResponseObject> {
  const getPriceData = useCallback<() => Promise<ResponseObject>>(
    async () =>
      (await fetch('https://prices.runescape.wiki/api/v1/osrs/latest')).json(),
    [],
  );
  return useQuery({ queryKey: ['latest_prices'], queryFn: getPriceData });
}
