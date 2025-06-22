import { ReactNode, useMemo } from 'react';
import {
  useOsrs1hApiQueryOptions,
  useOsrsLatestApiQueryOptions,
  useOsrsMappingApiQueryOptions,
} from './api';
import { useSuspenseQueries } from '@tanstack/react-query';
import './use-osrs-items.css';

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
    queries: [
      useOsrsMappingApiQueryOptions(),
      useOsrsLatestApiQueryOptions(),
      useOsrs1hApiQueryOptions(),
    ],
    combine: (results) => ({
      items: results[0].data,
      latestprices: results[1].data.data,
      averagePrices: results[1].data.data,
    }),
  });

  return useMemo(
    () =>
      result.items
        .filter((item) => !item.members)
        .filter((item) => item.id in result.latestprices)
        .map((item) => {
          const prices = result.latestprices[item.id];

          let geValue = undefined;
          if (prices.high && prices.low) {
            geValue = (prices.high + prices.low) / 2;
          } else if (prices.high) {
            geValue = prices.high;
          } else if (prices.low) {
            geValue = prices.low;
          }

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
    [result.items, result.latestprices],
  );
}
