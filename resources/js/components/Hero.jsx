import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchProducts } from '../api/products';
import { imageUrl } from '../utils/imageUrl';

const COMPANY_LOGO = '/images/logo.png';
const ORBIT_RADIUS = 140;

function Hero() {
    const [products, setProducts] = useState([]);
    const [focusIndex, setFocusIndex] = useState(-1);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            const data = await fetchProducts();
            if (!cancelled && Array.isArray(data)) setProducts(data);
            setLoading(false);
        })();
        return () => { cancelled = true; };
    }, []);

    // Intro + for each product: see circle, then logo at main circle → 1 + 2*N steps
    const totalSlides = 1 + Math.max(0, products.length) * 2;
    const heroHeightVh = totalSlides * 100;

    const updateFocus = useCallback(() => {
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight;
        const slideIndex = Math.floor(-rect.top / vh);
        // Odd slide (1,3,5…) = product at main circle; even (0,2,4…) = show full orbit
        const index = slideIndex % 2 === 1
            ? Math.min(products.length - 1, (slideIndex - 1) / 2)
            : -1;
        setFocusIndex(index);
    }, [products.length]);

    useEffect(() => {
        window.addEventListener('scroll', updateFocus, { passive: true });
        updateFocus();
        return () => window.removeEventListener('scroll', updateFocus);
    }, [updateFocus]);

    const focusedProduct = focusIndex >= 0 && focusIndex < products.length ? products[focusIndex] : null;

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative"
            style={{ height: `${heroHeightVh}vh` }}
        >
            {/* Background layer (no overflow here so sticky child can stick) */}
            <div className="absolute inset-0 bg-[#0a0c12] overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_40%,rgba(245,158,11,0.04)_100%)]" />
                <div className="absolute top-0 right-0 w-[70%] h-[80%] bg-gradient-to-bl from-[#f59e0b]/08 via-transparent to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[60%] bg-[#f59e0b]/05 rounded-full blur-3xl" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-50 pointer-events-none" />

            <div className="sticky top-0 h-screen w-full flex items-center">
                <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
                    {/* Left: intro text always visible (does not change on scroll) */}
                    <div className="relative z-20 max-w-2xl order-2 lg:order-1">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#f59e0b] mb-6 animate-fade-in">
                            IT & Graphic Solutions
                        </p>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] animate-fade-in-delay">
                            We Create
                            <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-[#fcd34d] via-[#f59e0b] to-[#d97706]">
                                Digital & Visual Experiences
                            </span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-400 leading-relaxed max-w-xl animate-fade-in-delay-2">
                            Scroll to discover our systems.
                        </p>
                    </div>

                    {/* Right: orbit (logos on circle) + main circle. When scroll: one logo smooth to center, others hide, show name+info */}
                    <div className="relative flex items-center justify-center order-1 lg:order-2 shrink-0 min-h-[320px] lg:min-h-0 px-4">
                        {/* Orbit: circle line + company logo (center) + planets. When focused: circle & sun & other planets hide; focused planet smooth to center */}
                        <div
                            className="hero-orbit-ring relative z-10"
                            style={{ ['--orbit-radius']: `${ORBIT_RADIUS}px` }}
                        >
                            <div
                                className={`hero-orbit-circle-line transition-opacity duration-500 ${focusedProduct ? 'opacity-0' : 'opacity-100'}`}
                                aria-hidden={!!focusedProduct}
                            />
                            {/* Company logo (main circle) – hidden when a product logo is at center */}
                            <div
                                className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${focusedProduct ? 'opacity-0' : 'opacity-100'}`}
                                aria-hidden={!!focusedProduct}
                            >
                                <div className="hero-main-circle w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden flex items-center justify-center p-3 z-10">
                                    <img src={COMPANY_LOGO} alt="Company" className="w-full h-full object-contain" />
                                </div>
                            </div>
                            {/* Planets on orbit – focused one smooths to center, others hide */}
                            {!loading && products.length > 0 && products.map((product, i) => {
                                const duration = 28;
                                const delay = -((i / Math.max(1, products.length)) * duration);
                                const isFocused = focusIndex === i;
                                return (
                                    <div
                                        key={product.id}
                                        className={`hero-planet ${isFocused ? 'hero-planet--focused' : ''}`}
                                        style={{
                                            ['--orbit-radius']: `${ORBIT_RADIUS}px`,
                                            ['--orbit-duration']: `${duration}s`,
                                            ['--orbit-delay']: `${delay}s`,
                                            ...(focusedProduct && !isFocused ? { opacity: 0, pointerEvents: 'none' } : {}),
                                        }}
                                    >
                                        <div className="hero-planet-inner">
                                            {product.logo ? (
                                                <img src={imageUrl(product.logo)} alt="" className="object-contain" />
                                            ) : (
                                                <span className="text-[#f59e0b] font-bold text-lg">{product.name?.slice(0, 1) || '?'}</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* When a logo is at center: show only its name + short description next to orbit */}
                        {focusedProduct && (
                            <div
                                key={focusIndex}
                                className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 z-20 min-w-0 max-w-lg animate-fade-in"
                                role="region"
                                aria-live="polite"
                            >
                                <div className="text-center sm:text-left min-w-0 flex-1">
                                    <h2 className="text-xl sm:text-2xl font-bold text-white">{focusedProduct.name}</h2>
                                    {focusedProduct.desc && (
                                        <p className="mt-2 text-gray-400 text-sm sm:text-base leading-relaxed">{focusedProduct.desc}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-float">
                    <a href="#about" className="flex flex-col items-center gap-2 text-gray-500 hover:text-[#f59e0b] transition-colors" aria-label="Scroll to about">
                        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Hero;
