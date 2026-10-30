import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchProducts } from '../api/products';
import { products as staticProducts } from '../data/products';
import { imageUrl } from '../utils/imageUrl';

// Fallback background images if none is uploaded in admin
const FALLBACK_BGS = [
    '/images/products/smartdrive_bg.jpg',
    '/images/dsrzone-laundry-system-icon.jpg',
    '/images/dsrzone-reach-laptop-showcase.jpg',
    '/images/dsrzone-mountain-summit-cta.png',
    '/images/dsrzone-services-banner.jpg',
    '/images/dsrzone-about-banner.jpg',
    '/images/dsrzone-contact-banner.jpg',
    '/images/dsrzone-enterprise-platform-showcase.jpg',
];

export default function Products() {
    const [products, setProducts] = useState(staticProducts);

    useEffect(() => {
        let active = true;
        fetchProducts().then((data) => {
            if (active && Array.isArray(data) && data.length > 0) {
                setProducts(data);
            }
        });
        return () => {
            active = false;
        };
    }, []);

    const displayList = products.length > 0 ? products : staticProducts;

    return (
        <section id="products" className="relative w-full py-16 sm:py-24 lg:py-28 overflow-hidden bg-[#030712] text-white">
            {/* Ambient High-Tech Blueprint Matrix Background */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)`,
                        backgroundSize: '48px 48px'
                    }}
                />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-blue-600/15 rounded-full blur-[140px]" />
                <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
                {/* ── SECTION HEADER ── */}
                <div className="text-center mb-10 sm:mb-16">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#38bdf8] mb-3">
                        <span className="w-5 h-[1.5px] bg-[#38bdf8]" />
                        <span>OUR PRODUCTS</span>
                        <span className="w-5 h-[1.5px] bg-[#38bdf8]" />
                    </div>

                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
                        One Platform. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-400">
                            Multiple Industries.
                        </span>
                    </h2>

                    <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed px-2 font-normal">
                        Discover our range of software products built to simplify operations, increase productivity and help businesses grow.
                    </p>
                </div>

                {/* ── PRODUCTS GRID: 4 CARDS PER LINE ON DESKTOP (lg:grid-cols-4), 2 CARDS PER LINE ON MOBILE (grid-cols-2) ── */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 items-stretch">
                    {displayList.map((prod, idx) => {
                        const feats = Array.isArray(prod.features) && prod.features.length
                            ? prod.features
                            : ['Operations Workflow', 'Billing & Invoicing', 'Inventory & Reports'];

                        const bgImg = prod.background_image
                            ? imageUrl(prod.background_image)
                            : FALLBACK_BGS[idx % FALLBACK_BGS.length];

                        const logoImg = prod.logo ? imageUrl(prod.logo) : null;
                        const isComingSoon = prod.status === 'coming_soon';
                        const accent = prod.accent_color || '#0ea5e9';

                        return (
                            <motion.div
                                key={prod.id ?? prod.slug ?? idx}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: (idx % 4) * 0.08 }}
                                className="relative rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between border border-blue-500/20 hover:border-cyan-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_45px_rgba(14,165,233,0.3)] hover:-translate-y-1.5 transition-all duration-300 group bg-[#04091a]"
                            >
                                {/* 1. DYNAMIC BACKGROUND IMAGE WITH SEAMLESS VIGNETTE FADE */}
                                <div className="absolute top-0 inset-x-0 h-28 sm:h-36 lg:h-44 z-0 overflow-hidden pointer-events-none">
                                    <img
                                        src={bgImg}
                                        alt={prod.name}
                                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 opacity-80 filter brightness-95"
                                        loading="lazy"
                                    />
                                    {/* Seamless bottom fade into matching card background */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#04091a]/30 via-[#04091a]/60 to-[#04091a]" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#04091a]/40 via-transparent to-[#04091a]/40" />
                                </div>

                                {/* Ambient Soft Card Glow */}
                                <div className="absolute -top-12 -right-12 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                                {/* 2. TOP METADATA BAR (Category Tag & Status Badge) */}
                                <div className="relative z-10 p-2.5 sm:p-4 pb-1 sm:pb-2 flex items-center justify-between gap-1.5">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-cyan-300 shadow-sm truncate max-w-[110px] sm:max-w-none">
                                        <span>◆</span>
                                        <span className="truncate">{prod.category || 'SYSTEM'}</span>
                                    </span>

                                    {isComingSoon ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-[9px] sm:text-[10px] font-bold text-amber-300 tracking-wider uppercase shadow-sm shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                            <span className="hidden sm:inline">SOON</span>
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-[9px] sm:text-[10px] font-bold text-emerald-300 tracking-wider uppercase shadow-sm shrink-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="hidden sm:inline">READY</span>
                                        </span>
                                    )}
                                </div>

                                {/* 3. CENTERED PRODUCT LOGO / ICON BADGE */}
                                <div className="relative z-10 flex flex-col items-center pt-1 sm:pt-2 px-2.5 sm:px-4">
                                    <div className="relative group-hover:scale-110 transition-transform duration-300">
                                        {/* Ambient soft glow ring */}
                                        <div
                                            className="absolute -inset-1 rounded-2xl sm:rounded-3xl opacity-60 blur-md group-hover:opacity-100 transition-opacity"
                                            style={{ backgroundColor: accent }}
                                        />

                                        <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-16 lg:h-16 rounded-2xl sm:rounded-3xl bg-[#07132c]/95 backdrop-blur-md p-1.5 sm:p-2 border-2 border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
                                            {logoImg ? (
                                                <img
                                                    src={logoImg}
                                                    alt={prod.name}
                                                    className="w-full h-full object-contain rounded-xl sm:rounded-2xl filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                                                />
                                            ) : (
                                                <span className="text-xl sm:text-2xl font-black text-cyan-300">
                                                    {prod.icon && !prod.icon.startsWith('http') ? prod.icon : (prod.name?.charAt(0) || '◆')}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Title & Subtitle */}
                                    <h3 className="text-xs sm:text-base lg:text-[17px] font-black text-white tracking-tight mt-2.5 sm:mt-3 text-center transition-colors line-clamp-2 leading-snug">
                                        {prod.name}
                                    </h3>

                                    <p className="text-[9px] sm:text-[11px] font-extrabold uppercase tracking-wider text-[#38bdf8] mt-0.5 sm:mt-1 text-center line-clamp-1">
                                        {prod.tagline || 'Management System'}
                                    </p>

                                    <p className="text-[10px] sm:text-xs text-slate-300 leading-relaxed mt-1 sm:mt-2 text-center line-clamp-2 sm:line-clamp-3 font-normal px-0.5">
                                        {prod.desc || prod.description || 'Specialized software solution engineered to automate workflows and accelerate operations.'}
                                    </p>
                                </div>

                                {/* 4. KEY CAPABILITIES (Shown on Tablet & Desktop) */}
                                <div className="relative z-10 px-2.5 sm:px-4 py-2 sm:py-3 flex-grow flex flex-col justify-end">
                                    <div className="w-full pt-1.5 sm:pt-2 border-t border-white/10 hidden sm:block">
                                        <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 text-center">
                                            Key Features
                                        </p>
                                        <div className="flex flex-col gap-1">
                                            {feats.slice(0, 2).map((f, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.05] border border-white/5 text-[10px] sm:text-[11px] font-medium text-slate-300"
                                                >
                                                    <svg className="w-3 h-3 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="truncate">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 5. ACTION CTA BUTTON -> Links to Contact Us (#contact) */}
                                <div className="relative z-10 p-2.5 sm:p-4 pt-1 sm:pt-2">
                                    <a
                                        href="#contact"
                                        className="w-full py-2 sm:py-2.5 rounded-xl sm:rounded-2xl font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1.5 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_6px_16px_rgba(16,98,254,0.35)] group-hover:shadow-[0_10px_24px_rgba(14,165,233,0.5)] active:scale-95 transition-all cursor-pointer"
                                    >
                                        <span>Get Details</span>
                                        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── BOTTOM BESPOKE SOFTWARE REQUEST BANNER ── */}
                <div className="mt-12 sm:mt-16 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-900/30 via-indigo-950/40 to-blue-900/30 border border-blue-500/20 p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-lg">
                    <div>
                        <h4 className="text-base sm:text-xl font-bold text-white mb-1">
                            Need a Tailored System for Your Industry?
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300">
                            We develop fully bespoke software solutions according to your exact business workflow.
                        </p>
                    </div>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-2.5 sm:py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md whitespace-nowrap active:scale-95 transition-all shrink-0"
                    >
                        <span>Request Custom Software</span>
                        <span>&rarr;</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
