import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CursorGlow from './CursorGlow';
import { getProductBySlug } from '../data/products';
import { fetchProductBySlug } from '../api/products';

/** Resolve image path: "logo.png" or "1.jpg" -> "/images/logo.png". Full URLs or paths starting with / are left as-is. */
function imageUrl(value) {
    if (!value || typeof value !== 'string') return '';
    const v = value.trim();
    if (v.startsWith('http://') || v.startsWith('https://') || v.startsWith('/')) return v;
    return '/images/' + v.replace(/^\//, '');
}

function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [fullscreenImage, setFullscreenImage] = useState(null);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetchProductBySlug(slug).then((apiProduct) => {
            if (!cancelled) {
                setProduct(apiProduct ?? getProductBySlug(slug));
                setLoading(false);
            }
        });
        return () => { cancelled = true; };
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0c12] text-white flex flex-col items-center justify-center px-4">
                <p className="text-gray-400">Loading…</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#0a0c12] text-white flex flex-col items-center justify-center px-4">
                <p className="text-gray-400 mb-4">Product not found.</p>
                <Link to="/#products" className="text-[#f59e0b] hover:text-[#fcd34d] font-medium">
                    ← Back to Products
                </Link>
            </div>
        );
    }

    const benefits = Array.isArray(product.benefits) ? product.benefits : [];
    const galleryImages = Array.isArray(product.gallery_images) ? product.gallery_images : (Array.isArray(product.galleryImages) ? product.galleryImages : []);
    const productName = product.name || 'Product';
    const nameParts = productName.split(' ');
    const nameFirst = nameParts.slice(0, -1).join(' ');
    const nameLast = nameParts.length > 1 ? nameParts[nameParts.length - 1] : productName;
    const accent = (product.accent_color && /^#[0-9A-Fa-f]{6}$/.test(product.accent_color.trim())) ? product.accent_color.trim() : '#f59e0b';
    const overlayPct = Math.min(100, Math.max(0, Number(product.background_overlay) || 35)) / 100;

    return (
        <div className="bg-[#0a0c12] text-white">
            <CursorGlow />

            <main className="pt-10 pb-6 relative z-0">
                {/* Background: image covers full page, then overlay, then white squares on top */}
                <div className="fixed inset-0 -z-10" aria-hidden="true">
                    {product.background_image ? (
                        <>
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${product.background_image.startsWith('http') ? product.background_image : imageUrl(product.background_image)})`,
                                }}
                            />
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ backgroundColor: `rgba(10, 12, 18, ${overlayPct})` }}
                            />
                            {/* White squares grid – large squares, subtle */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)',
                                    backgroundSize: '64px 64px',
                                    backgroundPosition: '0 0',
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-[#0a0c12]" />
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                                    backgroundSize: '64px 64px',
                                    backgroundPosition: '0 0',
                                }}
                            />
                        </>
                    )}
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Header: Back + Tagline badge */}
                    <div className="flex items-center justify-between mb-8">
                        <Link
                            to="/#products"
                            className="text-sm font-medium rounded-lg px-4 py-2 transition-colors border"
                            style={{ color: accent, borderColor: accent + '80', backgroundColor: 'transparent' }}
                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = accent + '20'; }}
                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                            ← Back
                        </Link>
                        {product.tagline && (
                            <span className="text-xs font-medium rounded-lg px-3 py-1.5 border" style={{ color: accent, backgroundColor: accent + '1a', borderColor: accent + '4d' }}>
                                {product.tagline}
                            </span>
                        )}
                    </div>

                    {/* Hero: Logo + Name + Tagline + Description */}
                    <section className="grid lg:grid-cols-5 gap-10 mb-12">
                        <div className="lg:col-span-3">
                            <div className="flex items-start gap-4 mb-4">
                                {product.logo ? (
                                    <img src={product.logo.startsWith('http') || product.logo.startsWith('/') ? product.logo : imageUrl(product.logo)} alt="" className="w-20 h-20 rounded-xl object-contain shrink-0 bg-white/5 border border-white/10" />
                                ) : product.icon && (product.icon.startsWith('http') || product.icon.startsWith('/')) ? (
                                    <img src={product.icon} alt="" className="w-20 h-20 rounded-xl object-contain shrink-0 bg-white/5 border border-white/10" />
                                ) : (
                                    <div className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-bold text-white shrink-0" style={{ backgroundColor: accent }}>
                                        {product.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                                        {nameFirst && <span style={{ color: accent }}>{nameFirst} </span>}
                                        <span className="text-white">{nameLast}</span>
                                    </h1>
                                    {product.tagline && (
                                        <p className="font-medium mt-1" style={{ color: accent }}>{product.tagline}</p>
                                    )}
                                </div>
                            </div>
                            {product.longDesc && (
                                <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
                                    {product.longDesc}
                                </p>
                            )}

                            {/* CTA buttons */}
                            {(product.cta_primary_text || product.cta_secondary_text) && (
                                <div className="flex flex-wrap gap-3 mt-6">
                                    {product.cta_primary_text && (
                                        product.cta_primary_url ? (
                                            <a
                                                href={product.cta_primary_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
                                                style={{ backgroundColor: accent }}
                                            >
                                                {product.cta_primary_text}
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                            </a>
                                        ) : (
                                            <span className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-white" style={{ backgroundColor: accent }}>{product.cta_primary_text}</span>
                                        )
                                    )}
                                    {product.cta_secondary_text && (
                                        product.cta_secondary_url ? (
                                            <a
                                                href={product.cta_secondary_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-white hover:opacity-90 transition-colors"
                                                style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderStyle: 'solid', borderColor: accent }}
                                            >
                                                {product.cta_secondary_text}
                                            </a>
                                        ) : (
                                            <span className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-white border" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: accent }}>
                                                {product.cta_secondary_text}
                                            </span>
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right column: Image slider only */}
                        <div className="lg:col-span-2 space-y-3">
                            {galleryImages.length > 0 && (
                                <>
                                    <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-xl">
                                        <div className="relative aspect-video bg-white/5">
                                            <img
                                                src={galleryImages[sliderIndex]}
                                                alt=""
                                                className="w-full h-full object-contain cursor-pointer"
                                                onClick={() => setFullscreenImage(galleryImages[sliderIndex])}
                                            />
                                        </div>
                                    </div>
                                    {galleryImages.length > 1 && (
                                        <div className="flex items-center justify-center gap-4 py-2">
                                            <button type="button" onClick={() => setSliderIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1))} className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10" aria-label="Previous">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                            </button>
                                            <div className="flex items-center gap-2">
                                                {galleryImages.map((_, i) => (
                                                    <button key={i} type="button" onClick={() => setSliderIndex(i)} className={`h-2 rounded-full transition-all ${i === sliderIndex ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`} aria-label={`Slide ${i + 1}`} />
                                                ))}
                                            </div>
                                            <button type="button" onClick={() => setSliderIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1))} className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10" aria-label="Next">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </section>

                    {/* Key Benefits – next section with vertical angle */}
                    {benefits.length > 0 && (
                        <section className="mt-16 relative overflow-hidden">
                            <div className="relative flex">
                                {/* Vertical angled accent (slanted band on the left) */}
                                <div
                                    className="absolute left-0 top-0 bottom-0 origin-top"
                                    style={{
                                        width: '14px',
                                        transform: 'skewX(-12deg)',
                                        backgroundColor: accent,
                                        opacity: 0.7,
                                    }}
                                />
                                <div className="pl-6 sm:pl-8 py-10 flex-1 rounded-r-2xl bg-black/40 border border-white/5 border-l-0 shadow-xl" style={{ borderLeftColor: 'transparent' }}>
                                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                                        <span style={{ color: accent }}>◆</span> Key Benefits
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        {benefits.map((b, i) => (
                                            <div
                                                key={i}
                                                className="rounded-2xl bg-black/50 border border-white/10 p-6 sm:p-8 flex flex-col gap-4 shadow-lg hover:border-white/15 transition-colors"
                                                style={{ borderColor: accent + '30' }}
                                            >
                                                <span className="shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-black/60 border overflow-hidden" style={{ borderColor: accent + '50', backgroundColor: accent + '15' }}>
                                                    {b.icon && (b.icon.startsWith('http') || b.icon.startsWith('/')) ? (
                                                        <img src={b.icon} alt="" className="w-9 h-9 object-contain" />
                                                    ) : (
                                                        <span className="text-3xl" style={{ color: accent }}>{b.icon || '•'}</span>
                                                    )}
                                                </span>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-white">{b.title}</h3>
                                                    {b.description && <p className="text-gray-400 mt-2 leading-relaxed">{b.description}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Fullscreen image lightbox */}
                    <AnimatePresence>
                        {fullscreenImage && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                                onClick={() => setFullscreenImage(null)}
                            >
                                <button type="button" onClick={() => setFullscreenImage(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10" aria-label="Close">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                                <motion.img
                                    initial={{ scale: 0.95 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0.95 }}
                                    src={fullscreenImage}
                                    alt=""
                                    className="max-w-full max-h-full object-contain"
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* What's included (features) when no benefits block */}
                    {benefits.length === 0 && Array.isArray(product.features) && product.features.length > 0 && (
                        <section className="max-w-3xl mx-auto py-12 mt-12">
                            <h2 className="text-2xl font-bold text-white mb-8">What&apos;s included</h2>
                            <ul className="space-y-4">
                                {product.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: accent + '33' }}>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke={accent} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Latest projects for this product */}
                    {Array.isArray(product.projects) && product.projects.length > 0 && (
                        <section className="mt-16">
                            <h2 className="text-2xl font-bold text-white mb-2">Latest projects</h2>
                            <p className="text-gray-400 mb-8">Recent work delivered for this product.</p>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {product.projects.map((proj) => (
                                    <div key={proj.id} className="rounded-xl overflow-hidden bg-black/40 border border-white/5">
                                        {proj.image ? (
                                            <div className="aspect-video bg-white/5">
                                                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="aspect-video bg-gradient-to-br from-[#f59e0b]/10 to-transparent flex items-center justify-center">
                                                <span className="text-4xl opacity-50">🚀</span>
                                            </div>
                                        )}
                                        <div className="p-4">
                                            {proj.category && <span className="text-xs font-medium text-[#f59e0b]">{proj.category}</span>}
                                            <h3 className="font-semibold text-white mt-1">{proj.title}</h3>
                                            {proj.description && <p className="text-sm text-gray-400 mt-1 line-clamp-2">{proj.description}</p>}
                                            {proj.project_url && (
                                                <a href={proj.project_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm mt-2" style={{ color: accent }}>
                                                    Visit project <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Contact CTA */}
                    <div className="mt-8 flex justify-end">
                        <Link
                            to="/#contact"
                            className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg font-semibold text-white transition-colors hover:opacity-90"
                            style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderStyle: 'solid', borderColor: accent }}
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProductDetail;
