import { ReactNode, useMemo } from "react";
import { useOsrs1hApi, useOsrsMappingApi } from "./api";

export type OsrsItem = {
  id: number;
  name: string;
  iconComponent: ReactNode;
  value: number;
  geValue?: number;
  highAlch?: number;
};

export function useOsrsItems(): OsrsItem[] {
  const items = useOsrsMappingApi().data;
  const prices = useOsrs1hApi().data.data;

  return useMemo(
    () => 
      items
        .filter((item) => !item.members)
        .filter((item) => item.id in prices)
        .map((item) => {
          const geValue =
            prices[item.id].avgLowPrice ??
            prices[item.id].avgHighPrice ??
            undefined;
          return {
            name: item.name,
            id: item.id,
            iconComponent: <img src={`https://oldschool.runescape.wiki/images/${item.icon.replaceAll(' ', '_')}`}/>,
            value: item.value,
            geValue,
            highAlch: item.highalch,
          };
        }),
    [items, prices],
  );
}
