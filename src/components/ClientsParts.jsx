import { useLang } from '../i18n/LanguageContext.jsx';
import { PLACES, TIERS } from '../data/clients.js';

// Pieces both designs of the clients section share

// Equal Earth projection (Šavrič, Patterson and Jenny, 2018), as in scripts/build-world-maps.mjs:
// longitude and latitude in degrees → [x, y] on a unit Earth, y pointing north
const A1 = 1.340264;
const A2 = -0.081106;
const A3 = 0.000893;
const A4 = 0.003796;
const M = Math.sqrt(3) / 2;
const RAD = Math.PI / 180;
export function equalEarth(lon, lat) {
  const l = Math.asin(M * Math.sin(lat * RAD));
  const l2 = l * l;
  const l6 = l2 * l2 * l2;
  return [
    (lon * RAD * Math.cos(l)) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
    l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)),
  ];
}

export function ClientsHead() {
  const { t } = useLang();
  return (
    <header className="section-head">
      <h2 id="clients-title">{t('clients.title')}</h2>
      <p className="sub">{t('clients.sub')}</p>
    </header>
  );
}

// How many clients a tier has, as 3, 2 or 1 filled bars. The words beside it say the same.
export function Level({ n }) {
  return (
    <span className={`level level-${n}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

// The places from most clients to fewest. Each swatch matches how the place looks on the
// map in use; the section's class (clients-simple or clients-dotted) picks the swatch style.
export function Tiers() {
  const { t } = useLang();
  return (
    <ol className="tiers">
      {TIERS.map(({ id, level }) => (
        <li className="tier" key={id}>
          <div className="tier-head">
            <p className="tier-level">
              <Level n={level} />
              {t(`clients.${id}.level`)}
            </p>
            {id === 'main' ? <p className="tier-note">{t('clients.hq')}</p> : null}
          </div>
          <ul className="tier-places">
            {PLACES.filter((p) => p.tier === id).map((p) => (
              <li key={p.id}>
                <i className={`swatch swatch-${id}`} aria-hidden="true" />
                {t(`place.${p.id}`)}
              </li>
            ))}
            {id === 'region' ? <li className="tier-more">{t('clients.more')}</li> : null}
          </ul>
        </li>
      ))}
    </ol>
  );
}

// A place's name on the map; the dot is drawn by CSS (::before), except for 'main' places
export function Pin({ place, style }) {
  const { t } = useLang();
  return (
    <span className={`pin pin-${place.tier} at-${place.label} sm-${place.sm}`} style={style}>
      <span className="pin-text">{t(`place.${place.id}`)}</span>
    </span>
  );
}
