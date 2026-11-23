import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { whatsappUrl } from '../data/company.js';
import { Brand } from './Logo.jsx';
import Icon from './Icon.jsx';

const NAV_LINKS = [
  ['#products', 'nav.products'],
  ['#reports', 'nav.reports'],
  ['#marketplace', 'nav.market'],
  ['#about', 'nav.about'],
  ['#contact', 'nav.contact'],
];
const NAV_IDS = new Set(NAV_LINKS.map(([href]) => href.slice(1)));

export default function Header() {
  const { t, lang, toggleLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState('');
  const menuBtn = useRef(null);

  // Marks the nav link for the part of the page being read. A section without
  // its own link (Why, Process, FAQ) counts as part of the nearest linked one above it.
  useEffect(() => {
    const sections = [...document.querySelectorAll('main section[id]')];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (!hit) return;
        let i = sections.indexOf(hit.target);
        while (i >= 0 && !NAV_IDS.has(sections[i].id)) i -= 1;
        setCurrent(i >= 0 ? sections[i].id : '');
      },
      { rootMargin: '-45% 0px -50% 0px' }, // a thin band across the middle of the screen
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

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
            <a
              key={key}
              href={href}
              onClick={close}
              aria-current={current === href.slice(1) ? 'true' : undefined}
            >
              {t(key)}
            </a>
          ))}
          <a href={whatsappUrl(t('wa.hello'))} target="_blank" rel="noopener noreferrer" className="btn btn-primary nav-cta" onClick={close}>
            <Icon name="chat" />
            <span>{t('nav.cta')}</span>
          </a>
        </nav>

        <div className="actions">
          <button className="lang-btn" type="button" onClick={toggleLang}>
            <Icon name="globe" />
            <span id="langLabel" className="lang-full" lang={lang === 'ar' ? 'en' : 'ar'}>
              {lang === 'ar' ? 'English' : 'العربية'}
            </span>
            {/* shown instead of the full name on narrow phones, where the header runs out of room */}
            <span className="lang-short" lang={lang === 'ar' ? 'en' : 'ar'} aria-hidden="true">
              {lang === 'ar' ? 'EN' : 'عربي'}
            </span>
          </button>
          <a href={whatsappUrl(t('wa.hello'))} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm header-cta">
            <Icon name="chat" />
            <span>{t('nav.cta')}</span>
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
