import { useLang } from '../i18n/LanguageContext.jsx';
import Icon from './Icon.jsx';

const QUESTIONS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

export default function Faq() {
  const { t } = useLang();

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <header className="section-head">
          <h2 id="faq-title">{t('faq.title')}</h2>
          <a href="#contact" className="text-link">{t('faq.ask')}</a>
        </header>

        {/* Native disclosure: works without JS; name="faq" keeps one answer open at a time */}
        <div className="faq">
          {QUESTIONS.map((q) => (
            <details key={q} name="faq">
              <summary>
                <span>{t(`faq.${q}`)}</span>
                <Icon name="plus" />
              </summary>
              <p>{t(`faq.${q}a`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
