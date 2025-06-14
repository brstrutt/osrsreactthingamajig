import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
import { useCallback } from 'react';

type ItemPriceData = {
  high: number | null;
  highTime: number | null;
  low: number | null;
  lowTime: number | null;
};

export type ItemPrices = {
  [itemId: string]: ItemPriceData;
};

type ResponseObject = {
  data: ItemPrices;
};

export function useOsrsLatestApi(): UseSuspenseQueryResult<ResponseObject> {
  const getPriceData = useCallback<() => Promise<ResponseObject>>(
    async () =>
      (await fetch('https://prices.runescape.wiki/api/v1/osrs/latest')).json(),
    [],
  );
  return useSuspenseQuery({ queryKey: ['latest_prices'], queryFn: getPriceData });
}
