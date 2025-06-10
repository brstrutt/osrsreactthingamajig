import { JSX } from "react";
import { useLatestPrices } from "./latest-prices-api";


function PricesTable(): JSX.Element {
  const latestPrices = useLatestPrices();
  return <>
    {latestPrices.status === 'pending' &&
      <div>table loading</div>
    }
    {latestPrices.status === 'error' &&
      <div>table ERROR!</div>
    }
    {latestPrices.status === 'success' &&
      Object.entries(latestPrices.data).map(
        (entry: any) => <div>{JSON.stringify(entry)}</div>
      )
    }
  </>;
}

export default PricesTable;