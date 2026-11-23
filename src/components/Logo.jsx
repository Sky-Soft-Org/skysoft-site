// The Sky Soft mark: three stacked bars, the same "S" as the ERP's splash screen.
export const BAR_PATHS = [
  'M14 34C17 24 25 18 34 18H89C86 28 79 34 71 34Z',
  'M14 42H66C76 42 84 49 86 58H32C23 58 15 51 14 42Z',
  'M12 82C15 72 23 66 32 66H86C83 76 76 82 68 82Z',
];

// `inline` returns just the paths, for use inside another <svg>
export function LogoBars({ className, inline }) {
  const paths = BAR_PATHS.map((d) => <path key={d} d={d} />);
  if (inline) return paths;
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      {paths}
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
