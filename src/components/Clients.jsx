import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LanguageContext.jsx';
import ClientsSimple from './ClientsSimple.jsx';
import ClientsDotted from './ClientsDotted.jsx';

// Where our clients are, in two designs while the team picks one: the simple map and the
// dotted map. A floating switch shows while the section is on screen. ?map=simple|dotted opens
// a design directly, and the last one picked is remembered.
const DESIGNS = ['simple', 'dotted'];
const STORAGE_KEY = 'skysoft-map-design';

function initialDesign() {
  const fromUrl = new URLSearchParams(window.location.search).get('map');
  if (DESIGNS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (DESIGNS.includes(saved)) return saved;
  } catch {
    /* storage unavailable (private mode) */
  }
  return 'simple';
}

export default function Clients() {
  const { t } = useLang();
  const [design, setDesign] = useState(initialDesign);
  const [onScreen, setOnScreen] = useState(false);
  const section = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, design);
    } catch {
      /* storage unavailable (private mode) */
    }
  }, [design]);

  // the switch shows once the section reaches the middle part of the screen
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      rootMargin: '-20% 0px -20% 0px',
    });
    io.observe(section.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={section} className={`section clients clients-${design}`} id="clients" aria-labelledby="clients-title">
      {design === 'simple' ? <ClientsSimple /> : <ClientsDotted />}

      <div className={`design-switch${onScreen ? ' show' : ''}`} role="group" aria-label={t('design.label')} inert={!onScreen}>
        <span className="design-switch-label" aria-hidden="true">{t('design.label')}</span>
        {DESIGNS.map((d) => (
          <button key={d} type="button" aria-pressed={design === d} onClick={() => setDesign(d)}>
            {t(`design.${d}`)}
          </button>
        ))}
      </div>
    </section>
  );
}
