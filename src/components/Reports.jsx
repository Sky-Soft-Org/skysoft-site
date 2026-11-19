import { useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { BarMarker } from './Logo.jsx';
import Icon from './Icon.jsx';

const TABS = [
  { id: 'acc', title: 'acc.h', text: 'acc.p' },
  { id: 'ops', title: 'ops.h', text: 'ops.p' },
  { id: 'inv', title: 'inv.h', text: 'inv.p' },
];

const BALANCES = [
  { label: 'acc.cash', value: '48,200' },
  { label: 'acc.bank', value: '132,750' },
  { label: 'acc.cust', value: '64,310' },
  { label: 'acc.sup', value: '−27,900', negative: true },
];

const WAREHOUSES = [
  { label: 'ops.w1', fill: 82 },
  { label: 'ops.w2', fill: 64 },
  { label: 'ops.w3', fill: 23, low: true },
];

const INVOICE_LINES = [
  { label: 'inv.l1', value: '2,136' },
  { label: 'inv.l2', value: '3,490' },
  { label: 'inv.l3', value: '1,914' },
];

function Ledger({ rows, total }) {
  const { t } = useLang();
  return (
    <table className="ledger">
      <tbody>
        {rows.map((r) => (
          <tr key={r.label}>
            <th scope="row">{t(r.label)}</th>
            <td><span className={r.negative ? 'num neg' : 'num'}>{r.value}</span></td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">{t(total.label)}</th>
          <td><span className="num">{total.value}</span></td>
        </tr>
      </tfoot>
    </table>
  );
}

export default function Reports() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  const select = (i, focus) => {
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  };

  // Vertical tablist: Up/Down move and wrap, Home/End jump
  const onKeyDown = (e, i) => {
    const last = TABS.length - 1;
    const next = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  };

  const panelProps = (i) => ({
    className: 'panel',
    id: `panel-${TABS[i].id}`,
    role: 'tabpanel',
    'aria-labelledby': `tab-${TABS[i].id}`,
    tabIndex: 0,
    hidden: active !== i,
  });

  return (
    <section className="section" id="reports" aria-labelledby="rep-title">
      <div className="container split">
        <div>
          <header className="section-head">
            <p className="kicker"><BarMarker bar={1} /><span>{t('nav.reports')}</span></p>
            <h2 id="rep-title">{t('rep.title')}</h2>
            <p className="sub">{t('rep.sub')}</p>
          </header>

          <div className="tabs" role="tablist" aria-orientation="vertical" aria-label={t('label.tabs')}>
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                ref={(el) => { tabRefs.current[i] = el; }}
                className="tab"
                id={`tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={active === i}
                aria-controls={`panel-${tab.id}`}
                tabIndex={active === i ? 0 : -1}
                onClick={() => select(i, false)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className="tab-title">{t(tab.title)}</span>
                <span className="tab-text">{t(tab.text)}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="screen">
          <div className="screen-bar"><span className="ltr">reports.skysoft.app</span></div>

          {/* Accounting */}
          <div {...panelProps(0)}>
            <div className="panel-head">
              <b>{t('acc.t')}</b>
              <span className="chip">{t('chip.month')}</span>
            </div>
            <Ledger rows={BALANCES} total={{ label: 'acc.total', value: '217,360' }} />
          </div>

          {/* Operations */}
          <div {...panelProps(1)}>
            <div className="panel-head">
              <b>{t('ops.t')}</b>
              <span className="chip chip-live">{t('chip.live')}</span>
            </div>
            <div className="meters">
              {WAREHOUSES.map((w) => (
                <div key={w.label}>
                  <div className="meter-label">
                    <span>{t(w.label)}</span>
                    <span className="num">{w.fill}%</span>
                  </div>
                  <div className={w.low ? 'meter low' : 'meter'}>
                    <i style={{ '--w': `${w.fill}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <p className="note">{t('ops.alert')}</p>
            <p className="transfer">
              <span>{t('ops.w1')}</span>
              <Icon name="arrow" className="ico arrow" />
              <span>{t('ops.w3')}</span>
              <em>{t('ops.tr')}</em>
            </p>
          </div>

          {/* Invoicing */}
          <div {...panelProps(2)}>
            <div className="panel-head">
              <div><b>{t('inv.t')}</b> <span className="num muted">INV‑1042</span></div>
              <span className="chip chip-paid">{t('inv.paid')}</span>
            </div>
            <p className="billed"><span>{t('inv.to')}</span> <b>Sky Wear</b></p>
            <Ledger rows={INVOICE_LINES} total={{ label: 'inv.total', value: '7,540' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
