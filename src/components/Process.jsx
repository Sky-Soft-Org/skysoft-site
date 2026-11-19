import { useLang } from '../i18n/LanguageContext.jsx';

const STEPS = ['s1', 's2', 's3', 's4'];

export default function Process() {
  const { t } = useLang();

  return (
    <section className="section" id="process" aria-labelledby="proc-title">
      <div className="container">
        <header className="section-head">
          <h2 id="proc-title">{t('proc.title')}</h2>
        </header>
        <ol className="steps">
          {STEPS.map((key, i) => (
            <li key={key}>
              <span className="step-num num" aria-hidden="true">{i + 1}</span>
              <h3>{t(`${key}.h`)}</h3>
              <p>{t(`${key}.p`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
