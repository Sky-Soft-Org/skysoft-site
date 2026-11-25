import { useId } from 'react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { LogoBars } from './Logo.jsx';

const MENU = ['erp.m1', 'erp.m2', 'erp.m3', 'erp.m4', 'erp.m5', 'erp.m6', 'erp.m7', 'erp.m8', 'erp.m9', 'erp.m10'];
const FAVORITES = ['erp.f1', 'erp.f2', 'erp.f3'];

// Today's date the way the ERP shows it: weekday name, then yyyy/mm/dd in Latin digits
function today(lang) {
  const now = new Date();
  const day = new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-GB', { weekday: 'long' }).format(now);
  const pad = (n) => String(n).padStart(2, '0');
  return { day, date: `${now.getFullYear()}/${pad(now.getMonth() + 1)}/${pad(now.getDate())}` };
}

// A drawing of the Sky Soft ERP main screen, in the app's own colours
function ErpScreen() {
  const { t, lang } = useLang();
  const gradientId = useId();
  const { day, date } = today(lang);

  return (
    <div className="erp" role="img" aria-label={t('erp.alt')}>
      <div className="erp-title" aria-hidden="true">
        <LogoBars className="erp-title-mark" />
        <span>SKY SOFT</span>
        <span className="erp-controls"><i /><i /><i /></span>
      </div>
      <div className="erp-menu" aria-hidden="true">
        {MENU.map((key) => <span key={key}>{t(key)}</span>)}
      </div>
      <div className="erp-body" aria-hidden="true">
        <div className="erp-main">
          <svg className="erp-mark" viewBox="0 0 100 100">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#01CDFE" />
                <stop offset=".5" stopColor="#2CB0E8" />
                <stop offset="1" stopColor="#0454BF" />
              </linearGradient>
            </defs>
            <g fill={`url(#${gradientId})`}><LogoBars inline /></g>
          </svg>
          <span className="erp-word">SKY <b>SOFT</b></span>
        </div>
        <aside className="erp-side">
          <div className="erp-day">{day}</div>
          <div className="erp-date">{date}</div>
          <div className="erp-fav">{t('erp.fav')}</div>
          <ul>
            {FAVORITES.map((key) => <li key={key}>{t(key)}</li>)}
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1>{t('hero.title')}</h1>
          <p className="lead">{t('hero.lead')}</p>
          <div className="hero-cta">
            <a href="#live" className="btn btn-primary">{t('hero.cta1')}</a>
            <a href="#contact" className="btn btn-secondary">{t('hero.cta2')}</a>
          </div>
        </div>
        <ErpScreen />
      </div>
    </section>
  );
}
