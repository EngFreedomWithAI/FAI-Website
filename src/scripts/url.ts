/**
 * Client-side URL handling for the site's forms.
 *
 * Mirrors normalizeUrl / isValidWebUrl in functions/_lib/util.ts. The pair has to stay
 * in sync: the browser copy is what stops people seeing an error at all, and the worker
 * copy is what actually protects the database, since the API is reachable directly.
 */

/**
 * Accept what people actually type. "faibuddy.com" becomes "https://faibuddy.com".
 *
 * Anything already carrying a scheme is left untouched rather than prefixed, so
 * "javascript:..." stays invalid and gets rejected below instead of being quietly
 * rewritten into something that passes.
 */
export const normalizeUrl = (value: string): string => {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

/**
 * For fields fed through normalizeUrl. The hostname dot matters: without it a bare
 * word like "hello" becomes "https://hello", which parses fine and would pass.
 */
export const isValidWebUrl = (value: string): boolean => {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return (url.protocol === 'http:' || url.protocol === 'https:') && url.hostname.includes('.');
  } catch {
    return false;
  }
};

/** One message for every "that is not a web address" case. */
export const INVALID_URL_MESSAGE = 'That does not look like a web address.';
