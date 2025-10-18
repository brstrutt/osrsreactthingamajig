import { ReactNode, useMemo } from 'react';
import {
  useOsrs1hApiQueryOptions,
  useOsrsLatestApiQueryOptions,
  useOsrsMappingApiQueryOptions,
} from './api';
import { useSuspenseQueries } from '@tanstack/react-query';
import './use-osrs-items.css';

export type OsrsItemData = {
  id: number;
  name: string;
  iconComponent: ReactNode;
  value: number;
  geValue?: number;
  geValueHigh?: number;
  geValueLow?: number;
  geVolume?: number;
  highAlch?: number;
};

export function useOsrsItems(): OsrsItemData[] {
  const result = useSuspenseQueries({
    queries: [
      useOsrsMappingApiQueryOptions(),
      useOsrsLatestApiQueryOptions(),
      useOsrs1hApiQueryOptions(),
    ],
    combine: (results) => ({
      items: results[0].data,
      latestprices: results[1].data.data,
      averagePrices: results[2].data.data,
    }),
  });

  return useMemo(
    () =>
      result.items
        .filter((item) => !item.members)
        .filter((item) => item.id in result.latestprices)
        .filter((item) => item.id in result.averagePrices)
        .map((item) => {
          const prices = result.latestprices[item.id];
          const averagePrices = result.averagePrices[item.id];

          let geValue = undefined;
          if (prices.high && prices.low) {
            geValue = (prices.high + prices.low) / 2;
          } else if (prices.high) {
            geValue = prices.high;
          } else if (prices.low) {
            geValue = prices.low;
          }

          let geVolume = undefined;
          if (averagePrices.highPriceVolume && averagePrices.lowPriceVolume) {
            geVolume =
              averagePrices.highPriceVolume + averagePrices.lowPriceVolume;
          } else if (averagePrices.highPriceVolume) {
            geVolume = averagePrices.highPriceVolume;
          } else if (averagePrices.lowPriceVolume) {
            geVolume = averagePrices.lowPriceVolume;
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
            geValueHigh: prices.high ?? undefined,
            geValueLow: prices.low ?? undefined,
            geVolume,
            highAlch: item.highalch,
          };
        }),
    [result.averagePrices, result.items, result.latestprices],
  );
}
