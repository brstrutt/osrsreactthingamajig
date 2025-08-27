import { JSX, useState } from "react";
import { HighAlchProfitTable, HighAlchProfitTableSort } from "./table";
import { OsrsItem } from "../../shared";

export function HighAlchProfitTab(): JSX.Element {
  const [sortByPercentage, setSortByPercentage] = useState<boolean>(true);



  return <>
    <OsrsItem itemName={'Nature rune'} />
    <HighAlchProfitTable sortBy={sortByPercentage ? HighAlchProfitTableSort.percentage : HighAlchProfitTableSort.absolute}/>
    <button onClick={() => setSortByPercentage(!sortByPercentage)}>
      Toggle Sorting
    </button>
  </>;
}
