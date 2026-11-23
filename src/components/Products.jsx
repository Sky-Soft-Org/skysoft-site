import { useLang } from '../i18n/LanguageContext.jsx';
import { whatsappUrl } from '../data/company.js';
import { ERP, PRODUCTS } from '../data/products.js';
import Icon from './Icon.jsx';

// Products without a section of their own get an anchor (Reports and Market link to their sections)
const ANCHORED = ['sales', 'wear', 'restaurant'];

// Either jumps to the product's own section, or opens WhatsApp with a question about it
function ProductLink({ link, title }) {
  const { t } = useLang();
  if (link.whatsapp) {
    return (
      <a
        href={whatsappUrl(t('wa.ask').replace('{x}', t(title)))}
        className="text-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t(link.label)}
      </a>
    );
  }
  return <a href={link.href} className="text-link">{t(link.label)}</a>;
}

export default function Products() {
  const { t } = useLang();

  return (
    <section className="section" id="products" aria-labelledby="prod-title">
      <div className="container">
        <header className="section-head">
          <h2 id="prod-title">{t('prod.title')}</h2>
          <p className="sub">{t('prod.sub')}</p>
        </header>

        {/* The main system gets the wide slot; its module list is the ERP's real menu */}
        <article className="flagship" id={ERP.id} aria-labelledby="erp-title">
          <div className="flagship-copy">
            <span className="p-icon p-icon-main"><Icon name={ERP.icon} /></span>
            <h3 id="erp-title">{t(ERP.title)}</h3>
            <p className="product-tag">{t(ERP.tag)}</p>
            <p className="product-desc">{t(ERP.desc)}</p>
            <ProductLink link={ERP.link} title={ERP.title} />
          </div>
          <ul className="checks modules" aria-label={t('erp.modulesLabel')}>
            {ERP.modules.map((m) => (
              <li key={m}>{t(m)}</li>
            ))}
          </ul>
        </article>

        <div className="products">
          {PRODUCTS.map((p) => (
            <article className="product" id={ANCHORED.includes(p.id) ? p.id : undefined} key={p.id}>
              <span className="p-icon"><Icon name={p.icon} /></span>
              <h3>{t(p.title)}</h3>
              <p className="product-tag">{t(p.tag)}</p>
              <p className="product-desc">{t(p.desc)}</p>
              <ul className="checks">
                {p.features.map((f) => (
                  <li key={f}>{t(f)}</li>
                ))}
              </ul>
              <ProductLink link={p.link} title={p.title} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
