import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

type ItemPriceData = {
  high: number;
  highTime: number;
  low: number;
  lowTime: number;
};

type ResponseObject = {
  [itemId: string]: ItemPriceData;
};

export function useLatestPrices(): UseQueryResult<ResponseObject> {
  const getPriceData = useCallback<() => Promise<ResponseObject>>(
    async () => (await fetch('https://localhost:3000/osrs/latest')).json(),
    [],
  );
  return useQuery({ queryKey: ['latest_prices'], queryFn: getPriceData });
}
