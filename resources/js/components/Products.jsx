import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import { products as staticProducts } from '../data/products';

export default function Products() {
    const [products, setProducts] = useState(staticProducts);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    useEffect(() => {
        let active = true;
        fetchProducts().then((data) => {
            if (active && data?.length) {
                setProducts(data);
                if (data.length > 1) setCurrentIndex(1);
            }
        });
        const onResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => {
            active = false;
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % products.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

    useEffect(() => {
        if (isHovered || products.length <= 1) return;
        const timer = setInterval(nextSlide, 3800);
        return () => clearInterval(timer);
    }, [isHovered, products.length]);

    const getOffset = (idx) => {
        const len = products.length;
        let diff = (idx - currentIndex) % len;
        if (diff < -Math.floor(len / 2)) diff += len;
        if (diff > Math.floor((len - 1) / 2)) diff -= len;
        return diff;
    };

    const isMobile = windowWidth < 640;
    const cardSpacing = isMobile ? Math.min(220, Math.round(windowWidth * 0.60)) : windowWidth < 1024 ? 330 : 400;
    const rotateAngle = isMobile ? 32 : 28;

    return (
        <section id="products" className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#030712]">
            <div className="absolute inset-0 bg-cover bg-center pointer-events-none z-0 opacity-40 mix-blend-luminosity" style={{ backgroundImage: "url('/images/products_bg.jpg')" }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#030712]/80 to-[#030712] pointer-events-none z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/15 blur-[140px] rounded-full pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-10 sm:mb-14">
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#38bdf8] mb-3">
                        <span className="w-6 h-[1.5px] bg-[#38bdf8]" /><span>OUR PRODUCTS</span><span className="w-6 h-[1.5px] bg-[#38bdf8]" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                        Powerful <span className="text-[#38bdf8]">Solutions</span><br />Built for Real Businesses
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        Explore our range of software solutions designed to simplify operations, improve efficiency and help businesses grow.
                    </p>
                </div>

                {/* 3D Coverflow Smooth Moving Slider */}
                <div 
                    className="relative w-full h-[560px] sm:h-[620px] flex items-center justify-center [perspective:1400px] overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <button type="button" onClick={prevSlide} aria-label="Previous" className="hidden sm:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#051536]/80 border border-blue-500/30 text-blue-300 hover:text-white hover:bg-[#1062FE] backdrop-blur-md items-center justify-center transition-all shadow-2xl z-40">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
                        {products.map((prod, idx) => {
                            const offset = getOffset(idx);
                            const isCenter = offset === 0;
                            const isVisible = Math.abs(offset) <= 1;
                            const feats = Array.isArray(prod.features) && prod.features.length ? prod.features : ['Order Management', 'Billing & Payments', 'Inventory Control', 'Analytics'];

                            return (
                                <motion.div
                                    key={prod.id ?? prod.slug ?? idx}
                                    onClick={() => !isCenter && setCurrentIndex(idx)}
                                    initial={false}
                                    animate={{
                                        x: offset * cardSpacing,
                                        rotateY: offset === 0 ? 0 : offset < 0 ? rotateAngle : -rotateAngle,
                                        scale: isCenter ? (isMobile ? 1 : 1.06) : (isMobile ? 0.74 : 0.86),
                                        zIndex: isCenter ? 30 : 20 - Math.abs(offset),
                                        opacity: isVisible ? (isCenter ? 1 : (isMobile ? 0.7 : 0.85)) : 0,
                                        pointerEvents: isVisible ? 'auto' : 'none',
                                    }}
                                    transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
                                    className={`absolute w-[280px] sm:w-[350px] md:w-[370px] rounded-3xl overflow-hidden flex flex-col justify-between cursor-pointer select-none ${
                                        isCenter
                                            ? 'bg-[#061530]/95 border-2 border-[#1062FE] shadow-[0_0_50px_rgba(16,98,254,0.5)] ring-1 ring-cyan-400/50'
                                            : 'bg-[#06132b]/85 border border-white/10 hover:border-blue-500/40'
                                    }`}
                                >
                                    <div className="relative w-full h-32 sm:h-36 overflow-hidden bg-slate-900/80">
                                        {prod.background_image ? (
                                            <img src={prod.background_image} alt={prod.name} className="w-full h-full object-cover opacity-60 mix-blend-screen scale-105" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-900/40 via-cyan-900/20 to-transparent" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#061530]/40 to-[#061530]" />

                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center p-1 bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-[0_8px_24px_rgba(0,0,0,0.5)] overflow-hidden ring-2 ring-white/20">
                                            {prod.logo ? (
                                                <img src={prod.logo} alt={prod.name} className="w-full h-full object-cover rounded-xl" />
                                            ) : (
                                                <span className="text-2xl font-black text-white">{prod.icon || prod.name?.charAt(0)}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6 pt-3 flex flex-col flex-grow justify-between">
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-black text-white text-center tracking-tight mb-1">{prod.name}</h3>
                                            <p className="text-xs sm:text-sm font-semibold text-[#38bdf8] text-center mb-3 line-clamp-1">{prod.tagline || 'Business Management System'}</p>
                                            <p className="text-xs text-slate-300 text-center leading-relaxed mb-5 line-clamp-3 min-h-[3rem]">
                                                {prod.desc || 'A complete management system designed to handle operations, billing, and workflows with ease.'}
                                            </p>
                                            <div className="grid grid-cols-2 gap-2 mb-6">
                                                {feats.slice(0, 4).map((f, i) => (
                                                    <div key={i} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-medium text-slate-200 truncate">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                                        <span className="truncate">{f}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <Link
                                            to={`/products/${prod.slug}`}
                                            className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                                                isCenter
                                                    ? 'bg-gradient-to-r from-[#1062FE] to-[#00b4d8] hover:from-[#0052E0] text-white shadow-[0_8px_20px_rgba(16,98,254,0.4)]'
                                                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/20'
                                            }`}
                                        >
                                            <span>View Details</span>
                                            <span>&rarr;</span>
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <button type="button" onClick={nextSlide} aria-label="Next" className="hidden sm:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#051536]/80 border border-blue-500/30 text-blue-300 hover:text-white hover:bg-[#1062FE] backdrop-blur-md items-center justify-center transition-all shadow-2xl z-40">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>

                <div className="flex justify-center items-center gap-2 mt-6">
                    {products.map((_, dotIdx) => (
                        <button
                            key={dotIdx}
                            type="button"
                            onClick={() => setCurrentIndex(dotIdx)}
                            aria-label={`Go to slide ${dotIdx + 1}`}
                            className={`transition-all duration-300 rounded-full ${
                                dotIdx === currentIndex ? 'w-7 h-2 bg-[#1062FE] shadow-[0_0_10px_rgba(16,98,254,0.7)]' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
