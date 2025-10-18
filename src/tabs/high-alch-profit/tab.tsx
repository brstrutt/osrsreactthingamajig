import { JSX } from 'react';
import { HighAlchProfitTable } from './table';
import { OsrsItem } from '../../shared';

export function HighAlchProfitTab(): JSX.Element {
  return (
    <>
      <OsrsItem itemName={'Nature rune'} data={'geValueLow'} />
      <HighAlchProfitTable />
    </>
  );
}
