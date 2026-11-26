import { useLang } from '../i18n/LanguageContext.jsx';
import { WORLD } from '../data/worldDots.js';
import { HQ, PHONE_VIEW, PLACES } from '../data/clients.js';
import { ClientsHead, equalEarth, Pin, Tiers } from './ClientsParts.jsx';

// The dotted design: a dotted world map with Egypt and Saudi Arabia lit up,
// beside the places from most clients to fewest

// longitude and latitude → viewBox units of the map
function project(lon, lat) {
  const [x, y] = equalEarth(lon, lat);
  return [(x + WORLD.xMax) * WORLD.k, (WORLD.yTop - y) * WORLD.k];
}

// The centre of every dot in a mask
function decode(mask) {
  const bits = atob(mask);
  const dots = [];
  for (let i = 0; i < WORLD.rows * WORLD.cols; i += 1) {
    if (bits.charCodeAt(i >> 3) & (128 >> (i & 7))) {
      const row = Math.floor(i / WORLD.cols);
      const x = ((i % WORLD.cols) + 0.5 + (row % 2) * 0.5) * WORLD.step; // odd rows sit half a step over
      dots.push([x, (row + 0.5) * WORLD.rowStep]);
    }
  }
  return dots;
}
// One zero-length line per dot: with round caps, each one draws as a circle
const toPath = (dots) => dots.map(([x, y]) => `M${x.toFixed(1)} ${y.toFixed(1)}h0`).join('');

const landDots = decode(WORLD.land);
const mainDots = decode(WORLD.main);
const LAND = toPath(landDots);
const MAIN = toPath(mainDots);

// The frame hugs the land, so the empty Pacific at both ends of the map isn't drawn
const xs = landDots.concat(mainDots).map((d) => d[0]);
const ys = landDots.concat(mainDots).map((d) => d[1]);
const VIEW = { x: Math.min(...xs) - WORLD.step, y: Math.min(...ys) - WORLD.step };
VIEW.w = Math.max(...xs) + WORLD.step - VIEW.x;
VIEW.h = Math.max(...ys) + WORLD.step - VIEW.y;

const [HQ_X, HQ_Y] = project(HQ.lon, HQ.lat);
const pct = (v) => `${(v * 100).toFixed(3)}%`;

// The map's width over its height (CSS sizes the map from the screen height with it).
// Phones zoom in on PHONE_VIEW: the world layer grows and slides until that box fills the frame.
const [westX] = project(PHONE_VIEW.west, 0);
const [eastX] = project(PHONE_VIEW.east, 0);
const [, northY] = project(0, PHONE_VIEW.north);
const [, southY] = project(0, PHONE_VIEW.south);
const FRAME = {
  '--ratio': String(VIEW.w / VIEW.h),
  '--zoom': String(VIEW.w / (eastX - westX)),
  '--shift-x': pct(-(westX - VIEW.x) / VIEW.w),
  '--shift-y': pct(-(northY - VIEW.y) / VIEW.h),
  '--phone-ratio': String((eastX - westX) / (southY - northY)),
};

export default function ClientsDotted() {
  const { t } = useLang();

  return (
    <div className="container clients-layout">
      <ClientsHead />

      {/* The list beside the map says the same in words, so screen readers get the summary only */}
      <div className="map" role="img" aria-label={t('clients.mapAlt')} style={FRAME}>
        <div className="map-world">
          <svg viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`} aria-hidden="true" focusable="false">
            <defs>
              <radialGradient id="map-glow" gradientUnits="userSpaceOnUse" cx={HQ_X} cy={HQ_Y} r="80">
                <stop offset="0" stopColor="#01CDFE" />
                <stop offset=".45" stopColor="#02A5EE" />
                <stop offset="1" stopColor="#0454BF" />
              </radialGradient>
            </defs>
            <path className="map-land" d={LAND} />
            <path className="map-main" d={MAIN} stroke="url(#map-glow)" />
          </svg>
          {PLACES.map((p) => {
            const [x, y] = project(p.lon, p.lat);
            return <Pin key={p.id} place={p} style={{ left: pct((x - VIEW.x) / VIEW.w), top: pct((y - VIEW.y) / VIEW.h) }} />;
          })}
        </div>
      </div>

      <Tiers />
    </div>
  );
}
