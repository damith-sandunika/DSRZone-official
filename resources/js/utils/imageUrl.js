/**
 * Ensure image URL works from frontend (same-origin or full URL).
 * API may return full URL (http(s)) or path (/storage/...). Use as-is if full URL,
 * otherwise prepend current origin so images load when SPA is on same host.
 */
export function imageUrl(value) {
    if (!value || typeof value !== 'string') return '';
    const v = value.trim();
    if (v.startsWith('http://') || v.startsWith('https://')) {
        // If image URL has hardcoded localhost or 127.0.0.1 from local dev/seeder,
        // rewrite host to current window.location.origin so mobile/remote devices load it!
        if (typeof window !== 'undefined' && (v.includes('localhost') || v.includes('127.0.0.1'))) {
            const path = v.replace(/^https?:\/\/[^\/]+/, '');
            return `${window.location.origin}${path}`;
        }
        return v;
    }
    const path = v.startsWith('/') ? v : `/${v}`;
    return typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;
}
