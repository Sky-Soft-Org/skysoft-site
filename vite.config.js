import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages can't send custom HTTP headers, so the security policy ships as
// <meta> tags in the built page. Build-only: the dev server needs inline
// scripts and a websocket for hot reload, which this policy would block.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  'upgrade-insecure-requests',
].join('; ');

const securityMeta = () => ({
  name: 'security-meta',
  apply: 'build',
  // Placed right after <meta charset> so it covers every resource below it
  transformIndexHtml: (html) =>
    html.replace(
      /(<meta charset="utf-8">)/,
      `$1\n  <meta http-equiv="Content-Security-Policy" content="${CSP}">` +
        '\n  <meta name="referrer" content="strict-origin-when-cross-origin">',
    ),
});

export default defineConfig({
  plugins: [react(), securityMeta()],
  // Relative asset paths so the built site works from any folder or subpath
  base: './',
  server: { port: 5173, strictPort: true },
});
