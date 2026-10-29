import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import ScrollReveal from './ScrollReveal';
import { imageUrl } from '../utils/imageUrl';

// Curated default vibrant accent palette matching the user's reference design
const DEFAULT_PALETTE = ['#0070f3', '#ff6b00', '#10b981', '#8b5cf6', '#06b6d4'];

// Rich fallback projects matching the reference image perfectly if API has no data
const FALLBACK_PROJECTS = [
    {
        id: 101,
        title: 'Laundry Zone',
        category: 'Laundry Services Management System',
        client: 'Rapid Laundromat',
        description: 'A complete management system for laundries to handle orders, customers, billing, inventory and delivery tracking with modern features.',
        image: '/images/dsrzone-showcase-backdrop.jpg',
        logo: '/images/dsrzone-laundry-system-icon.jpg',
        accent_color: '#0070f3',
        project_url: '#portfolio',
        technologies: ['Order Management', 'Billing & Payments', 'Inventory Control', 'WhatsApp Notifications', 'Reports & Analytics'],
    },
    {
        id: 102,
        title: 'Driving School',
        category: 'Driving School Management System',
        client: 'Sisira Driving Training School',
        description: 'Manage students, classes, instructors, payments, schedules, exams and more with a simple and powerful system.',
        image: '/images/dsrzone-enterprise-platform-showcase.jpg',
        logo: '/images/dsrzone-smartdrive-app-icon.jpg',
        accent_color: '#ff6b00',
        project_url: '#portfolio',
        technologies: ['Student Management', 'Slot Scheduling', 'Instructor Portals', 'Exam Booking', 'Billing System'],
    },
    {
        id: 103,
        title: 'Smarty Menu',
        category: 'Restaurant POS & Digital Menu',
        client: 'The Garden Restaurant',
        description: 'QR-based interactive digital menu system with real-time dish status, automated kitchen order routing, and live admin analytics.',
        image: '/images/dsrzone-products-banner.jpg',
        logo: null,
        accent_color: '#10b981',
        project_url: '#portfolio',
        technologies: ['QR Ordering', 'Kitchen Display', 'Live Analytics', 'POS Sync'],
    }
];

