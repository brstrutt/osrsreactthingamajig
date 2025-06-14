import { ReactNode, Suspense, useMemo, type JSX } from 'react';
import { ItemDetails, useOsrsMappingApi, useOsrs1hApi } from './api';
import DefaultErrorBoundary from './default-error-boundary';

function HighAlchProfitTable(): JSX.Element {
  return (
    <DefaultErrorBoundary>
      <Suspense fallback={<div>Loading High Alch Profit Table...</div>}>
        <LoadedTable />
      </Suspense>
    </DefaultErrorBoundary>
  )
}

function LoadedTable(): JSX.Element {
  const tableData = useTableData();
  const natureRuneData = useMemo(
    () => tableData.find((item) => item.id === 561),
    [tableData]
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Latest Low Price</th>
          <th>High Alch Value</th>
          <th>Profit</th>
          <th>Percentage Profit</th>
        </tr>
      </thead>
      <tbody>
        {natureRuneData && <TableRowComponent item={natureRuneData}/>}
        {natureRuneData && tableData.map((item) => <TableRowComponent key={item.id} item={item}/>)}
      </tbody>
    </table>
  );
}

type TableRow = {
    name: string,
    id: number,
    geValue: number,
    highAlch: number,
    profit: number,
    precentageProfit: number,
    icon: ReactNode,
}

function useTableData(): TableRow[] {
  const items = useOsrsMappingApi().data;
  const prices = useOsrs1hApi().data.data;
  const natureRunePrice: number = useMemo(
    () => 561 in prices ? prices[561].avgLowPrice ?? prices[561].avgHighPrice ?? 180 : 180,
    [prices],
  );

  return useMemo(
    () => items
        .filter((item) => !item.members)
        .filter((item) => item.id in prices)
        .filter((item): item is Omit<ItemDetails, 'highalch'> & {highalch: number} => item.highalch !== undefined) // Filter out any items with no high alch value. Complex code to make sure compiler knows that highAlch CAN'T be undefined anymore
        .map((item) => {
            const geValue = prices[item.id].avgLowPrice ?? prices[item.id].avgHighPrice ?? item.value;
            const cost = geValue + natureRunePrice;
            const profit = item.highalch - cost;
            const precentageProfit = Math.round((profit/cost) * 100);
            return {
                name: item.name,
                id: item.id,
                geValue,
                highAlch: item.highalch,
                profit,
                precentageProfit,
                icon: <img src={`https://oldschool.runescape.wiki/images/${item.icon.replaceAll(' ', '_')}`}/>
            };
        }),
    [items, prices, natureRunePrice],
  );
}

function TableRowComponent(props: {item: TableRow}): JSX.Element {
    const {item} = props;
    return (
        <tr>
            <th>
                {item.icon}
                {item.name}
            </th>
            <th>{item.geValue}</th>
            <th>{item.highAlch}</th>
            <th>{item.profit.toString()}</th>
            <th>{item.precentageProfit.toString()}%</th>
        </tr>
    )
}

export default HighAlchProfitTable;
