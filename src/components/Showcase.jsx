import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext.jsx';
import { whatsappUrl } from '../data/company.js';
import {
  SHOWCASE, SHOWCASE_IMAGES, DESKTOP_RATIO, PHONE_RATIO, PHONE_LANDSCAPE_RATIO, APP_DESKTOP_RATIO,
} from '../data/showcase.js';
import Icon from './Icon.jsx';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// How far a long page travels inside its frame, as a share of its own height.
// Zero means the capture is a single screen.
function travel(frameRatio, { w, h }) {
  const share = 1 - frameRatio / (h / w);
  return share > 0.01 ? share : 0;
}

// One captured screen: the page (which scrolls when it is taller than the frame)
// with the site's pinned top bar and bottom menu laid over it. Extra `frames`
// stack on top and fade in one after another (keyframes flip-<k>-of-<n> in styles.css).
function Shot({ shot, frameRatio, alt, className }) {
  const move = travel(frameRatio, shot);
  const frames = shot.frames || [];
  const n = frames.length + 1;
  let pageClass = 'shot-page';
  if (!move && !frames.length) pageClass += ' shot-still';
  return (
    <div className={`shot ${className}`}>
      <img
        className={pageClass}
        style={move ? { '--end': `${-move * 100}%` } : undefined}
        src={shot.src} width={shot.w} height={shot.h} alt={alt} decoding="async"
      />
      {frames.map((src, k) => (
        <img
          key={src}
          className="shot-frame"
          style={{ '--flip': `flip-${k + 2}-of-${n}` }}
          src={src} width={shot.w} height={shot.h} alt="" decoding="async"
        />
      ))}
      {shot.top && <img className="shot-bar shot-top" src={shot.top} width={shot.w} height={shot.topH} alt="" />}
      {shot.bottom && <img className="shot-bar shot-bottom" src={shot.bottom} width={shot.w} height={shot.bottomH} alt="" />}
    </div>
  );
}

// Which kind of screens a product shows; each has its own shape (see .live-stage-* in styles.css)
function stageKind(item) {
  if (item.device === 'desktop') return 'app'; // a Windows window
  if (item.device === 'phone-landscape') return 'landscape'; // a phone held sideways
  return item.phone ? 'browser' : 'solo'; // a browser with a phone in front of it, or alone
}

