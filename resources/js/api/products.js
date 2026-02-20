const API_BASE = '/api/v1';

/**
 * Fetch all products from API. Returns null on failure (caller can fall back to static data).
 * @returns {Promise<Array<{id: number, slug: string, name: string, tagline: string, desc: string, longDesc: string, icon: string, status: string, features: string[]}>|null>}
 */
export async function fetchProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

/**
 * Fetch one product by slug. Returns null if not found or on error.
 * @param {string} slug
 * @returns {Promise<{id: number, slug: string, name: string, tagline: string, desc: string, longDesc: string, icon: string, status: string, features: string[]}|null>}
 */
export async function fetchProductBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/products/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
