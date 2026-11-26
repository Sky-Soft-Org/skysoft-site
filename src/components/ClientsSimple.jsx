import { useLang } from '../i18n/LanguageContext.jsx';
import { SHAPES } from '../data/worldShapes.js';
import { PLACES } from '../data/clients.js';
import { ClientsHead, equalEarth, Pin, Tiers } from './ClientsParts.jsx';

// The simple design: a plain map from Brazil to the Gulf with no borders drawn. Egypt and
// Saudi Arabia are filled deep blue, Jordan and the UAE light blue, and the countries further
// away get a pin. Beside it, the places from most clients to fewest, with the same colours.

const pct = (v) => `${(v * 100).toFixed(3)}%`;

// where a longitude and latitude sit on the map, as CSS left/top
function spot(lon, lat) {
  const [x, y] = equalEarth(lon, lat);
  return {
    left: pct(((x - SHAPES.xMin) * SHAPES.k) / SHAPES.width),
    top: pct(((SHAPES.yMax - y) * SHAPES.k) / SHAPES.height),
  };
}

// the map's width over its height: CSS sizes the map from the screen height with it
const FRAME = { '--ratio': String(SHAPES.width / SHAPES.height) };

export default function ClientsSimple() {
  const { t } = useLang();

  // phones: heading, map, list; wide screens: heading and list beside the map
  return (
    <div className="container clients-layout">
      <ClientsHead />

      {/* The list says the same in words, so screen readers get the summary only */}
      <div className="smap" role="img" aria-label={t('clients.mapAlt')} style={FRAME}>
        <svg viewBox={`0 0 ${SHAPES.width} ${SHAPES.height}`} aria-hidden="true" focusable="false">
          <path className="smap-land" d={SHAPES.land} />
          <path className="smap-region" d={SHAPES.jo + SHAPES.ae} />
          <path className="smap-main" d={SHAPES.eg + SHAPES.sa} />
        </svg>
        {PLACES.map((p) => (
          <Pin key={p.id} place={p} style={spot(p.lon, p.lat)} />
        ))}
      </div>

      <Tiers />
    </div>
  );
}
