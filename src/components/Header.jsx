import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { Brand } from './Logo.jsx';
import Icon from './Icon.jsx';

const NAV_LINKS = [
  ['#products', 'nav.products'],
  ['#reports', 'nav.reports'],
  ['#marketplace', 'nav.market'],
  ['#why', 'nav.why'],
  ['#contact', 'nav.contact'],
];

export default function Header() {
  const { t, lang, toggleLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuBtn = useRef(null);

  // Hairline under the header once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the menu and returns focus to its button
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Growing to desktop width closes the mobile menu
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 960px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const close = () => setOpen(false);
  const className = ['header', scrolled && 'scrolled', open && 'open'].filter(Boolean).join(' ');

  return (
    <header className={className} id="header">
      <div className="container header-row">
        <Brand />

        <nav className="nav" id="nav" aria-label={t('label.nav')}>
          {NAV_LINKS.map(([href, key]) => (
            <a key={key} href={href} onClick={close}>
              {t(key)}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary nav-cta" onClick={close}>
            {t('nav.demo')}
          </a>
        </nav>

        <div className="actions">
          <button className="lang-btn" type="button" onClick={toggleLang}>
            <Icon name="globe" />
            <span id="langLabel" lang={lang === 'ar' ? 'en' : 'ar'}>
              {lang === 'ar' ? 'English' : 'العربية'}
            </span>
          </button>
          <a href="#contact" className="btn btn-primary btn-sm header-cta">
            {t('nav.demo')}
          </a>
          <button
            ref={menuBtn}
            className="menu-btn"
            type="button"
            aria-expanded={open}
            aria-controls="nav"
            aria-label={open ? t('label.menuClose') : t('label.menuOpen')}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name="menu" className="ico ico-open" />
            <Icon name="close" className="ico ico-close" />
          </button>
        </div>
      </div>
    </header>
  );
}
