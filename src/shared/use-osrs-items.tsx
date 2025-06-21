import { ReactNode, useMemo } from 'react';
import { useOsrs1hApiQueryOptions, useOsrsMappingApiQueryOptions } from './api';
import { useSuspenseQueries } from '@tanstack/react-query';

export type OsrsItem = {
  id: number;
  name: string;
  iconComponent: ReactNode;
  value: number;
  geValue?: number;
  highAlch?: number;
};

export function useOsrsItems(): OsrsItem[] {
  const result = useSuspenseQueries({
    queries: [useOsrsMappingApiQueryOptions(), useOsrs1hApiQueryOptions()],
    combine: (results) => ({
      items: results[0].data,
      prices: results[1].data.data,
    }),
  });

  return useMemo(
    () =>
      result.items
        .filter((item) => !item.members)
        .filter((item) => item.id in result.prices)
        .map((item) => {
          const geValue =
            result.prices[item.id].avgLowPrice ??
            result.prices[item.id].avgHighPrice ??
            undefined;
          return {
            name: item.name,
            id: item.id,
            iconComponent: (
              <span className="osrsItemIconWrapper">
                <img
                  src={`https://oldschool.runescape.wiki/images/${item.icon.replaceAll(' ', '_')}`}
                />
              </span>
            ),
            value: item.value,
            geValue,
            highAlch: item.highalch,
          };
        }),
    [result.items, result.prices],
  );
}
