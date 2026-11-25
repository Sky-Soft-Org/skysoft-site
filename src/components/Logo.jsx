import { useId } from 'react';
import logoS from '../assets/logo-s.png';
import logoSky from '../assets/logo-sky.png';
import logoSkyDark from '../assets/logo-sky-dark.png';

// The "S" from the Sky Soft logo: three bars, blue, silver and blue, cut from the company's
// logo file (src/assets/logo-s.png, transparent, 180 × 175 px). The bars sit in their own
// horizontal bands with clear gaps between them, so each one can move on its own: the hero's
// drawing of the ERP slides them in when the page loads (.s-bar-1, -2, -3 in styles.css).
const WIDTH = 180;
const HEIGHT = 175;
const BANDS = [[0, 60], [60, 116], [116, HEIGHT]]; // top, middle and bottom bar, in image pixels

export function SkyS({ className }) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <svg className={className} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true" focusable="false">
      <defs>
        {BANDS.map(([top, bottom], i) => (
          <clipPath key={top} id={`s-band-${i}-${uid}`}>
            <rect x="0" y={top} width={WIDTH} height={bottom - top} />
          </clipPath>
        ))}
      </defs>
      {BANDS.map(([top], i) => (
        <g key={top} className={`s-bar s-bar-${i + 1}`}>
          <image href={logoS} width={WIDTH} height={HEIGHT} clipPath={`url(#s-band-${i}-${uid})`} />
        </g>
      ))}
    </svg>
  );
}

// The full logo for the header and footer, as the company's logo file draws it (495 × 176 px).
// Its "SOFT" is dark grey, so the dark theme swaps in a copy with those letters made light;
// CSS shows whichever one matches the theme.
export function Brand() {
  return (
    <a href="#top" className="brand">
      <img className="brand-logo brand-logo-light" src={logoSky} alt="Sky Soft" width="495" height="176" />
      <img className="brand-logo brand-logo-dark" src={logoSkyDark} alt="Sky Soft" width="495" height="176" />
    </a>
  );
}
