import { useLang } from '../i18n/LanguageContext.jsx';
import { COMPANY, whatsappUrl } from '../data/company.js';
import { Brand } from './Logo.jsx';

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
          <a href="#erp">{t('erp.title')}</a>
          <a href="#reports">{t('nav.reports')}</a>
          <a href="#sales">{t('sales.title')}</a>
          <a href="#marketplace">{t('p3.title')}</a>
          <a href="#wear">{t('wear.title')}</a>
          <a href="#restaurant">{t('rest.title')}</a>
        </div>
        <div className="foot-col">
          <h2>{t('foot.company')}</h2>
          <a href="#about">{t('foot.about2')}</a>
          <a href="#process">{t('foot.process')}</a>
          <a href="#faq">{t('foot.faq')}</a>
        </div>
        <div className="foot-col">
          <h2>{t('nav.contact')}</h2>
          <a href={COMPANY.phoneHref} className="ltr">{COMPANY.phone}</a>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">{t('ch.whatsapp')}</a>
          {COMPANY.email && <a href={`mailto:${COMPANY.email}`} className="ltr">{COMPANY.email}</a>}
          <span>{t('foot.addr')}</span>
        </div>
      </div>
      <div className="container foot-bottom">
        <span>{t('foot.copy')}</span>
      </div>
    </footer>
  );
}
