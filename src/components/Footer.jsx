import { useLang } from '../i18n/LanguageContext.jsx';
import { Brand } from './Logo.jsx';

// PLACEHOLDER contact details: replace with real ones
export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="container foot-grid">
        <div className="foot-brand">
          <Brand />
          <p>{t('foot.about')}</p>
        </div>
        <div className="foot-col">
          <h2>{t('nav.products')}</h2>
          <a href="#products">{t('p1.title')}</a>
          <a href="#reports">{t('nav.reports')}</a>
          <a href="#marketplace">{t('p3.title')}</a>
        </div>
        <div className="foot-col">
          <h2>{t('foot.company')}</h2>
          <a href="#">{t('foot.about2')}</a>
          <a href="#">{t('foot.partners')}</a>
          <a href="#">{t('foot.careers')}</a>
        </div>
        <div className="foot-col">
          <h2>{t('nav.contact')}</h2>
          <a href="#" className="ltr">+000 000 000 000</a>
          <a href="#" className="ltr">info@skysoft.example</a>
          <span>{t('foot.addr')}</span>
        </div>
      </div>
      <div className="container foot-bottom">
        <span>{t('foot.copy')}</span>
      </div>
    </footer>
  );
}
