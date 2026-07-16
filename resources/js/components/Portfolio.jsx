import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import ScrollReveal from './ScrollReveal';
import { imageUrl } from '../utils/imageUrl';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Fallback demo projects (admin panel eke data nathnam meka penenawa) ─── */
const fallbackProjects = [
    {
        id: 1,
        title: 'Smarty Menu — Digital Menu System',
        category: 'Restaurant Tech',
        client: 'The Garden Restaurant, Colombo',
        problem: 'Customers waited too long to order; physical menus went missing and re-printing was costly.',
        solution: 'We deployed a QR-based digital menu with real-time item updates, order tracking and a live kitchen dashboard. Order wait-time dropped by 40%.',
        images: [],
        project_url: null,
        technologies: ['React', 'Laravel', 'MySQL', 'QR'],
    },
    {
        id: 2,
        title: 'Inventory Pro — Stock Management',
        category: 'Business Operations',
        client: 'Lanka Pharma Distributors',
        problem: 'Stock discrepancies caused daily losses; managers had no visibility into real-time inventory levels.',
        solution: 'Built a real-time inventory dashboard with barcode scanning, expiry alerts and multi-branch syncing. Losses reduced by 60%.',
        images: [],
        project_url: null,
        technologies: ['Vue', 'Node.js', 'PostgreSQL'],
    },
    {
        id: 3,
        title: 'EduPulse — Learning Management',
        category: 'EdTech',
        client: 'Institute of Technology, Kandy',
        problem: 'No centralised platform for course materials, attendance, and student progress tracking.',
        solution: 'Developed a full LMS with video lessons, quizzes, certificates and attendance reports — accessible on any device.',
        images: [],
        project_url: null,
        technologies: ['React', 'Laravel', 'AWS S3'],
    },
];

/* ─── Image carousel ─────────────────────────────────────────────────────── */
function ImageCarousel({ images, title }) {
    const [idx, setIdx] = useState(0);
    const hasImages = images && images.length > 0;

    return (
        <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-[#0d1628] rounded-t-2xl flex-shrink-0">
            {hasImages ? (
                <>
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={idx}
                            src={imageUrl(images[idx])}
                            alt={`${title} screenshot ${idx + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                    </AnimatePresence>
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                                onClick={() => setIdx((i) => (i + 1) % images.length)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setIdx(i)}
                                        className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? 'bg-blue-400' : 'bg-white/30'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </>
            ) : (
                /* Placeholder */
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-[#0a0c12]">
                    <svg className="w-16 h-16 text-blue-500/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
            )}
        </div>
    );
}

/* ─── Project card ───────────────────────────────────────────────────────── */
function ProjectCard({ project, index }) {
    const [expanded, setExpanded] = useState(false);
    const imgs = Array.isArray(project.images) ? project.images
        : project.image ? [project.image] : [];

    return (
        <ScrollReveal delay={index * 100}>
            <article className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#0c1221] border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/20">

                {/* Top accent line */}
                <div className="h-0.5 bg-gradient-to-r from-blue-600 via-blue-400 to-transparent" />

                {/* Image carousel */}
                <ImageCarousel images={imgs} title={project.title} />

                {/* Category pill */}
                <span className="absolute top-8 left-4 px-3 py-1 rounded-full bg-blue-600/80 backdrop-blur-sm text-white text-xs font-semibold z-10">
                    {project.category || 'Project'}
                </span>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 gap-4">
                    <h3 className="text-lg font-bold text-white leading-snug">{project.title}</h3>

                    {project.client && (
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                            <svg className="w-3.5 h-3.5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {project.client}
                        </div>
                    )}

                    {/* Problem / Solution */}
                    <div className="flex flex-col gap-3">
                        {/* Problem */}
                        <div className="rounded-xl bg-red-950/20 border border-red-500/10 p-3.5">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                                    <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <p className="text-xs font-semibold uppercase tracking-wider text-red-400">Problem</p>
                            </div>
                            <p className={`text-gray-400 text-sm leading-relaxed ${!expanded ? 'line-clamp-2' : ''}`}>
                                {project.problem || project.description || 'Client faced operational challenges that slowed down daily workflows.'}
                            </p>
                        </div>

                        {/* Solution */}
                        <div className="rounded-xl bg-blue-950/20 border border-blue-500/10 p-3.5">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </span>
                                <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">Our Solution</p>
                            </div>
                            <p className={`text-gray-300 text-sm leading-relaxed ${!expanded ? 'line-clamp-2' : ''}`}>
                                {project.solution || 'We delivered a custom digital system tailored to their specific needs.'}
                            </p>
                        </div>
                    </div>

                    {expanded && Array.isArray(project.technologies) && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((t, i) => (
                                <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-gray-400 text-xs">{t}</span>
                            ))}
                        </div>
                    )}

                    {/* Footer row */}
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                        >
                            {expanded ? 'Show less' : 'Read more'}
                            <svg className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {project.project_url && (
                            <a
                                href={project.project_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-medium text-slate-500 hover:text-white transition-colors flex items-center gap-1"
                            >
                                Visit site
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                        )}
                    </div>
                </div>
            </article>
        </ScrollReveal>
    );
}

/* ─── Main Portfolio component ───────────────────────────────────────────── */
const INITIAL_COUNT = 6;

function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        axios.get('/api/v1/projects')
            .then((res) => setProjects(res.data))
            .catch(() => setProjects(fallbackProjects))
            .finally(() => setLoading(false));
    }, []);

    const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);
    const hasMore = projects.length > INITIAL_COUNT && !showAll;

    return (
        <section id="portfolio" className="py-24 bg-[#080c18] border-t border-white/5 relative overflow-hidden">
            <div className="section-grid-pattern" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Heading */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <p className="section-label">Our Work</p>
                        <h2 className="section-title mt-2">
                            <span className="section-title-accent">Portfolio</span>
                        </h2>
                        <div className="section-divider" />
                        <p className="section-desc mt-6">
                            Real problems. Real solutions. See how we've transformed businesses across Sri Lanka.
                        </p>
                    </div>
                </ScrollReveal>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1,2,3].map(i => (
                            <div key={i} className="rounded-2xl bg-[#0c1221] border border-white/5 h-96 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {visible.map((project, i) => (
                                <ProjectCard key={project.id} project={project} index={i} />
                            ))}
                        </div>

                        {hasMore && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={() => setShowAll(true)}
                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 font-semibold px-7 py-3 hover:bg-blue-600/30 hover:border-blue-400 transition-all"
                                >
                                    Show more projects
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

export default Portfolio;
