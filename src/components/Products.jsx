import { useLang } from '../i18n/LanguageContext.jsx';
import { BarMarker } from './Logo.jsx';

const PRODUCTS = [
  {
    bar: 0, title: 'p1.title', tag: 'p1.tag', desc: 'p1.desc',
    features: ['p1.f1', 'p1.f2', 'p1.f3', 'p1.f4'],
    link: { href: '#contact', label: 'p1.more' },
  },
  {
    bar: 1, title: 'nav.reports', tag: 'p2.tag', desc: 'p2.desc',
    features: ['p2.f1', 'p2.f2', 'p2.f3', 'p2.f4'],
    link: { href: '#reports', label: 'p2.more' },
  },
  {
    bar: 2, title: 'p3.title', tag: 'p3.tag', desc: 'p3.desc',
    features: ['p3.f1', 'p3.f2', 'p3.f3', 'p3.f4'],
    link: { href: '#marketplace', label: 'p3.more' },
  },
];

export default function Products() {
  const { t } = useLang();

  return (
    <section className="section" id="products" aria-labelledby="prod-title">
      <div className="container">
        <header className="section-head">
          <h2 id="prod-title">{t('prod.title')}</h2>
          <p className="sub">{t('prod.sub')}</p>
        </header>

        <div className="products">
          {PRODUCTS.map((p) => (
            <article className="product" key={p.title}>
              <BarMarker bar={p.bar} />
              <h3>{t(p.title)}</h3>
              <p className="product-tag">{t(p.tag)}</p>
              <p className="product-desc">{t(p.desc)}</p>
              <ul className="checks">
                {p.features.map((f) => (
                  <li key={f}>{t(f)}</li>
                ))}
              </ul>
              <a href={p.link.href} className="text-link">{t(p.link.label)}</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
