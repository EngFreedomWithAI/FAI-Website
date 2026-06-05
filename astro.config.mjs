import { defineConfig } from 'astro/config';

// SITE is set in Cloudflare Pages build env (preview: https://fai-website.pages.dev, prod: https://freedomwith.ai)
export default defineConfig({
  site: process.env.SITE || 'https://freedomwith.ai',
  output: 'static',
});