export default function Showcase() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(() => !prefersReducedMotion()); // moves to the next product by itself
  const [onScreen, setOnScreen] = useState(false);
  const [held, setHeld] = useState(false); // pointer resting on the screens, to look at something
  const sectionRef = useRef(null);
  const tabRefs = useRef([]);
  const item = SHOWCASE[active];
  const name = t(item.name);

  useEffect(() => {
    const el = sectionRef.current;
    // Animations run only while the section is on screen
    const seen = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.2 });
    // Fetch every screen a little before the visitor reaches the section, so switching never shows a blank frame
    const near = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      SHOWCASE_IMAGES.forEach((src) => { new Image().src = src; });
      near.disconnect();
    }, { rootMargin: '900px 0px' });
    seen.observe(el);
    near.observe(el);
    return () => { seen.disconnect(); near.disconnect(); };
  }, []);

  const next = () => setActive((i) => (i + 1) % SHOWCASE.length);

  // Picking a product hands control to the visitor: no more automatic switching
  const pick = (i, focus) => {
    setActive(i);
    setAuto(false);
    if (focus) tabRefs.current[i]?.focus();
  };

  // Arrow keys follow reading direction (in Arabic, Left is "next"); Home/End jump
  const onKeyDown = (e, i) => {
    const last = SHOWCASE.length - 1;
    const rtl = document.documentElement.dir === 'rtl';
    const fwd = i === last ? 0 : i + 1;
    const back = i === 0 ? last : i - 1;
    const to = {
      ArrowRight: rtl ? back : fwd,
      ArrowLeft: rtl ? fwd : back,
      Home: 0,
      End: last,
    }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    pick(to, true);
  };

  const playing = onScreen && !held;

  return (
    <section
      ref={sectionRef}
      className="section live"
      id="live"
      aria-labelledby="live-title"
      data-playing={playing || undefined}
      data-auto={auto || undefined}
    >
      <div className="container">
        <div className="live-head">
          <header className="section-head">
            <h2 id="live-title">{t('live.title')}</h2>
            <p className="sub">{t('live.sub')}</p>
          </header>
          <button type="button" className="live-toggle" aria-pressed={!auto} onClick={() => setAuto((a) => !a)}>
            <Icon name={auto ? 'pause' : 'play'} />
            {t(auto ? 'live.pause' : 'live.play')}
          </button>
        </div>

        <div className="live-tabs" role="tablist" aria-label={t('label.live')}>
          {SHOWCASE.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => { tabRefs.current[i] = el; }}
              type="button"
              role="tab"
              id={`live-tab-${s.id}`}
              className="live-tab"
              aria-selected={active === i}
              aria-controls="live-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => pick(i, false)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              <span className="live-tab-name">{t(s.name)}</span>
              <span className="live-tab-kind">{t(s.kind)}</span>
              {/* fills while this product is on show; reaching the end moves to the next one */}
              {auto && active === i && (
                <i className="live-progress" style={{ '--dur': `${s.seconds}s` }} onAnimationEnd={next} aria-hidden="true" />
              )}
            </button>
          ))}
        </div>

        <div
          className="live-body"
          id="live-panel"
          role="tabpanel"
          aria-labelledby={`live-tab-${item.id}`}
          key={item.id}
          style={{ '--dur': `${item.seconds}s` }}
        >
          <div className="live-info">
            <h3>{name}</h3>
            {item.url && <p className="live-url ltr">{item.url.replace('https://', '')}</p>}
            <p className="live-desc">{t(item.desc)}</p>
            <div className="live-actions">
              {item.url ? (
                <>
                  <a className="btn btn-primary" href={item.url} target="_blank" rel="noopener noreferrer">
                    {t(item.open)}
                    <Icon name="external" />
                    <span className="visually-hidden">{t('label.newTab')}</span>
                  </a>
                  <a
                    className="live-ask"
                    href={whatsappUrl(t('wa.ask').replace('{x}', name))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('live.ask')}
                  </a>
                </>
              ) : (
                <a
                  className="btn btn-primary"
                  href={whatsappUrl(t('wa.ask').replace('{x}', name))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('live.ask')}
                  <Icon name="external" />
                  <span className="visually-hidden">{t('label.newTab')}</span>
                </a>
              )}
            </div>
          </div>

          <div
            className={`live-stage live-stage-${stageKind(item)}`}
            onPointerEnter={() => setHeld(true)}
            onPointerLeave={() => setHeld(false)}
          >
            {item.device === 'phone-landscape' ? (
              <div className="phone phone-landscape">
                <Shot
                  shot={item.phone}
                  frameRatio={PHONE_LANDSCAPE_RATIO}
                  className="shot-phone-landscape"
                  alt={t('live.altPhone').replace('{x}', name)}
                />
              </div>
            ) : item.device === 'desktop' ? (
              <div className="live-app">
                <Shot
                  shot={item.desktop}
                  frameRatio={APP_DESKTOP_RATIO}
                  className="shot-app"
                  alt={t('live.altDesktop').replace('{x}', name)}
                />
              </div>
            ) : (
              <>
                <div className="screen live-browser">
                  <div className="screen-bar">
                    <span className="ltr">{item.url ? item.url.replace('https://', '') : name}</span>
                  </div>
                  <Shot shot={item.desktop} frameRatio={DESKTOP_RATIO} className="shot-desktop" alt={t('live.altDesktop').replace('{x}', name)} />
                </div>
                {item.phone && (
                  <div className="phone">
                    <Shot shot={item.phone} frameRatio={PHONE_RATIO} className="shot-phone" alt={t('live.altPhone').replace('{x}', name)} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
