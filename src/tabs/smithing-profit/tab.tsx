import { JSX } from 'react';
import { SmithingProfitTable } from './table';
import { OsrsItem } from '../../shared';

export function SmithingProfitTab(): JSX.Element {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <OsrsItem itemName={'Gold ore'} data={'geValueLow'} />
        <OsrsItem itemName={'Gold bar'} data={'geValueLow'} />
      </div>
      <div style={{ display: 'flex' }}>
        <OsrsItem itemName={'Sapphire'} data={'geValueLow'} />
        <OsrsItem itemName={'Emerald'} data={'geValueLow'} />
        <OsrsItem itemName={'Ruby'} data={'geValueLow'} />
        <OsrsItem itemName={'Diamond'} data={'geValueLow'} />
      </div>
      <div style={{ display: 'flex' }}>
        <OsrsItem itemName={'Uncut sapphire'} data={'geValueLow'} />
        <OsrsItem itemName={'Uncut emerald'} data={'geValueLow'} />
        <OsrsItem itemName={'Uncut ruby'} data={'geValueLow'} />
        <OsrsItem itemName={'Uncut diamond'} data={'geValueLow'} />
      </div>
      <SmithingProfitTable />
    </>
  );
}
