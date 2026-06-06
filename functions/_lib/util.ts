export const json = (data: unknown, status = 200): Response =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

export const html = (markup: string, status = 200): Response =>
  new Response(markup, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidUrl = (value: string): boolean => {
  if (!value) return true;
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

/** URL-safe random token for confirm/unsubscribe links. */
export const newToken = (bytes = 32): string => {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
};

export const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Parse a request body as JSON or form-encoded into a flat record. */
export const readBody = async (
  request: Request
): Promise<Record<string, string>> => {
  const type = request.headers.get('content-type') ?? '';
  if (type.includes('application/json')) {
    try {
      const data = (await request.json()) as Record<string, unknown>;
      const out: Record<string, string> = {};
      for (const [k, v] of Object.entries(data)) out[k] = String(v ?? '').trim();
      return out;
    } catch {
      return {};
    }
  }
  const form = await request.formData();
  const out: Record<string, string> = {};
  for (const [k, v] of form.entries()) out[k] = String(v ?? '').trim();
  return out;
};

/** Minimal branded HTML page for confirm/unsubscribe responses. */
export const statusPage = (
  siteUrl: string,
  title: string,
  body: string
): string => `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${escapeHtml(title)} | Freedom with AI</title>
<style>
  :root { color-scheme: light; }
  body { margin:0; min-height:100vh; display:grid; place-items:center;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background:#f7f4ed; color:#15181b; padding:24px; }
  .card { max-width:30rem; text-align:center; background:#fffdf8;
    border:1px solid rgba(21,24,27,.12); border-radius:20px; padding:48px 32px;
    box-shadow:0 16px 32px rgba(21,24,27,.08); }
  h1 { font-size:1.4rem; margin:0 0 12px; letter-spacing:-.015em; }
  p { color:#52555a; line-height:1.65; margin:0 0 24px; }
  a { display:inline-block; font-weight:600; color:#fff; background:#1a73e8;
    text-decoration:none; padding:12px 24px; border-radius:14px; }
</style>
</head><body>
  <div class="card">
    <h1>${escapeHtml(title)}</h1>
    <p>${body}</p>
    <a href="${escapeHtml(siteUrl)}">Back to Freedom with AI</a>
  </div>
</body></html>`;
