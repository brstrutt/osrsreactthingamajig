import { JSX } from 'react';
import { SmithingProfitTable } from './table';
import { OsrsItem } from '../../shared';

export function SmithingProfitTab(): JSX.Element {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <OsrsItem itemName={'Nature rune'} data={'geValueLow'} />
      </div>
      <div style={{ display: 'flex' }}>
        <OsrsItem itemName={'Copper ore'} data={'geValueLow'} />
        <OsrsItem itemName={'Tin ore'} data={'geValueLow'} />
        <OsrsItem itemName={'Iron ore'} data={'geValueLow'} />
        <OsrsItem itemName={'Coal'} data={'geValueLow'} />
        <OsrsItem itemName={'Mithril ore'} data={'geValueLow'} />
        <OsrsItem itemName={'Adamantite ore'} data={'geValueLow'} />
        <OsrsItem itemName={'Runite ore'} data={'geValueLow'} />
      </div>
      <div style={{ display: 'flex' }}>
        <OsrsItem itemName={'Bronze bar'} data={'geValueLow'} />
        <OsrsItem itemName={'Iron bar'} data={'geValueLow'} />
        <OsrsItem itemName={'Steel bar'} data={'geValueLow'} />
        <OsrsItem itemName={'Mithril bar'} data={'geValueLow'} />
        <OsrsItem itemName={'Adamantite bar'} data={'geValueLow'} />
        <OsrsItem itemName={'Runite bar'} data={'geValueLow'} />
      </div>
      <SmithingProfitTable />
    </>
  );
}
