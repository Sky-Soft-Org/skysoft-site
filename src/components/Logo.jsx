// The Sky Soft mark is three bars. Each bar also stands for one platform:
// 0 = Sky Soft Accounting, 1 = Sky Reports, 2 = Sky Market.
export const BAR_PATHS = [
  'M14 34C17 24 25 18 34 18H89C86 28 79 34 71 34Z',
  'M14 42H66C76 42 84 49 86 58H32C23 58 15 51 14 42Z',
  'M12 82C15 72 23 66 32 66H86C83 76 76 82 68 82Z',
];

// Crops the full mark down to a single bar, same width for all three
const BAR_VIEWBOX = ['11 16 80 20', '11 40 80 20', '11 64 80 20'];

export function LogoBars({ className }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      {BAR_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

export function BarMarker({ bar }) {
  return (
    <svg className="bar-marker" viewBox={BAR_VIEWBOX[bar]} aria-hidden="true">
      <path d={BAR_PATHS[bar]} />
    </svg>
  );
}

export function Brand() {
  return (
    <a href="#top" className="brand" aria-label="Sky Soft">
      <span className="mark" aria-hidden="true">
        <LogoBars />
      </span>
      <span className="wordmark" aria-hidden="true">
        Sky<span>Soft</span>
      </span>
    </a>
  );
}
