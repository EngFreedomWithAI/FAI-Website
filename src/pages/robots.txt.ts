import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://freedomwith.ai')).origin;

  // We welcome AI crawlers and answer engines: discoverability in AI tools
  // (ChatGPT, Claude, Perplexity, Google AI) is a goal, not something to block.
  const aiAgents = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-Web',
    'anthropic-ai',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
    'CCBot',
  ];

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    ...aiAgents.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
    `Sitemap: ${origin}/sitemap.xml`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
