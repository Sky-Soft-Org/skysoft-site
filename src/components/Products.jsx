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
  {
    bar: 0, title: 'p4.title', tag: 'p4.tag', desc: 'p4.desc',
    features: ['p4.f1', 'p4.f2', 'p4.f3', 'p4.f4'],
    link: { href: '#contact', label: 'p4.more' },
  },
  {
    bar: 1, title: 'p5.title', tag: 'p5.tag', desc: 'p5.desc',
    features: ['p5.f1', 'p5.f2', 'p5.f3', 'p5.f4'],
    link: { href: '#contact', label: 'p5.more' },
  },
  {
    bar: 2, title: 'p6.title', tag: 'p6.tag', desc: 'p6.desc',
    features: ['p6.f1', 'p6.f2', 'p6.f3', 'p6.f4'],
    link: { href: '#contact', label: 'p6.more' },
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
