import { JSX } from 'react';
import { PickupProfitTable } from './table';
import { OsrsItem } from '../../shared';

export function PickupProfitTab(): JSX.Element {
  return (
    <>
      <OsrsItem itemName={'Antipoison#(2)'} data={'geValueHigh'} />
      <PickupProfitTable />
    </>
  );
}
