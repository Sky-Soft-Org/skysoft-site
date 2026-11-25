import { useLang } from '../i18n/LanguageContext.jsx';
import { COMPANY, whatsappUrl } from '../data/company.js';
import { ALL_PRODUCTS } from '../data/products.js';
import Icon from './Icon.jsx';

// Sky Soft takes requests and questions on WhatsApp or by phone, so the
// section offers exactly those two, plus one-tap questions about each product.
export default function Contact() {
  const { t } = useLang();
  const ask = (productTitle) => whatsappUrl(t('wa.ask').replace('{x}', t(productTitle)));

  return (
    <section className="section contact" id="contact" aria-labelledby="cta-title">
      <div className="container contact-grid">
        <div className="contact-intro">
          <h2 id="cta-title">{t('cta.title')}</h2>
          <p className="sub">{t('cta.sub')}</p>

          <h3 className="asks-title" id="asks-title">{t('cta.asks')}</h3>
          <ul className="asks" aria-labelledby="asks-title">
            {ALL_PRODUCTS.map((p) => (
              <li key={p.id}>
                <a className="pick" href={ask(p.title)} target="_blank" rel="noopener noreferrer">
                  <span>
                    <Icon name={p.icon} />
                    {t(p.title)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="reach">
          <div className="reach-item">
            <span className="reach-ico reach-ico-wa"><Icon name="whatsapp" /></span>
            <div>
              <h3>{t('ch.whatsapp')}</h3>
              <p>{t('ch.whatsappSub')}</p>
              <p className="reach-num ltr">{COMPANY.phone}</p>
            </div>
            <a className="btn btn-primary" href={whatsappUrl(t('wa.hello'))} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" />
              <span>{t('cta.wa')}</span>
            </a>
          </div>

          <div className="reach-item">
            <span className="reach-ico"><Icon name="phone" /></span>
            <div>
              <h3>{t('ch.phone')}</h3>
              <p>{t('ch.phoneSub')}</p>
              <p className="reach-num ltr">{COMPANY.phone}</p>
            </div>
            <a className="btn btn-secondary" href={COMPANY.phoneHref}>
              <Icon name="phone" />
              <span>{t('cta.call')}</span>
            </a>
          </div>

          <ul className="reach-meta">
            {COMPANY.email && (
              <li>
                <Icon name="mail" />
                <a href={`mailto:${COMPANY.email}`} className="ltr">{COMPANY.email}</a>
              </li>
            )}
            <li>
              <Icon name="pin" />
              <span>{t('foot.addr')}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
