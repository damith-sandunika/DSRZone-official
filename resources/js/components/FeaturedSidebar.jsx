import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { imageUrl } from '../utils/imageUrl';

function FeaturedSidebar() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/v1/projects/featured')
            .then((res) => setProjects((res.data || []).slice(0, 3)))
            .catch(() => setProjects([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading || projects.length === 0) return null;

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Featured projects</h3>
                <p className="text-sm text-gray-400 mt-0.5">From our portfolio</p>
            </div>
            <ul className="divide-y divide-white/5">
                {projects.map((p) => (
                    <li key={p.id}>
                        <a
                            href="#portfolio"
                            className="flex gap-3 p-4 hover:bg-white/5 transition-colors group"
                        >
                            <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-white/5">
                                {p.image ? (
                                    <img src={imageUrl(p.image)} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl">🚀</div>
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-medium text-white truncate">{p.title}</p>
                                {p.category && <p className="text-xs text-gray-500">{p.category}</p>}
                            </div>
                            <svg className="w-4 h-4 text-gray-500 shrink-0 group-hover:text-[#f59e0b] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeaturedSidebar;
