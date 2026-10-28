import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import { products as staticProducts } from '../data/products';
import { imageUrl } from '../utils/imageUrl';

export default function Products() {
    const [products, setProducts] = useState(staticProducts);

    useEffect(() => {
        let active = true;
        fetchProducts().then((data) => {
            if (active && data?.length) {
                setProducts(data);
            }
        });
        return () => {
            active = false;
        };
    }, []);

    return (
        <section id="products" className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#030712]">
            {/* Ambient High-Tech Blueprint Background */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `linear-gradient(#38bdf8 1px, transparent 1px), linear-gradient(90deg, #38bdf8 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-blue-600/15 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#030712] to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#38bdf8] mb-3">
                        <span className="w-6 h-[1.5px] bg-[#38bdf8]" />
                        <span>OUR PRODUCTS</span>
                        <span className="w-6 h-[1.5px] bg-[#38bdf8]" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                        Powerful <span className="text-[#38bdf8]">Solutions</span><br />
                        Built for Real Businesses
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Explore our range of specialized software products engineered to automate workflows, accelerate operations and grow your enterprise.
                    </p>
                </div>

                {/* ── ALL PRODUCTS GRID (DYNAMIC IMAGES & LOGOS FROM ADMIN PANEL) ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                    {products.map((prod, idx) => {
                        const feats = Array.isArray(prod.features) && prod.features.length
                            ? prod.features
                            : ['Operations Workflow', 'Billing & Invoicing', 'Inventory & Reports', 'Instant Notifications'];

                        const bgImg = prod.background_image ? imageUrl(prod.background_image) : null;
                        const logoImg = prod.logo ? imageUrl(prod.logo) : null;
                        const isComingSoon = prod.status === 'coming_soon';

                        return (
                            <motion.div
                                key={prod.id ?? prod.slug ?? idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative rounded-3xl overflow-hidden flex flex-col justify-between border border-blue-500/20 hover:border-cyan-400/60 shadow-[0_20px_50px_rgba(0,0,0,0.55)] hover:shadow-[0_25px_65px_rgba(14,165,233,0.3)] hover:-translate-y-2 transition-all duration-300 group min-h-[540px] bg-[#04091a]"
                            >
                                {/* 1. DYNAMIC ADMIN BACKGROUND IMAGE WITH SEAMLESS VIGNETTE FADE */}
                                {bgImg ? (
                                    <div className="absolute top-0 inset-x-0 h-64 sm:h-72 z-0 overflow-hidden pointer-events-none">
                                        <img
                                            src={bgImg}
                                            alt={prod.name}
                                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-90 filter brightness-95"
                                        />
                                        {/* Seamless bottom fade into matching card background */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#04091a]/30 via-[#04091a]/60 to-[#04091a]" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#04091a]/40 via-transparent to-[#04091a]/40" />
                                    </div>
                                ) : (
                                    <div className="absolute top-0 inset-x-0 h-64 sm:h-72 z-0 bg-gradient-to-b from-blue-900/30 via-slate-900/50 to-[#04091a] pointer-events-none" />
                                )}

                                {/* Card ambient glow */}
                                <div className="absolute -top-16 -right-16 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none z-1" />
                                <div className="absolute top-32 left-1/2 -translate-x-1/2 w-48 h-32 bg-blue-600/15 rounded-full blur-2xl pointer-events-none z-1" />

                                {/* 2. TOP METADATA BAR (Category Tag & Status Badge) */}
                                <div className="relative z-10 p-6 pb-2 flex items-center justify-between gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold tracking-widest uppercase text-cyan-300 shadow-sm">
                                        <span>◆</span>
                                        <span>{prod.category || 'SYSTEM'}</span>
                                    </span>

                                    {isComingSoon ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-[10px] font-bold text-amber-300 tracking-wider uppercase shadow-md">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                            COMING SOON
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 text-[10px] font-bold text-emerald-300 tracking-wider uppercase shadow-md">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            READY TO DEPLOY
                                        </span>
                                    )}
                                </div>

                                {/* 3. CENTERED PROMINENT PRODUCT LOGO BADGE */}
                                <div className="relative z-10 flex flex-col items-center pt-2 px-6">
                                    <div className="relative group-hover:scale-110 transition-transform duration-300">
                                        {/* Ambient soft glow ring */}
                                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-60 blur-md group-hover:opacity-100 transition-opacity" />

                                        <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-[#07132c]/90 backdrop-blur-md p-3 border-2 border-white/20 shadow-[0_12px_28px_rgba(0,0,0,0.6)] flex items-center justify-center overflow-hidden">
                                            {logoImg ? (
                                                <img
                                                    src={logoImg}
                                                    alt={prod.name}
                                                    className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
                                                />
                                            ) : (
                                                <span className="text-2xl font-black text-cyan-300">
                                                    {prod.icon || prod.name?.charAt(0) || '◆'}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Product Title & Tagline */}
                                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-4 text-center group-hover:text-cyan-300 transition-colors">
                                        {prod.name}
                                    </h3>
                                    <p className="text-xs font-extrabold uppercase tracking-widest text-[#38bdf8] mt-1 text-center">
                                        {prod.tagline || 'Business Management Platform'}
                                    </p>
                                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2 text-center line-clamp-3 font-normal max-w-sm">
                                        {prod.desc || 'A complete software system engineered to automate workflows, accelerate operations and scale business growth.'}
                                    </p>
                                </div>

                                {/* 4. CARD BODY (Key Capabilities) */}
                                <div className="relative z-10 px-6 py-4 flex-grow flex flex-col justify-center">
                                    <div className="w-full pt-2 border-t border-white/10">
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 text-center">
                                            Key Capabilities
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {feats.slice(0, 4).map((f, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.06] backdrop-blur-sm border border-white/10 text-xs font-medium text-slate-200 group-hover:bg-white/[0.1] transition-colors"
                                                >
                                                    <svg className="w-3.5 h-3.5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="truncate">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 5. ACTION CTA BUTTON */}
                                <div className="relative z-10 p-6 pt-2">
                                    <Link
                                        to={`/products/${prod.slug}`}
                                        className="w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-[0_8px_20px_rgba(16,98,254,0.35)] group-hover:shadow-[0_12px_28px_rgba(14,165,233,0.55)] active:scale-95 transition-all cursor-pointer"
                                    >
                                        <span>Explore Product Details</span>
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Custom Software Request Banner */}
                <div className="mt-14 rounded-3xl bg-gradient-to-r from-blue-900/30 via-indigo-950/40 to-blue-900/30 border border-blue-500/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                    <div>
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
                            Need a Tailored System for Your Industry?
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300">
                            We develop fully bespoke software solutions according to your exact business workflow.
                        </p>
                    </div>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-lg whitespace-nowrap active:scale-95 transition-all"
                    >
                        <span>Request Custom Software</span>
                        <span>&rarr;</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
