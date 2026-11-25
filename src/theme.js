import { useEffect, useState } from 'react';

// Light or dark theme. A script in index.html picks one before the first paint (?theme=,
// then the visitor's last choice, then their system setting); this keeps it in step when the
// visitor uses the switch in the header, or their system setting changes before they've chosen.
const STORAGE_KEY = 'skysoft-theme';
const BAR_COLOR = { light: '#ffffff', dark: '#0A1226' }; // the browser's own bar, matching --paper

function apply(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BAR_COLOR[theme]);
}

function saved() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage unavailable (private mode)
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e) => {
      if (saved()) return;
      const next = e.matches ? 'dark' : 'light';
      apply(next);
      setTheme(next);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode) */
    }
    setTheme(next);
  };

  return [theme, toggle];
}
