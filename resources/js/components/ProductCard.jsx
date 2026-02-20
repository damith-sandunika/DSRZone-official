import React from 'react';
import { Link } from 'react-router-dom';

function imageUrl(value) {
    if (!value || typeof value !== 'string') return '';
    const v = value.trim();
    if (v.startsWith('http://') || v.startsWith('https://') || v.startsWith('/')) return v;
    return '/images/' + v.replace(/^\//, '');
}

/** Normalize hex for CSS; return a slightly darker variant for gradients. */
function hexToRgb(hex) {
    const n = parseInt(hex.slice(1), 16);
    return [n >> 16, (n >> 8) & 0xff, n & 0xff];
}
function darkenHex(hex, pct = 0.85) {
    const [r, g, b] = hexToRgb(hex);
    return '#' + [r, g, b].map((c) => Math.round(c * pct).toString(16).padStart(2, '0')).join('');
}

export default function ProductCard({ product }) {
    const isAvailable = product.status === 'available';
    const features = Array.isArray(product.features) ? product.features.slice(0, 5) : [];
    const accent = (product.accent_color && /^#[0-9A-Fa-f]{6}$/.test(String(product.accent_color).trim())) ? String(product.accent_color).trim() : '#f59e0b';
    const accentDark = darkenHex(accent);
    const cardVars = {
        '--product-card-accent-top': `linear-gradient(90deg, ${accent}, ${accentDark})`,
        '--product-card-logo-start': accent,
        '--product-card-logo-end': accentDark,
        '--product-card-tagline': accent,
        '--product-card-checkmark-bg': accent + '33',
        '--product-card-checkmark-border': accent,
        '--product-card-btn-start': accent,
        '--product-card-btn-mid': accent,
        '--product-card-btn-end': accentDark,
        '--product-card-status-coming': accent,
    };

    const cardContent = (
        <>
            <div className="product-card-accent-top" />
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="product-card-logo-box">
                        {product.logo ? (
                            <img
                                src={product.logo.startsWith('http') || product.logo.startsWith('/') ? product.logo : imageUrl(product.logo)}
                                alt=""
                                className="w-full h-full object-contain rounded-xl"
                            />
                        ) : product.icon && (product.icon.startsWith('http') || product.icon.startsWith('/')) ? (
                            <img
                                src={product.icon}
                                alt=""
                                className="w-full h-full object-contain rounded-xl"
                            />
                        ) : (
                            product.name.charAt(0)
                        )}
                    </div>
                    <span
                        className={
                            isAvailable
                                ? 'product-card-status-available'
                                : 'product-card-status-coming'
                        }
                    >
                        {isAvailable ? 'Available' : 'Coming Soon'}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                <p className="product-card-tagline text-sm font-medium mb-3">
                    {product.tagline}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
                    {product.desc}
                </p>

                {features.length > 0 && (
                    <ul className="space-y-3 mb-6">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                                <span className="product-card-checkmark">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <span className="product-card-btn mt-auto inline-flex">
                    See More
                    <span aria-hidden>→</span>
                </span>
            </div>
        </>
    );

    return (
        <div className="h-full" style={cardVars}>
            {isAvailable ? (
                <Link
                    to={`/products/${product.slug}`}
                    className="product-card group block text-left h-full"
                >
                    {cardContent}
                </Link>
            ) : (
                <div className="product-card block text-left h-full cursor-default select-none" style={{ pointerEvents: 'auto' }}>
                    {cardContent}
                </div>
            )}
        </div>
    );
}
