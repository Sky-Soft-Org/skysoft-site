import { useLang } from '../i18n/LanguageContext.jsx';

// PLACEHOLDER numbers: replace with real figures
const FACTS = [
  { value: '+1,200', label: 'stat.clients' },
  { value: '15+', label: 'stat.years' },
  { value: '6', label: 'stat.platforms' },
  { value: '24/7', label: 'stat.support' },
];

export default function About() {
  const { t } = useLang();

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div className="about-copy">
          <h2 id="about-title">{t('about.title')}</h2>
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>
        </div>
        <dl className="facts">
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt>{t(f.label)}</dt>
              <dd><span className="num">{f.value}</span></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
