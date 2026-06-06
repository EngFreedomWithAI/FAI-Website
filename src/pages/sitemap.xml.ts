import type { APIRoute } from 'astro';

// Public, indexable routes with a relative priority hint.
const routes: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/advisory', priority: '0.9', changefreq: 'monthly' },
  { path: '/watch', priority: '0.8', changefreq: 'weekly' },
  { path: '/events', priority: '0.8', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://freedomwith.ai')).origin;
  const lastmod = new Date().toISOString().split('T')[0];

  const urls = routes
    .map(({ path, priority, changefreq }) => {
      const loc = new URL(path, origin).href;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
