import React, { useState, useEffect, useCallback } from 'react';
import axios from '../config/axios';
import ScrollReveal from './ScrollReveal';
import { imageUrl } from '../utils/imageUrl';
import { motion, AnimatePresence } from 'framer-motion';

// Base pins across Sri Lanka (Coordinates only, NO district names)
const DEFAULT_PINS = [
    {
        id: 'pos',
        map_x: 41.5,
        map_y: 61.5,
        title: 'Restaurant POS System',
        description: 'A complete POS and management system for restaurants to manage orders, billing, menu, inventory and reports.',
        image: '/images/dsrzone-enterprise-platform-showcase.jpg',
        project_url: '#portfolio',
        features: [
            { icon: 'billing', label: 'POS & Billing' },
            { icon: 'menu', label: 'Menu Management' },
            { icon: 'inventory', label: 'Inventory Control' },
            { icon: 'analytics', label: 'Reports & Analytics' }
        ]
    },
    {
        id: 'inventory',
        map_x: 53.0,
        map_y: 51.5,
        title: 'Inventory Pro — Lanka Pharma',
        description: 'Real-time multi-branch stock tracking with barcode scanning, automated reordering, and expiry tracking.',
        image: '/images/dsrzone-products-banner.jpg',
        project_url: '#portfolio',
        features: [
            { icon: 'inventory', label: 'Multi-Branch Sync' },
            { icon: 'billing', label: 'Automated Invoicing' },
            { icon: 'menu', label: 'Barcode Scanning' },
            { icon: 'analytics', label: 'Audit & Forecasting' }
        ]
    },
    {
        id: 'ecommerce',
        map_x: 43.5,
        map_y: 80.0,
        title: 'E-Commerce Platform & Order Automation',
        description: 'High-speed retail portal with automated WhatsApp notifications, online payments, and live courier tracking.',
        image: '/images/dsrzone-reach-laptop-showcase.jpg',
        project_url: '#portfolio',
        features: [
            { icon: 'billing', label: 'Instant Checkout' },
            { icon: 'menu', label: 'WhatsApp Automation' },
            { icon: 'inventory', label: 'Courier Integration' },
            { icon: 'analytics', label: 'Live Sales Dashboard' }
        ]
    },
    {
        id: 'lms',
        map_x: 49.5,
        map_y: 12.5,
        title: 'EduPulse — Learning Platform',
        description: 'Complete LMS powering institutes with live video classrooms, student exams, and automatic certifications.',
        image: '/images/dsrzone-about-banner.jpg',
        project_url: '#portfolio',
        features: [
            { icon: 'menu', label: 'Virtual Classrooms' },
            { icon: 'billing', label: 'Student Portals' },
            { icon: 'inventory', label: 'Exam Engine' },
            { icon: 'analytics', label: 'Grading Reports' }
        ]
    },
    {
        id: 'hotel',
        map_x: 58.5,
        map_y: 27.5,
        title: 'BookEase — Hotel & Resort PMS',
        description: 'Integrated hotel booking engine with room management, guest housekeeping dashboard and real-time billing.',
        image: '/images/dsrzone-products-banner.jpg',
        project_url: '#portfolio',
        features: [
            { icon: 'menu', label: 'Room Reservations' },
            { icon: 'billing', label: 'Guest Folio & POS' },
            { icon: 'inventory', label: 'Housekeeping Desk' },
            { icon: 'analytics', label: 'Occupancy Analytics' }
        ]
    },
    {
        id: 'fleet',
        map_x: 47.5,
        map_y: 36.5,
        title: 'AgriSupply & Fleet Dispatch',
        description: 'Agricultural supply chain management connecting farmers, distributors, and fleet dispatch vehicles with live GPS.',
        image: '/images/dsrzone-enterprise-platform-showcase.jpg',
        project_url: '#portfolio',
        features: [
            { icon: 'inventory', label: 'GPS Fleet Tracking' },
            { icon: 'billing', label: 'Farmer Direct Payments' },
            { icon: 'menu', label: 'Produce Catalog' },
            { icon: 'analytics', label: 'Yield Analytics' }
        ]
    },
    {
        id: 'clinic',
        map_x: 57.5,
        map_y: 85.0,
        title: 'MediCare Clinic & Patient System',
        description: 'Digital appointments, electronic prescriptions, and lab report delivery system serving healthcare clinics.',
        image: '/images/dsrzone-reach-laptop-showcase.jpg',
        project_url: '#portfolio',
        features: [
            { icon: 'billing', label: 'Doctor Scheduling' },
            { icon: 'menu', label: 'E-Prescriptions' },
            { icon: 'inventory', label: 'Pharmacy Stock' },
            { icon: 'analytics', label: 'Patient History' }
        ]
    }
];

