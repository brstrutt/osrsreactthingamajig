import { Suspense, useMemo, type JSX } from 'react';
import DefaultErrorBoundary from './shared/default-error-boundary';
import { OsrsItem, useOsrsItems } from './shared/use-osrs-items';
import filterUndefined from './shared/filter-undefined';

function HighAlchProfitTable(): JSX.Element {
  return (
    <DefaultErrorBoundary>
      <Suspense fallback={<div>Loading High Alch Profit Table...</div>}>
        <LoadedTable />
      </Suspense>
    </DefaultErrorBoundary>
  );
}

function LoadedTable(): JSX.Element {
  const tableData = useTableData();
  const natureRuneData = useMemo(
    () => tableData.find((item) => item.id === 561),
    [tableData],
  );

  const sortedTableData = useMemo(
    () => tableData.sort((left, right) => right.precentageProfit - left.precentageProfit),
    [tableData],
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Latest Low Price</th>
          <th>Cost</th>
          <th>High Alch Value</th>
          <th>Profit</th>
          <th>Percentage Profit</th>
        </tr>
      </thead>
      <tbody>
        {natureRuneData && <TableRowComponent item={natureRuneData} />}
        {natureRuneData &&
          sortedTableData.map((item) => (
            <TableRowComponent key={item.id} item={item} />
          ))}
      </tbody>
    </table>
  );
}

type TableRow = OsrsItem & {
  profit: number;
  cost: number,
  precentageProfit: number;
};

function useTableData(): TableRow[] {
  const items = useOsrsItems();
  const natureRune = useMemo(
    () => items.find((item) => item.id === 561),
    [items],
  );
  const natureRunePrice: number = useMemo(
    () => natureRune?.geValue ?? 180,
    [natureRune],
  );

  return useMemo(
    () =>
      items
        .filter(filterUndefined('highAlch'))
        .map((item) => {
          const geValue = item.geValue ?? item.value;
          const cost = geValue + natureRunePrice;
          const profit = item.highAlch - cost;
          const precentageProfit = Math.round((profit / cost) * 100);
          return {
            ...item,
            profit,
            cost,
            precentageProfit,
          };
        }),
    [items, natureRunePrice],
  );
}

function TableRowComponent(props: { item: TableRow }): JSX.Element {
  const { item } = props;
  return (
    <tr>
      <th>
        {item.iconComponent}
        {item.name}
      </th>
      <th>{item.geValue}</th>
      <th>{item.cost}</th>
      <th>{item.highAlch}</th>
      <th>{item.profit.toString()}</th>
      <th>{item.precentageProfit.toString()}%</th>
    </tr>
  );
}

export default HighAlchProfitTable;