/* ─── Individual Project Card matching user reference design ────────────── */
function ProjectCard({ project, index }) {
    // Dynamic Accent Color (From DB field or auto-cycled from palette)
    const accentColor = project.accent_color && project.accent_color.startsWith('#')
        ? project.accent_color
        : DEFAULT_PALETTE[index % DEFAULT_PALETTE.length];

    const projectLogo = project.logo ? imageUrl(project.logo) : null;
    const projectImage = project.image ? imageUrl(project.image) : '/images/dsrzone-enterprise-platform-showcase.jpg';

    return (
        <ScrollReveal delay={index * 100}>
            <article className="group bg-white rounded-3xl lg:rounded-[36px] p-5 sm:p-7 lg:p-10 border border-slate-200/90 shadow-xl shadow-blue-500/5 hover:shadow-2xl hover:border-slate-300 transition-all duration-500 relative flex flex-col xl:flex-row items-center gap-6 sm:gap-8 lg:gap-10">
                
                {/* ════════════ LEFT / CONTENT SECTION ════════════ */}
                <div className="w-full xl:w-[54%] flex flex-col justify-between self-stretch">
                    
                    <div>
                        {/* 1. App Icon / Logo + Project Title & Category */}
                        <div className="flex items-center gap-3.5 sm:gap-5">
                            {/* App Icon Square */}
                            <div
                                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 overflow-hidden relative"
                                style={{
                                    backgroundColor: accentColor,
                                    boxShadow: `0 10px 25px -5px ${accentColor}50`
                                }}
                            >
                                {projectLogo ? (
                                    <img
                                        src={projectLogo}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
                                        {project.title?.charAt(0) || 'D'}
                                    </span>
                                )}
                            </div>

                            {/* Title & Category */}
                            <div className="min-w-0 flex-1">
                                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug truncate sm:whitespace-normal">
                                    {project.title}
                                </h3>
                                <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-0.5 truncate">
                                    {project.category || 'Digital Management System'}
                                </p>
                            </div>
                        </div>

                        {/* 2. Description */}
                        <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed mt-3.5 sm:mt-5 font-normal">
                            {project.description || project.solution || 'Custom enterprise software designed and deployed to streamline operations and accelerate business growth.'}
                        </p>

                        {/* 3. Key Features / Tech Stack Pills */}
                        {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-3.5 sm:mt-4 pt-3.5 border-t border-slate-100">
                                {project.technologies.slice(0, 5).map((tech, i) => (
                                    <span
                                        key={i}
                                        className="px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold bg-slate-50 border border-slate-200/80 text-slate-700"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 4. Client Info & Live Project Link (Unified Under Tech Stack & Client) */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 mt-5 sm:mt-6 pt-4 border-t border-slate-100">
                        {/* Client Name */}
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client:</span>
                            <span className="text-xs sm:text-sm font-extrabold text-slate-800 tracking-tight">
                                {project.client || 'Enterprise Partner'}
                            </span>
                        </div>

                        {/* Live Project CTA Button */}
                        {project.project_url && (
                            <a
                                href={project.project_url}
                                target={project.project_url !== '#portfolio' ? '_blank' : '_self'}
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl sm:rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-300 hover:opacity-90 hover:scale-[1.02] w-full sm:w-auto text-center shrink-0"
                                style={{
                                    backgroundColor: accentColor,
                                    boxShadow: `0 8px 18px -4px ${accentColor}60`
                                }}
                            >
                                <span>Live Project</span>
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        )}
                    </div>

                </div>

                {/* ════════════ RIGHT / IMAGE SECTION WITH STYLIZED ANGLED FRAME ════════════ */}
                <div className="w-full xl:w-[46%] flex items-center justify-center relative p-1 sm:p-2">
                    <div className="relative w-full max-w-[480px] group/frame">
                        
                        {/* Stylized Angled / Ribbon Frame Accent around the bottom-right corner */}
                        <div
                            className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 w-[72%] h-[72%] rounded-3xl pointer-events-none transition-transform duration-500 group-hover/frame:translate-x-1.5 group-hover/frame:translate-y-1.5"
                            style={{
                                background: `linear-gradient(135deg, transparent 35%, ${accentColor} 35%)`,
                                borderBottom: `4px solid ${accentColor}`,
                                borderRight: `4px solid ${accentColor}`,
                                borderRadius: '26px'
                            }}
                        />

                        {/* Laptop / Screen Mockup Frame */}
                        <div className="relative z-10 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border-2 border-white shadow-2xl">
                            <img
                                src={projectImage}
                                alt={project.title}
                                className="w-full h-48 sm:h-64 lg:h-72 object-cover object-top transition-transform duration-700 group-hover/frame:scale-105"
                            />
                        </div>

                    </div>
                </div>

            </article>
        </ScrollReveal>
    );
}

export default function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/v1/projects')
            .then((res) => {
                const apiData = Array.isArray(res.data) ? res.data : (res.data?.data || []);
                if (apiData.length > 0) {
                    setProjects(apiData);
                } else {
                    setProjects(FALLBACK_PROJECTS);
                }
            })
            .catch(() => setProjects(FALLBACK_PROJECTS))
            .finally(() => setLoading(false));
    }, []);

    const displayList = projects.length > 0 ? projects : FALLBACK_PROJECTS;

    return (
        <section
            id="portfolio"
            className="py-16 sm:py-24 lg:py-28 bg-[#f8fbff] text-slate-900 relative overflow-hidden border-t border-slate-200/60"
        >
            {/* ─── FLUID CYBER-WAVE BACKGROUND PATTERNS MATCHING REFERENCE ─── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                
                {/* Top-Left Soft Cyan Wave */}
                <div
                    className="absolute -top-24 -left-24 w-[450px] sm:w-[500px] h-[450px] sm:h-[500px] rounded-full opacity-35 sm:opacity-40 blur-[80px] sm:blur-[90px]"
                    style={{ background: 'radial-gradient(circle, #38bdf8 0%, rgba(56,189,248,0) 70%)' }}
                />

                {/* Bottom-Right Soft Blue Wave */}
                <div
                    className="absolute -bottom-28 -right-28 w-[500px] sm:w-[600px] h-[500px] sm:h-[600px] rounded-full opacity-30 sm:opacity-35 blur-[90px] sm:blur-[100px]"
                    style={{ background: 'radial-gradient(circle, #0070f3 0%, rgba(0,112,243,0) 70%)' }}
                />

                {/* Left Dot Matrix Pattern */}
                <div
                    className="absolute top-1/3 left-4 sm:left-12 w-24 sm:w-32 h-24 sm:h-32 opacity-20 sm:opacity-25"
                    style={{
                        backgroundImage: 'radial-gradient(#0070f3 1.5px, transparent 1.5px)',
                        backgroundSize: '16px 16px'
                    }}
                />

                {/* Right Dot Matrix Pattern */}
                <div
                    className="absolute bottom-1/4 right-4 sm:right-12 w-28 sm:w-36 h-28 sm:h-36 opacity-20 sm:opacity-25"
                    style={{
                        backgroundImage: 'radial-gradient(#0070f3 1.5px, transparent 1.5px)',
                        backgroundSize: '16px 16px'
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* ─── SECTION HEADING: PERFECTLY CENTERED ON MOBILE, LEFT-ALIGNED ON DESKTOP ─── */}
                <ScrollReveal>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-6">
                        
                        {/* Title Section - Perfectly Centered on Mobile, Left-Aligned on Desktop */}
                        <div className="w-full max-w-2xl flex flex-col items-center md:items-start text-center md:text-left mx-auto md:mx-0">
                            
                            {/* Centered Top Tag on Mobile with dual divider lines */}
                            <div className="inline-flex items-center justify-center md:justify-start gap-2.5 mb-3">
                                <span className="w-6 h-[2px] bg-blue-600 rounded-full" />
                                <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-blue-600 font-mono">
                                    OUR PROJECTS
                                </span>
                                <span className="w-6 h-[2px] bg-blue-600 rounded-full md:hidden" />
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] text-center md:text-left">
                                Real Projects <br className="hidden sm:inline" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500">
                                    Real Growth
                                </span>
                            </h2>

                            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-slate-600 font-normal leading-relaxed text-center md:text-left max-w-xl mx-auto md:mx-0">
                                We build digital solutions that help businesses operate better and grow faster.
                            </p>
                        </div>

                        {/* Top-Right Callout Script & Arrows (Desktop only) */}
                        <div className="hidden md:flex flex-col items-end shrink-0">
                            <div className="flex items-center gap-2.5 mb-2">
                                <a
                                    href="#portfolio"
                                    className="w-10 h-10 rounded-full border border-blue-200 bg-white shadow-sm flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                                    aria-label="Previous"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                                </a>
                                <a
                                    href="#portfolio"
                                    className="w-10 h-10 rounded-full border border-blue-200 bg-white shadow-sm flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                                    aria-label="Next"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                                </a>
                            </div>

                            {/* Handwritten Style Annotation */}
                            <div className="text-right">
                                <span className="font-serif italic text-base sm:text-lg font-bold text-blue-600 block leading-tight rotate-[-3deg]">
                                    Turning Ideas into Real Solutions
                                </span>
                                <svg className="w-6 h-6 text-blue-500 ml-auto mt-0.5 transform rotate-[-25deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </div>
                        </div>

                    </div>
                </ScrollReveal>

                {/* ─── STACKED PROJECT CARDS (YATA YATA) ─── */}
                {loading ? (
                    <div className="flex flex-col gap-6 sm:gap-10">
                        {[1, 2].map((i) => (
                            <div key={i} className="rounded-3xl bg-white border border-slate-200 h-64 sm:h-72 animate-pulse shadow-md" />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 sm:gap-10">
                        {displayList.map((project, idx) => (
                            <ProjectCard
                                key={project.id || idx}
                                project={project}
                                index={idx}
                            />
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}
