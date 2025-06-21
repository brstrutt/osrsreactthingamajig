import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';
import { useOsrsApiQueryOptions } from './osrs';
import { useMemo } from 'react';

export type AverageItemPriceData = {
  avgHighPrice: number | null;
  highPriceVolume: number;
  avgLowPrice: number | null;
  lowPriceVolume: number;
};

export type AverageItemPrices = {
  [itemId: string]: AverageItemPriceData;
};

type Response = { data: AverageItemPrices };

export function useOsrs5mApi(
  periodStartTime?: Date,
): UseSuspenseQueryResult<Response, unknown> {
  return useSuspenseQuery(useOsrs5mApiQueryOptions(periodStartTime));
}

export function useOsrs5mApiQueryOptions(
  periodStartTime?: Date,
): UseSuspenseQueryOptions<Response, unknown> {
  const timestampUnixSeconds = useMemo(() => {
    if (periodStartTime === undefined) return undefined;
    const unixSeconds = periodStartTime.getTime() / 1000;
    const roundedToFiveMinutes = Math.round(unixSeconds / 300) * 300;
    return roundedToFiveMinutes;
  }, [periodStartTime]);

  const queryParams = useMemo(
    () =>
      timestampUnixSeconds === undefined
        ? undefined
        : new URLSearchParams({ timestamp: timestampUnixSeconds.toString() }),
    [timestampUnixSeconds],
  );
  return useOsrsApiQueryOptions('5m', queryParams);
}

export function useOsrs1hApi(
  periodStartTime?: Date,
): UseSuspenseQueryResult<Response, unknown> {
  return useSuspenseQuery(useOsrs1hApiQueryOptions(periodStartTime));
}

export function useOsrs1hApiQueryOptions(
  periodStartTime?: Date,
): UseSuspenseQueryOptions<Response, unknown> {
  const timestampUnixSeconds = useMemo(() => {
    if (periodStartTime === undefined) return undefined;
    periodStartTime.setMinutes(0, 0, 0); // Drop anything smaller than hours. API rejects timestamps that aren't on the hour
    return periodStartTime.getTime() / 1000;
  }, [periodStartTime]);

  const queryParams = useMemo(
    () =>
      timestampUnixSeconds === undefined
        ? undefined
        : new URLSearchParams({ timestamp: timestampUnixSeconds.toString() }),
    [timestampUnixSeconds],
  );
  return useOsrsApiQueryOptions('1h', queryParams);
}
