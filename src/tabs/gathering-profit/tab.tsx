import { JSX } from 'react';
import { GatheringProfitTable } from './table';
import { OsrsItem } from '../../shared';

export function GatheringProfitTab(): JSX.Element {
  return (
    <>
      <OsrsItem itemName={'Antipoison#(2)'} />
      <GatheringProfitTable />
    </>
  );
}
