import { useLang } from '../i18n/LanguageContext.jsx';
import { LogoBars } from './Logo.jsx';

// One label per bar of the logo, top to bottom
const SUITE = [
  { href: '#products', name: 'p1.title', type: 'p1.tag' },
  { href: '#reports', name: 'nav.reports', type: 'p2.badge' },
  { href: '#marketplace', name: 'p3.title', type: 'p3.tag' },
];

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>{t('hero.title')}</h1>
          <p className="lead">{t('hero.lead')}</p>
          <div className="hero-cta">
            <a href="#products" className="btn btn-primary">{t('hero.cta1')}</a>
            <a href="#contact" className="btn btn-secondary">{t('hero.cta2')}</a>
          </div>
        </div>

        {/* Hovering a label highlights its bar (see .suite:has() in styles.css) */}
        <div className="suite">
          <LogoBars className="suite-mark" />
          <ul className="suite-list" aria-label={t('nav.products')}>
            {SUITE.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  <b>{t(item.name)}</b>
                  <span>{t(item.type)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
