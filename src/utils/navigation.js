import { PAGES_BY_SLUG } from '../data/pagesData';

/**
 * Resolves any URL or href to a known internal route slug if it belongs to catedraldesantiago.es
 */
export function resolveInternalHref(rawHref) {
  if (!rawHref) return null;
  const trimmed = rawHref.trim();
  if (
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('javascript:')
  ) {
    return null;
  }

  // Pure hash link on current page
  if (trimmed.startsWith('#')) {
    return { pathname: null, hash: trimmed };
  }

  try {
    const base = 'https://catedraldesantiago.es';
    const url = new URL(trimmed, base);
    const host = url.hostname.toLowerCase();

    // Subdomains like visitas.catedraldesantiago.es or velas.catedraldesantiago.es are external portals
    if (host !== 'catedraldesantiago.es' && host !== 'www.catedraldesantiago.es' && host !== 'localhost' && host !== '127.0.0.1') {
      return null;
    }

    // Do not intercept direct asset/PDF/image downloads
    if (/\.(pdf|zip|doc|docx|xls|xlsx|mp3|mp4|xml)$/i.test(url.pathname)) {
      return null;
    }

    let cleanPath = url.pathname.replace(/\/+$/, '') || '/';

    // Check if we have this route in PAGES_BY_SLUG
    if (PAGES_BY_SLUG[cleanPath]) {
      return { pathname: cleanPath, search: '', hash: url.hash || '' };
    }

    // Check aliases
    for (const [slug, pageObj] of Object.entries(PAGES_BY_SLUG)) {
      if (pageObj.aliases && pageObj.aliases.includes(cleanPath)) {
        return { pathname: slug, search: '', hash: url.hash || '' };
      }
    }

    return null;
  } catch {
    return null;
  }
}

