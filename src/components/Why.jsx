import { useLang } from '../i18n/LanguageContext.jsx';
import Icon from './Icon.jsx';

const REASONS = [
  { icon: 'globe', key: 'w1' },
  { icon: 'monitor', key: 'w2' },
  { icon: 'chart', key: 'w3' },
  { icon: 'shield', key: 'w4' },
  { icon: 'sliders', key: 'w5' },
  { icon: 'headset', key: 'w6' },
];

export default function Why() {
  const { t } = useLang();

  return (
    <section className="section" id="why" aria-labelledby="why-title">
      <div className="container">
        <header className="section-head">
          <h2 id="why-title">{t('why.title')}</h2>
        </header>
        <ul className="why-grid">
          {REASONS.map((r) => (
            <li key={r.key}>
              <Icon name={r.icon} />
              <h3>{t(`${r.key}.h`)}</h3>
              <p>{t(`${r.key}.p`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
