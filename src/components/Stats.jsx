import { useLang } from '../i18n/LanguageContext.jsx';

// PLACEHOLDER numbers: replace with real figures
const STATS = [
  { value: '+1,200', label: 'stat.clients' },
  { value: '15+', label: 'stat.years' },
  { value: '3', label: 'stat.platforms' },
  { value: '24/7', label: 'stat.support' },
];

export default function Stats() {
  const { t } = useLang();

  return (
    <section className="stats" aria-label={t('label.stats')}>
      <div className="container">
        <dl className="stats-row">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt>{t(s.label)}</dt>
              <dd className="num">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
