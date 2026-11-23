import { useState } from 'react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { STORE_THEMES } from '../data/storeThemes.js';
import Icon from './Icon.jsx';

export default function Marketplace() {
  const { t, lang } = useLang();
  const [themeIdx, setThemeIdx] = useState(0);
  const [cart, setCart] = useState(2);
  const [picked, setPicked] = useState(false); // products only animate after a visitor picks a theme
  const theme = STORE_THEMES[themeIdx];

  const pickTheme = (i) => {
    setThemeIdx(i);
    setPicked(true);
  };

  return (
    <section className="section" id="marketplace" aria-labelledby="mk-title">
      <div className="container split">
        <div>
          <header className="section-head">
            <p className="kicker"><Icon name="cart" /><span>{t('p3.title')}</span></p>
            <h2 id="mk-title">{t('mk.title')}</h2>
            <p className="sub">{t('mk.sub')}</p>
          </header>

          <div className="swatches" role="group" aria-label={t('label.themes')}>
            {STORE_THEMES.map((th, i) => (
              <button
                key={th.url}
                type="button"
                className="sw"
                style={{ '--c': th.color }}
                aria-pressed={i === themeIdx}
                onClick={() => pickTheme(i)}
              >
                <i aria-hidden="true" />
                {th.label[lang]}
              </button>
            ))}
          </div>

          <ul className="checks">
            <li>{t('mk.p1')}</li>
            <li>{t('mk.p2')}</li>
            <li>{t('mk.p3')}</li>
          </ul>
        </div>

        <div className="screen store" style={{ '--accent': theme.color, '--tint': theme.tint }}>
          <div className="screen-bar"><span className="ltr">{theme.url}</span></div>
          <div className="st-head">
            <span className="st-logo" aria-hidden="true">{theme.logo}</span>
            <b>{theme.name[lang]}</b>
            <span className="st-cart">
              <Icon name="cart" />
              <i aria-live="polite">{cart}</i>
            </span>
          </div>
          <div className="st-banner">
            <small>{theme.kicker[lang]}</small>
            <b>{theme.banner[lang]}</b>
            <span className="st-btn">{t('mk.shop')}</span>
          </div>
          {/* key remounts the grid on theme change so the entrance animation replays */}
          <div className="st-grid" key={themeIdx}>
            {theme.items.map((item, k) => {
              const name = item.name[lang];
              return (
                <div key={item.name.en} className={picked ? 'prod enter' : 'prod'} style={{ '--i': k }}>
                  <div className="th"><Icon name={theme.icon} className="" /></div>
                  <b>{name}</b>
                  <div className="pr">
                    <span className="num">{item.price}</span>
                    <button
                      type="button"
                      aria-label={t('label.addToCart').replace('{x}', name)}
                      onClick={() => setCart((c) => c + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
