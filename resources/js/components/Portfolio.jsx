import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import ScrollReveal from './ScrollReveal';
import { imageUrl } from '../utils/imageUrl';

const fallbackProjects = [
    { id: 1, title: 'E-Commerce Platform', description: 'Modern e-commerce solution with advanced features', category: 'Web Development', image: null, project_url: null, client: null, project_date: null, technologies: [] },
    { id: 2, title: 'Mobile Banking App', description: 'Secure mobile banking application', category: 'Mobile Development', image: null, project_url: null, client: null, project_date: null, technologies: [] },
];

function ProjectModal({ project, onClose }) {
    if (!project) return null;
    const imgUrl = project.image || '';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto scrollbar-hide rounded-2xl border border-white/10 bg-[#0f1116] shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <button type="button" onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors" aria-label="Close">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                {imgUrl && (
                    <div className="aspect-video w-full overflow-hidden rounded-t-2xl bg-white/5">
                        <img src={imageUrl(imgUrl)} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                )}
                <div className="p-6">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-semibold mb-3">
                        {project.category || 'Project'}
                    </span>
                    <h2 id="project-modal-title" className="text-2xl font-bold text-white mb-2">{project.title}</h2>
                    {project.description && <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description}</p>}
                    <dl className="grid gap-2 text-sm">
                        {project.client && (
                            <>
                                <dt className="text-gray-500">Client</dt>
                                <dd className="text-gray-300">{project.client}</dd>
                            </>
                        )}
                        {project.project_date && (
                            <>
                                <dt className="text-gray-500">Date</dt>
                                <dd className="text-gray-300">{project.project_date}</dd>
                            </>
                        )}
                    </dl>
                    {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                        <div className="mt-4">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Technologies</p>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((t, i) => (
                                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-gray-400 text-xs">{t}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    {project.project_url && (
                        <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#f59e0b] text-black font-semibold px-5 py-2.5 hover:bg-amber-400 transition-colors"
                        >
                            Visit site
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

const INITIAL_COUNT = 6;

function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        axios.get('/api/v1/projects').then((res) => setProjects(res.data)).catch(() => setProjects(fallbackProjects)).finally(() => setLoading(false));
    }, []);

    const visibleProjects = showAll ? projects : projects.slice(0, INITIAL_COUNT);
    const hasMore = projects.length > INITIAL_COUNT && !showAll;

    return (
        <section id="portfolio" className="py-24 bg-[#0f1220] border-t border-white/5 relative overflow-hidden">
            <div className="section-grid-pattern" aria-hidden />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <p className="section-label">Our Work</p>
                        <h2 className="section-title mt-2">
                            <span className="section-title-accent">Portfolio</span>
                        </h2>
                        <div className="section-divider" />
                        <p className="section-desc mt-6">
                            Recent projects and successful implementations
                        </p>
                    </div>
                </ScrollReveal>

                {loading ? (
                    <div className="text-center text-gray-500 py-12">Loading projects...</div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {visibleProjects.map((project) => (
                                <article
                                    key={project.id}
                                    className="card-hover group rounded-xl overflow-hidden bg-[#0a0c12] border border-white/5 hover:border-[#f59e0b]/30"
                                >
                                    <div className="relative h-52 overflow-hidden">
                                        {project.image ? (
                                            <img src={imageUrl(project.image)} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#f59e0b]/15 to-[#d97706]/10 flex items-center justify-center">
                                                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-3xl">🚀</div>
                                            </div>
                                        )}
                                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/50 text-[#f59e0b] text-xs font-semibold backdrop-blur-sm">
                                            {project.category || 'Project'}
                                        </span>
                                    </div>
                                    <div className="p-6 bg-[#0a0c12]/95">
                                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedProject(project)}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-[#f59e0b] hover:text-[#fcd34d] transition-colors"
                                        >
                                            View Project
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                        {hasMore && (
                            <div className="text-center mt-10">
                                <button
                                    type="button"
                                    onClick={() => setShowAll(true)}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#f59e0b]/20 border border-[#f59e0b]/40 text-[#f59e0b] font-semibold px-6 py-3 hover:bg-[#f59e0b]/30 transition-colors"
                                >
                                    Show more
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </section>
    );
}

export default Portfolio;
