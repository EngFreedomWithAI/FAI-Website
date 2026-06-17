import { defineConfig } from 'astro/config';

// SITE is set in Cloudflare Pages build env (preview: https://fai-website.pages.dev, prod: https://freedomwith.ai)
export default defineConfig({
  site: process.env.SITE || 'https://freedomwith.ai',
  output: 'static',
  // Pin the dev server to 4321 and fail loudly instead of silently drifting to
  // 4322/4323 if the port is busy. The dev script frees 4321 first, so
  // `npm run dev` deterministically reclaims the same port every time.
  server: { port: 4321, strictPort: true },
  vite: {
    // The macOS fsevents watcher doesn't reliably fire for edits in this
    // setup, so HMR silently stops applying and you'd have to restart to see
    // changes. Polling forces Vite to detect every save. Small CPU cost,
    // reliable hot reload.
    server: { watch: { usePolling: true, interval: 120 } },
  },
});
