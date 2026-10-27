import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import { products as staticProducts } from '../data/products';

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
            {/* Ambient Background Grid & Glows */}
            <div
                className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-30 mix-blend-luminosity"
                style={{ backgroundImage: "url('/images/products_bg.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#030712]/85 to-[#030712] pointer-events-none z-0" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 blur-[150px] rounded-full pointer-events-none z-0" />

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

                {/* ── ALL PRODUCTS GRID (NO CAROUSEL, FULL VISIBILITY) ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                    {products.map((prod, idx) => {
                        const feats = Array.isArray(prod.features) && prod.features.length
                            ? prod.features
                            : ['Operations Workflow', 'Billing & Invoicing', 'Inventory & Reports', 'Instant Notifications'];

                        return (
                            <motion.div
                                key={prod.id ?? prod.slug ?? idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.12 }}
                                className="relative rounded-3xl overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#061530]/95 to-[#040e22]/95 border border-blue-500/25 hover:border-[#1062FE] shadow-[0_12px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(16,98,254,0.35)] hover:-translate-y-2 transition-all duration-300 group"
                            >
                                {/* Top Banner Graphic with Product Icon */}
                                <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-slate-900/90">
                                    {prod.background_image ? (
                                        <img
                                            src={prod.background_image}
                                            alt={prod.name}
                                            className="w-full h-full object-cover opacity-60 mix-blend-screen scale-105 group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-900/40 via-cyan-900/20 to-transparent" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#061530]/60 to-[#061530]" />

                                    {/* Product Floating Logo / Icon Badge */}
                                    <div className="absolute -bottom-2 left-6 w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center p-1.5 bg-gradient-to-tr from-[#1062FE] to-[#38bdf8] shadow-[0_10px_25px_rgba(0,0,0,0.6)] ring-2 ring-white/20 group-hover:scale-105 transition-transform">
                                        {prod.logo ? (
                                            <img
                                                src={prod.logo}
                                                alt={prod.name}
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                        ) : (
                                            <span className="text-3xl select-none">
                                                {prod.icon || '🚀'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Live Badge */}
                                    <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-[10px] font-bold text-emerald-400 tracking-wider uppercase">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        READY TO DEPLOY
                                    </div>
                                </div>

                                {/* Product Body Information */}
                                <div className="p-6 sm:p-7 pt-4 flex flex-col flex-grow justify-between">
                                    <div>
                                        <h3 className="text-2xl font-black text-white tracking-tight mb-1 group-hover:text-[#38bdf8] transition-colors">
                                            {prod.name}
                                        </h3>
                                        <p className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] mb-3">
                                            {prod.tagline || 'Business Management System'}
                                        </p>
                                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                                            {prod.desc || 'A complete management system engineered to automate workflows, streamline billing, and accelerate operational growth.'}
                                        </p>

                                        {/* Core Features List */}
                                        <div className="mb-6 space-y-2">
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                Key Capabilities:
                                            </p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {feats.slice(0, 4).map((f, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-slate-200"
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

                                    {/* Action Button */}
                                    <Link
                                        to={`/products/${prod.slug}`}
                                        className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-[#1062FE] to-[#00b4d8] hover:from-[#0052E0] text-white shadow-[0_8px_20px_rgba(16,98,254,0.35)] group-hover:shadow-[0_12px_28px_rgba(16,98,254,0.55)] active:scale-95 transition-all"
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
