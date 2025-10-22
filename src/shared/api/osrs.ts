import { UseSuspenseQueryOptions } from '@tanstack/react-query';

export type OsrsEndpoints = 'latest' | 'mapping' | '5m' | '1h' | 'timeseries';

export function getOsrsApiQueryOptions<Response>(
  endpoint: OsrsEndpoints,
  queryParams?: URLSearchParams,
): UseSuspenseQueryOptions<Response, unknown> {
  const queryParamsString = queryParams?.toString();
  let url = 'https://prices.runescape.wiki/api/v1/osrs/' + endpoint;
  if (queryParamsString) {
    url += '?' + queryParamsString;
  }
  return {
    queryKey: ['osrs', endpoint, queryParamsString],
    queryFn: async () => (await fetch(url)).json(),
  };
}
