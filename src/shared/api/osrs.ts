import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { useCallback } from 'react';

export function useOsrsApi<Response>(
  endpoint: string,
): UseSuspenseQueryResult<Response> {
  const getItemDetails = useCallback<() => Promise<Response>>(
    async () =>
      (
        await fetch('https://prices.runescape.wiki/api/v1/osrs/' + endpoint)
      ).json(),
    [endpoint],
  );
  return useSuspenseQuery({
    queryKey: ['osrs', endpoint],
    queryFn: getItemDetails,
  });
}
