// Line icons on a 24×24 grid; stroke and size come from CSS (.ico by default).
const ICONS = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
      <path d="M3 4h2l2.5 11h11L21 7H6.5" />
    </>
  ),
  chat: <path d="M4 20l1.5-4A8 8 0 1 1 8 19z" />,
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </>
  ),
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  shield: (
    <>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="10" cy="12" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
    </>
  ),
  // store categories (stand in for product photos)
  shirt: <path d="M8.5 3.5 4 6l1.8 4.2 2.2-1V20h8V9.2l2.2 1L20 6l-4.5-2.5c-.6 1.4-1.9 2.3-3.5 2.3s-2.9-.9-3.5-2.3z" />,
  device: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2.5" />
      <path d="M10.5 17.5h3" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13.5 14-14 .2 9-5 14-14 14z" />
      <path d="M5 19l7.5-7.5" />
    </>
  ),
  drop: <path d="M12 3c3.6 4.4 6 7.6 6 10.9A6 6 0 0 1 6 13.9C6 10.6 8.4 7.4 12 3z" />,
};

export default function Icon({ name, className = 'ico' }) {
  return (
    <svg viewBox="0 0 24 24" className={className || undefined} aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}
