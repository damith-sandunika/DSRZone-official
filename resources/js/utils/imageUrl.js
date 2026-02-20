/**
 * Ensure image URL works from frontend (same-origin or full URL).
 * API may return full URL (http(s)) or path (/storage/...). Use as-is if full URL,
 * otherwise prepend current origin so images load when SPA is on same host.
 */
export function imageUrl(value) {
    if (!value || typeof value !== 'string') return '';
    const v = value.trim();
    if (v.startsWith('http://') || v.startsWith('https://')) return v;
    const path = v.startsWith('/') ? v : `/${v}`;
    return typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;
}
