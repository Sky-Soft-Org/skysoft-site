import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHash } from 'node:crypto';

// GitHub Pages can't send custom HTTP headers, so the security policy ships as
// <meta> tags in the built page. Build-only: the dev server needs inline
// scripts and a websocket for hot reload, which this policy would block.
// Inline <script>s in index.html (e.g. the pre-paint theme picker) are allowed
// by their exact hash, computed at build time so edits stay in sync.
const buildCsp = (scriptHashes) => [
  "default-src 'self'",
  ["script-src 'self'", ...scriptHashes.map((h) => `'sha256-${h}'`)].join(' '),
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
  transformIndexHtml: {
    order: 'post',
    handler(html) {
      // Browsers normalize CRLF to LF before hashing, so hash what they see
      const hashes = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(([, code]) =>
        createHash('sha256').update(code.replace(/\r\n?/g, '\n')).digest('base64'),
      );
      // Placed right after <meta charset> so it covers every resource below it
      return html.replace(
        /(<meta charset="utf-8">)/,
        `$1\n  <meta http-equiv="Content-Security-Policy" content="${buildCsp(hashes)}">` +
          '\n  <meta name="referrer" content="strict-origin-when-cross-origin">',
      );
    },
  },
});

export default defineConfig({
  plugins: [react(), securityMeta()],
  // Relative asset paths so the built site works from any folder or subpath
  base: './',
  server: { port: 5173, strictPort: true },
});
