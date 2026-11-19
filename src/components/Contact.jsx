import { useLang } from '../i18n/LanguageContext.jsx';
import Icon from './Icon.jsx';

// TODO: point these at the real booking page and WhatsApp number
const DEMO_URL = '#';
const WHATSAPP_URL = '#';

export default function Contact() {
  const { t } = useLang();

  return (
    <section className="cta" id="contact" aria-labelledby="cta-title">
      <div className="container">
        <h2 id="cta-title">{t('cta.title')}</h2>
        <p>{t('cta.sub')}</p>
        <div className="cta-btns">
          <a href={DEMO_URL} className="btn btn-primary">{t('cta.b1')}</a>
          <a href={WHATSAPP_URL} className="btn btn-secondary">
            <Icon name="chat" />
            <span>{t('cta.b2')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
