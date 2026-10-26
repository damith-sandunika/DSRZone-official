import React, { useState, useEffect } from 'react';
import axios from '../config/axios';
import { motion } from 'framer-motion';

export default function Contact() {
    const [contact, setContact] = useState({
        phone: '+94 77 000 0000',
        email: 'hello@dsrzone.com',
        location: 'Colombo, Sri Lanka',
        working_hours: 'Mon - Fri | 9.00 AM - 6.00 PM',
        facebook_url: 'https://facebook.com/dsrzone',
        linkedin_url: 'https://linkedin.com/company/dsrzone',
        instagram_url: 'https://instagram.com/dsrzone',
        youtube_url: 'https://youtube.com/@dsrzone',
        whatsapp: '+94770000000'
    });

    const [servicesList, setServicesList] = useState([
        'Web Development',
        'Mobile Applications',
        'Web Systems',
        'Social Media Marketing',
        'Custom Software Solutions'
    ]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        website_hp: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    // Fetch contact details configured in /admin/contact
    useEffect(() => {
        axios.get('/api/v1/contact-details')
            .then((res) => {
                if (res.data) {
                    setContact((prev) => ({
                        ...prev,
                        ...res.data,
                        phone: res.data.phone || prev.phone,
                        email: res.data.email || prev.email,
                        location: res.data.location || prev.location,
                        working_hours: res.data.working_hours || prev.working_hours,
                        facebook_url: res.data.facebook_url || prev.facebook_url,
                        linkedin_url: res.data.linkedin_url || prev.linkedin_url,
                        instagram_url: res.data.instagram_url || prev.instagram_url,
                        youtube_url: res.data.youtube_url || prev.youtube_url,
                    }));
                }
            })
            .catch(() => {});

        // Fetch services to populate dropdown
        axios.get('/api/v1/services')
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setServicesList(res.data.map((s) => s.title));
                }
            })
            .catch(() => {});
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });
        try {
            const response = await axios.post('/api/v1/contact', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone || '',
                subject: formData.subject || 'General Inquiry',
                message: formData.message,
                website_hp: formData.website_hp
            });
            setStatus({
                type: 'success',
                message: response.data.message || 'Thank you! Your message has been sent successfully. Our team will contact you soon.'
            });
            setFormData({ name: '', email: '', subject: '', message: '', website_hp: '' });
        } catch (error) {
            if (error.response?.data?.errors) {
                setStatus({ type: 'error', message: Object.values(error.response.data.errors).flat().join(', ') });
            } else {
                setStatus({ type: 'error', message: 'Something went wrong. Please try again later or reach us on WhatsApp.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="relative py-24 lg:py-32 overflow-hidden bg-[#070b14] text-white">

            {/* ── NIGHT ARCHITECTURAL & NETWORK MESH BACKGROUND ───────── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Night Sky Glow & Building Light Reflections */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/10 via-blue-900/15 to-transparent rounded-full blur-3xl" />

                {/* Digital Global Network Nodes & Connection Arcs */}
                <div className="absolute top-1/3 left-1/3 w-[650px] h-[650px] -translate-x-1/2 -translate-y-1/2 opacity-25">
                    <svg viewBox="0 0 600 600" className="w-full h-full text-blue-500 animate-spin-slow" fill="none">
                        <circle cx="300" cy="300" r="240" stroke="currentColor" strokeWidth="1" strokeDasharray="6 6" />
                        <circle cx="300" cy="300" r="180" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                        <circle cx="300" cy="300" r="120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" />
                        <path d="M120 300 Q 300 120 480 300" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.6" />
                        <path d="M120 300 Q 300 480 480 300" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.6" />
                        <circle cx="210" cy="210" r="4" fill="#38bdf8" />
                        <circle cx="390" cy="210" r="4" fill="#38bdf8" />
                        <circle cx="300" cy="180" r="5" fill="#60a5fa" />
                        <circle cx="350" cy="380" r="4" fill="#818cf8" />
                    </svg>
                </div>

                {/* Wet Floor Specular Reflection at Bottom */}
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#050811] via-[#070b14]/80 to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* ── LEFT COLUMN: CONTACT DETAILS & SOCIALS (6 COLS) ─ */}
                    <div className="lg:col-span-6">

                        {/* Top Header */}
                        <div className="mb-10">
                            <div className="flex items-center gap-2.5 mb-3">
                                <span className="w-6 h-[2px] bg-blue-500 rounded-full" />
                                <span className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-blue-400 font-mono">
                                    CONTACT US
                                </span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15]">
                                Let's Build <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">
                                    Something Great
                                </span>
                            </h2>

                            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-lg">
                                Have a project in mind? We'd love to hear from you. Let's discuss how DSRZone can help you turn your ideas into powerful digital solutions.
                            </p>
                        </div>

                        {/* 4 Glowing Glass Contact Info Cards */}
                        <div className="space-y-4 mb-10 max-w-md">

                            {/* Call Us */}
                            <a
                                href={`tel:${contact.phone?.replace(/[^0-9+]/g, '')}`}
                                className="group flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-blue-500/50 backdrop-blur-md transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] shrink-0 group-hover:scale-105 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Call Us</p>
                                    <p className="text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors font-mono">
                                        {contact.phone || '+94 77 000 0000'}
                                    </p>
                                </div>
                            </a>

                            {/* Email Us */}
                            <a
                                href={`mailto:${contact.email}`}
                                className="group flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-blue-500/50 backdrop-blur-md transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] shrink-0 group-hover:scale-105 transition-transform">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Email Us</p>
                                    <p className="text-sm sm:text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                                        {contact.email || 'hello@dsrzone.com'}
                                    </p>
                                </div>
                            </a>

                            {/* Our Location */}
                            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Our Location</p>
                                    <p className="text-sm sm:text-base font-bold text-white">
                                        {contact.location || 'Colombo, Sri Lanka'}
                                    </p>
                                </div>
                            </div>

                            {/* Working Hours */}
                            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] shrink-0">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Working Hours</p>
                                    <p className="text-sm sm:text-base font-bold text-white">
                                        {contact.working_hours || 'Mon - Fri | 9.00 AM - 6.00 PM'}
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Social Links Row (Configured from Admin Panel) */}
                        <div className="flex items-center gap-3">
                            {/* Facebook */}
                            {contact.facebook_url && (
                                <a
                                    href={contact.facebook_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                            )}

                            {/* LinkedIn */}
                            {contact.linkedin_url && (
                                <a
                                    href={contact.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="w-10 h-10 rounded-full bg-[#0077b5] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            )}

                            {/* Instagram */}
                            {contact.instagram_url && (
                                <a
                                    href={contact.instagram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                            )}

                            {/* YouTube */}
                            {contact.youtube_url && (
                                <a
                                    href={contact.youtube_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="YouTube"
                                    className="w-10 h-10 rounded-full bg-[#ff0000] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                            )}

                            {/* WhatsApp Direct Chat */}
                            {contact.whatsapp && (
                                <a
                                    href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    className="w-10 h-10 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                                    </svg>
                                </a>
                            )}
                        </div>

                    </div>

                    {/* ── RIGHT COLUMN: 3D HOLOGRAPHIC GLOWING GLASS FORM CARD (6 COLS) ─ */}
                    <div className="lg:col-span-6 relative">

                        {/* Neon perimeter glow aura */}
                        <div className="absolute -inset-1 rounded-[2.8rem] bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 opacity-60 blur-xl pointer-events-none" />

                        {/* Glass Card Container */}
                        <div className="relative rounded-[2.5rem] bg-[#0c1322]/85 backdrop-blur-2xl border border-blue-500/40 p-8 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">

                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-5 h-[2px] bg-blue-400 rounded-full" />
                                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-blue-400 font-mono">
                                        SEND US A MESSAGE
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                    Get In Touch
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                                    Fill out the form and our team will get back to you as soon as possible.
                                </p>
                            </div>

                            {/* Status Notification */}
                            {status.message && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mb-6 p-4 rounded-xl text-xs sm:text-sm font-medium ${
                                        status.type === 'success'
                                            ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                                            : 'bg-red-500/20 border border-red-500/40 text-red-300'
                                    }`}
                                >
                                    {status.message}
                                </motion.div>
                            )}

                            {/* Inquiry Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Honeypot bot trap */}
                                <input
                                    type="text"
                                    name="website_hp"
                                    value={formData.website_hp}
                                    onChange={handleChange}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
                                    aria-hidden="true"
                                />

                                {/* Name Field */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Name"
                                        className="w-full rounded-2xl bg-slate-900/80 border border-slate-700/80 focus:border-blue-500 pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-400 outline-none transition-all"
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Email"
                                        className="w-full rounded-2xl bg-slate-900/80 border border-slate-700/80 focus:border-blue-500 pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-400 outline-none transition-all"
                                    />
                                </div>

                                {/* Select Service Dropdown */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                        </svg>
                                    </div>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full rounded-2xl bg-slate-900/80 border border-slate-700/80 focus:border-blue-500 pl-12 pr-10 py-3.5 text-sm text-white outline-none appearance-none cursor-pointer transition-all"
                                    >
                                        <option value="" className="bg-slate-900 text-slate-400">Select Service</option>
                                        {servicesList.map((svc, sIdx) => (
                                            <option key={sIdx} value={svc} className="bg-slate-900 text-white">
                                                {svc}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Message Field */}
                                <div className="relative">
                                    <div className="absolute top-3.5 left-4 pointer-events-none text-slate-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Message"
                                        className="w-full rounded-2xl bg-slate-900/80 border border-slate-700/80 focus:border-blue-500 pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-400 outline-none transition-all resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-sm tracking-wide shadow-[0_0_25px_rgba(37,99,235,0.6)] hover:shadow-[0_0_35px_rgba(56,189,248,0.8)] transition-all duration-300 disabled:opacity-60 cursor-pointer group"
                                >
                                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>
                            </form>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