function FeatureIcon({ type }) {
    switch (type) {
        case 'billing':
            return (
                <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            );
        case 'menu':
            return (
                <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            );
        case 'inventory':
            return (
                <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            );
        case 'analytics':
        default:
            return (
                <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            );
    }
}

export default function SriLankaMap() {
    const [items, setItems] = useState(DEFAULT_PINS);
    const [activeIdx, setActiveIdx] = useState(0);

    // Fetch projects from backend API and merge with map points
    useEffect(() => {
        axios.get('/api/v1/projects')
            .then(r => {
                const rawList = Array.isArray(r.data) ? r.data : (r.data?.data || []);
                const apiProjects = rawList.filter(p => p.map_x != null && p.map_y != null);
                
                if (apiProjects.length > 0) {
                    const normalizedApi = apiProjects.map((p) => {
                        const defaultFeatures = [
                            { icon: 'billing', label: p.technologies?.[0] || 'Core Architecture' },
                            { icon: 'menu', label: p.technologies?.[1] || 'Real-time System' },
                            { icon: 'inventory', label: p.technologies?.[2] || 'Database & Storage' },
                            { icon: 'analytics', label: p.technologies?.[3] || 'Security & Analytics' },
                        ];

                        return {
                            id: p.id,
                            map_x: parseFloat(p.map_x),
                            map_y: parseFloat(p.map_y),
                            title: p.title,
                            description: p.description || p.solution || 'Custom enterprise solution deployed and operational.',
                            image: p.image,
                            project_url: p.project_url || '#portfolio',
                            features: defaultFeatures
                        };
                    });

                    setItems([...normalizedApi, ...DEFAULT_PINS.slice(normalizedApi.length)]);
                }
            })
            .catch(() => {
                // Keep DEFAULT_PINS
            });
    }, []);

    const count = items.length;
    const activeItem = count > 0 ? items[activeIdx % count] : null;

    // Continuous auto-rotation (runs non-stop, every 4.5 seconds)
    useEffect(() => {
        if (count <= 1) return;
        const timer = setInterval(() => {
            setActiveIdx(cur => (cur + 1) % count);
        }, 4500);
        return () => clearInterval(timer);
    }, [count]);

    const handleSelect = useCallback((index) => {
        setActiveIdx(index);
    }, []);

    const handlePrev = useCallback(() => {
        setActiveIdx(cur => (cur - 1 + count) % count);
    }, [count]);

    const handleNext = useCallback(() => {
        setActiveIdx(cur => (cur + 1) % count);
    }, [count]);

    return (
        <section
            id="clients-map"
            className="relative bg-[#020611] border-t border-white/5 overflow-hidden w-full min-h-screen flex flex-col justify-center py-16 sm:py-24"
        >
            {/* ─── FULL-SECTION HIGH-TECH GEOMETRIC CYBER PATTERN BACKGROUND ─── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                
                {/* 1. Cyber Dot Matrix Pattern */}
                <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.35) 1px, transparent 1px)',
                        backgroundSize: '28px 28px'
                    }}
                />

                {/* 2. Cyber Isometric / Hex Tech Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-15"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(0, 166, 255, 0.08) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 166, 255, 0.08) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* 3. Deep Ambient Cyan Radial Glows */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0080ff]/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-[#00d0ff]/10 rounded-full blur-[140px] pointer-events-none" />

                {/* 4. Vignette / Contrast Edges */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020611] via-transparent to-[#020611]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020611]/80 via-transparent to-[#020611]/80" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
                    
                    {/* ════════════ LEFT COLUMN: HEADER & 2x2 METRIC CARDS ════════════ */}
                    <div className="lg:col-span-4 flex flex-col justify-center text-center lg:text-left">
                        <ScrollReveal>
                            
                            {/* Top Category Tag (Centered on mobile, left on desktop) */}
                            <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-3">
                                <span className="w-5 h-[1.5px] bg-[#00a6ff]" />
                                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#00a6ff] font-mono">
                                    OUR REACH
                                </span>
                                <span className="w-5 h-[1.5px] bg-[#00a6ff]" />
                            </div>

                            {/* Main Title */}
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                                Clients Across <br className="hidden sm:inline" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a6ff] via-[#38bdf8] to-[#00d0ff]">
                                    Sri Lanka
                                </span>
                            </h2>

                            {/* Subtitle Description */}
                            <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-md mx-auto lg:mx-0">
                                We work with businesses, institutions and organizations across the island, delivering custom software solutions that help them grow.
                            </p>

                            {/* 4 Stat Cards in 2 LINES (2x2 Grid) */}
                            <div className="relative mt-7 p-3 sm:p-4 rounded-3xl bg-gradient-to-br from-[#070e1c]/80 via-[#0a1628]/60 to-transparent border border-white/5 backdrop-blur-xl max-w-md mx-auto lg:mx-0 shadow-2xl">
                                
                                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,166,255,0.12),transparent_70%)] rounded-3xl pointer-events-none" />

                                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 relative z-10">
                                    
                                    {/* Stat 1: Projects Delivered */}
                                    <div className="p-3 sm:p-3.5 rounded-2xl bg-[#060c18]/90 border border-white/10 backdrop-blur-md shadow-lg flex flex-col justify-between hover:border-cyan-500/40 transition-all text-left">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mb-2">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="text-xl sm:text-2xl font-black text-white leading-none">
                                            50+
                                        </div>
                                        <div className="text-[11px] text-slate-400 font-medium mt-1 leading-tight">
                                            Projects Delivered
                                        </div>
                                    </div>

                                    {/* Stat 2: Happy Clients */}
                                    <div className="p-3 sm:p-3.5 rounded-2xl bg-[#060c18]/90 border border-white/10 backdrop-blur-md shadow-lg flex flex-col justify-between hover:border-cyan-500/40 transition-all text-left">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mb-2">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <div className="text-xl sm:text-2xl font-black text-white leading-none">
                                            30+
                                        </div>
                                        <div className="text-[11px] text-slate-400 font-medium mt-1 leading-tight">
                                            Happy Clients
                                        </div>
                                    </div>

                                    {/* Stat 3: Cities & Towns */}
                                    <div className="p-3 sm:p-3.5 rounded-2xl bg-[#060c18]/90 border border-white/10 backdrop-blur-md shadow-lg flex flex-col justify-between hover:border-cyan-500/40 transition-all text-left">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mb-2">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="text-xl sm:text-2xl font-black text-white leading-none">
                                            20+
                                        </div>
                                        <div className="text-[11px] text-slate-400 font-medium mt-1 leading-tight">
                                            Cities &amp; Towns
                                        </div>
                                    </div>

                                    {/* Stat 4: Commitment to Quality */}
                                    <div className="p-3 sm:p-3.5 rounded-2xl bg-[#060c18]/90 border border-white/10 backdrop-blur-md shadow-lg flex flex-col justify-between hover:border-cyan-500/40 transition-all text-left">
                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mb-2">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div className="text-xl sm:text-2xl font-black text-white leading-none">
                                            100%
                                        </div>
                                        <div className="text-[11px] text-slate-400 font-medium mt-1 leading-tight">
                                            Commitment to Quality
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </ScrollReveal>
                    </div>

                    {/* ════════════ CENTER COLUMN: SRI LANKA MAP (CLEAN PINS, NO DISTRICT TEXT) ════════════ */}
                    <div className="lg:col-span-4 flex items-center justify-center relative py-4">
                        
                        <div className="relative w-full max-w-[310px] sm:max-w-[350px] lg:max-w-[370px] mx-auto">
                            
                            {/* Sri Lanka Map PNG with Electric Neon Outline */}
                            <img
                                src="/images/dsrzone-sri-lanka-coverage-map.png"
                                alt="DSRZone Island-Wide Digital System Client Network in Sri Lanka"
                                title="DSRZone Island-Wide Digital Coverage in Sri Lanka"
                                className="relative w-full block select-none pointer-events-none drop-shadow-[0_0_24px_rgba(0,166,255,0.65)] filter brightness-125 saturate-200"
                                style={{ zIndex: 10 }}
                            />

                            {/* Clean Pins on Map (NO district/city names anywhere) */}
                            <div className="absolute inset-0" style={{ zIndex: 20 }}>
                                {items.map((item, idx) => {
                                    const isActive = idx === (activeIdx % count);
                                    const posX = item.map_x;
                                    const posY = item.map_y;

                                    return (
                                        <div
                                            key={item.id || idx}
                                            className="absolute"
                                            style={{
                                                left: `${posX}%`,
                                                top: `${posY}%`,
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        >
                                            {isActive ? (
                                                /* ACTIVE PIN: PULSING RIPPLES + GLOWING BEACON (NO TEXT) */
                                                <button
                                                    type="button"
                                                    onClick={() => handleSelect(idx)}
                                                    className="relative flex items-center justify-center focus:outline-none"
                                                    aria-label="Active Pin"
                                                >
                                                    {/* Outer expanding ripple */}
                                                    <span className="absolute w-8 h-8 rounded-full bg-[#00d0ff]/40 animate-ping pointer-events-none" />
                                                    
                                                    {/* Middle glowing halo */}
                                                    <span className="absolute w-6 h-6 rounded-full bg-[#0080ff]/50 animate-pulse pointer-events-none" />
                                                    
                                                    {/* Center Pin Button */}
                                                    <span className="relative z-10 w-4 h-4 rounded-full bg-[#00a6ff] border-2 border-white shadow-[0_0_18px_#00d0ff] flex items-center justify-center">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                                    </span>
                                                </button>
                                            ) : (
                                                /* INACTIVE PIN: CLEAN GLOWING DOT ONLY (NO TEXT) */
                                                <button
                                                    type="button"
                                                    onClick={() => handleSelect(idx)}
                                                    className="group relative flex items-center justify-center p-1.5 focus:outline-none"
                                                    aria-label="Map Pin"
                                                >
                                                    <span className="w-2.5 h-2.5 rounded-full bg-[#00d0ff] shadow-[0_0_8px_#00d0ff] group-hover:scale-150 group-hover:bg-white transition-all duration-300 block" />
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                    </div>

                    {/* ════════════ RIGHT COLUMN: SHOWCASE CARD (NO DISTRICT TEXT) ════════════ */}
                    <div className="lg:col-span-4 flex flex-col justify-center">
                        <AnimatePresence mode="wait">
                            {activeItem && (
                                <motion.div
                                    key={activeItem.id || activeIdx}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.35, ease: 'easeOut' }}
                                    className="relative rounded-3xl bg-[#070e1c]/90 border border-white/10 backdrop-blur-2xl shadow-2xl p-5 sm:p-6 flex flex-col"
                                >
                                    
                                    {/* 1. PROJECT TITLE AT THE VERY TOP (NO DISTRICT TEXT) */}
                                    <div className="pb-3 border-b border-white/5">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0080ff]/20 border border-[#0080ff]/40 text-cyan-300 text-xs font-semibold">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                                <span>LIVE DEPLOYMENT</span>
                                            </div>
                                            <span className="text-xs font-mono text-slate-400 font-semibold">
                                                {String((activeIdx % count) + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                                            </span>
                                        </div>

                                        <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                                            {activeItem.title}
                                        </h3>
                                    </div>

                                    {/* 2. PROJECT IMAGE NEXT */}
                                    <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg h-44 sm:h-48 w-full bg-[#030610] mt-3.5 group">
                                        <img
                                            src={imageUrl(activeItem.image) || '/images/dsrzone-enterprise-platform-showcase.jpg'}
                                            alt={activeItem.title}
                                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                                    </div>

                                    {/* 3. PROJECT DESCRIPTION NEXT */}
                                    <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed mt-3.5">
                                        {activeItem.description}
                                    </p>

                                    {/* 4. KEY FEATURES NEXT */}
                                    <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 mt-4 pt-3.5 border-t border-white/5">
                                        {activeItem.features?.map((f, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <FeatureIcon type={f.icon} />
                                                <span className="text-xs text-slate-200 font-medium truncate">
                                                    {f.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 5. LIVE DEMO BUTTON AT BOTTOM & NAVIGATION CONTROLS */}
                                    <div className="flex items-center justify-between gap-3 mt-5 pt-3.5 border-t border-white/5">
                                        
                                        {/* Live Demo Button */}
                                        <a
                                            href={activeItem.project_url || '#portfolio'}
                                            target={activeItem.project_url && activeItem.project_url !== '#portfolio' ? '_blank' : '_self'}
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0080ff] to-[#00d0ff] hover:from-[#006fd6] hover:to-[#00b8e6] text-white font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(0,128,255,0.4)] transition-all group"
                                        >
                                            <span>Live Demo</span>
                                            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>

                                        {/* Navigation Controls (< , --- , >) */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={handlePrev}
                                                aria-label="Previous project"
                                                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30 text-white transition-all flex items-center justify-center"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>

                                            {/* Segmented cyan indicator */}
                                            <div className="flex items-center gap-1.5 px-1">
                                                {items.slice(0, 5).map((_, i) => (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={() => handleSelect(i)}
                                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                                            i === (activeIdx % count)
                                                                ? 'w-6 bg-[#00d0ff] shadow-[0_0_8px_#00d0ff]'
                                                                : 'w-2.5 bg-slate-700/60 hover:bg-slate-500'
                                                        }`}
                                                        aria-label={`Go to slide ${i + 1}`}
                                                    />
                                                ))}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={handleNext}
                                                aria-label="Next project"
                                                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30 text-white transition-all flex items-center justify-center"
                                            >
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>

                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </div>

            </div>
        </section>
    );
}
