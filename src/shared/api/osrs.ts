import { UseSuspenseQueryOptions } from '@tanstack/react-query';
import { useMemo } from 'react';

export type OsrsEndpoints = 'latest' | 'mapping' | '5m' | '1h' | 'timeseries';

export function useOsrsApiQueryOptions<Response>(
  endpoint: OsrsEndpoints,
): UseSuspenseQueryOptions<Response> {
  return useMemo(() => getOsrsApiQueryOptions(endpoint), [endpoint]);
}

export function getOsrsApiQueryOptions<Response>(
  endpoint: OsrsEndpoints,
): UseSuspenseQueryOptions<Response> {
  return {
    queryKey: ['osrs', endpoint],
    queryFn: async () =>
      (
        await fetch('https://prices.runescape.wiki/api/v1/osrs/' + endpoint)
      ).json(),
  };
}
