import { JSX } from "react";
import { OsrsItem } from "../../shared";

export function CraftingProfitTab(): JSX.Element {
  return <>
    <div style={{display: 'flex'}}>
      <OsrsItem itemName={'Gold ore'} />
      <OsrsItem itemName={'Gold bar'} />
    </div>
    <div style={{display: 'flex'}}>
      <OsrsItem itemName={'Sapphire'} />
      <OsrsItem itemName={'Emerald'} />
      <OsrsItem itemName={'Ruby'} />
      <OsrsItem itemName={'Diamond'} />
    </div>
  </>;
}
