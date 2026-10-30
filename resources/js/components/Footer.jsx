import React, { useState, useEffect } from 'react';
import axios from '../config/axios';

const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#products', label: 'Products' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
];

function Footer() {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState('');
    const [contactDetails, setContactDetails] = useState({
        email: 'sldigitalsystem@gmail.com',
        phone: '+94 76 699 4965',
        location: 'Colombo, Sri Lanka',
        linkedin_url: null,
        facebook_url: null,
        instagram_url: null,
        youtube_url: null,
        whatsapp: '+94766994965',
    });

    useEffect(() => {
        axios.get('/api/v1/contact-details').then((res) => {
            if (res.data) {
                setContactDetails((prev) => ({
                    ...prev,
                    email: res.data.email || prev.email,
                    phone: res.data.phone || prev.phone,
                    location: res.data.location || prev.location,
                    linkedin_url: res.data.linkedin_url || prev.linkedin_url,
                    facebook_url: res.data.facebook_url || prev.facebook_url,
                    instagram_url: res.data.instagram_url || prev.instagram_url,
                    youtube_url: res.data.youtube_url || prev.youtube_url,
                    whatsapp: res.data.whatsapp || prev.whatsapp,
                }));
            }
        }).catch(() => { });
    }, []);

    const whatsappHref = contactDetails.whatsapp
        ? (contactDetails.whatsapp.startsWith('http')
            ? contactDetails.whatsapp
            : `https://wa.me/${contactDetails.whatsapp.replace(/\D/g, '')}`)
        : null;

    const handleNewsletter = (e) => {
        e.preventDefault();
        if (!newsletterEmail.trim()) return;
        setNewsletterStatus('Thank you for subscribing to DSRZone!');
        setNewsletterEmail('');
        setTimeout(() => setNewsletterStatus(''), 4500);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[#050811] text-white overflow-hidden border-t border-slate-800/80">
            {/* Top Luminous Cyber Divider Line with ambient glow */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-blue-500/10 blur-xl pointer-events-none" />

            {/* Ambient Background Glow Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                    {/* Column 1: Brand & Status (4 cols) */}
                    <div className="lg:col-span-4 space-y-5">
                        <a href="#home" className="inline-block group">
                            <img
                                src="/images/dsrzone-official-logo.png"
                                alt="DSRZone – Enterprise Software Solutions Sri Lanka"
                                title="DSRZone – Architects of the Digital Future"
                                className="h-11 sm:h-12 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(59,130,246,0.3)] group-hover:scale-105 transition-transform"
                            />
                        </a>

                        <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-normal">
                            Architects of the digital future, blending cutting-edge technology and human creativity to engineer scalable enterprise systems.
                        </p>

                        {/* Live Status Indicator Pill */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span>Available for New Projects</span>
                        </div>
                    </div>

                    {/* Column 2: Quick Links (2 cols) */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2.5 h-[2px] bg-blue-500 rounded-full" />
                            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400 font-mono">
                                Navigation
                            </h4>
                        </div>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="group inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
                                    >
                                        <svg
                                            className="w-3.5 h-3.5 text-blue-500/50 group-hover:text-blue-400 group-hover:translate-x-1 transition-all"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                        </svg>
                                        <span>{link.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Get in Touch (3 cols) */}
                    <div className="lg:col-span-3">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-2.5 h-[2px] bg-blue-500 rounded-full" />
                            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400 font-mono">
                                Get In Touch
                            </h4>
                        </div>
                        <ul className="space-y-3">
                            {contactDetails.email && (
                                <li>
                                    <a
                                        href={`mailto:${contactDetails.email}`}
                                        className="group flex items-start gap-3 text-xs sm:text-sm text-slate-300 hover:text-blue-400 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-105 group-hover:bg-blue-600/25 transition-all">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="truncate pt-1">{contactDetails.email}</span>
                                    </a>
                                </li>
                            )}

                            {contactDetails.phone && (
                                <li>
                                    <a
                                        href={`tel:${contactDetails.phone.replace(/\D/g, '')}`}
                                        className="group flex items-start gap-3 text-xs sm:text-sm text-slate-300 hover:text-blue-400 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-105 group-hover:bg-blue-600/25 transition-all">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <span className="font-mono pt-1">{contactDetails.phone}</span>
                                    </a>
                                </li>
                            )}

                            {contactDetails.location && (
                                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-400">
                                    <div className="w-8 h-8 rounded-lg bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <span className="pt-1">{contactDetails.location}</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & Social Badges (3 cols) */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2.5 h-[2px] bg-blue-500 rounded-full" />
                            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400 font-mono">
                                Follow Us
                            </h4>
                        </div>

                        {/* Social Badges Row */}
                        <div className="flex flex-wrap items-center gap-2">
                            {contactDetails.facebook_url && (
                                <a
                                    href={contactDetails.facebook_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="w-9 h-9 rounded-xl bg-[#1877f2]/15 hover:bg-[#1877f2] text-[#1877f2] hover:text-white border border-[#1877f2]/30 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                            )}

                            {contactDetails.linkedin_url && (
                                <a
                                    href={contactDetails.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="w-9 h-9 rounded-xl bg-[#0077b5]/15 hover:bg-[#0077b5] text-[#0077b5] hover:text-white border border-[#0077b5]/30 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            )}

                            {contactDetails.instagram_url && (
                                <a
                                    href={contactDetails.instagram_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="w-9 h-9 rounded-xl bg-pink-600/15 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 text-pink-400 hover:text-white border border-pink-500/30 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                            )}

                            {contactDetails.youtube_url && (
                                <a
                                    href={contactDetails.youtube_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="YouTube"
                                    className="w-9 h-9 rounded-xl bg-red-600/15 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </a>
                            )}

                            {whatsappHref && (
                                <a
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                    className="w-9 h-9 rounded-xl bg-emerald-600/15 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                                    </svg>
                                </a>
                            )}
                        </div>

                        {/* Newsletter Subscribe Box */}
                        <div className="pt-2">
                            <p className="text-xs text-slate-400 mb-2 font-medium">Get the latest technology insights & news:</p>
                            <form onSubmit={handleNewsletter} className="relative flex items-center">
                                <input
                                    type="email"
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-blue-500 pl-3.5 pr-24 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition-all shadow-inner"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-102 cursor-pointer"
                                >
                                    Subscribe
                                </button>
                            </form>
                            {newsletterStatus && (
                                <p className="mt-2 text-xs text-emerald-400 font-medium animate-fade-in">
                                    {newsletterStatus}
                                </p>
                            )}
                        </div>
                    </div>

                </div>

                {/* Bottom Bar: Copyright & Back To Top */}
                <div className="mt-14 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p className="text-center sm:text-left">
                        © {new Date().getFullYear()} <span className="text-slate-300 font-semibold">DSRZone.com</span>. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <a href="#about" className="hover:text-blue-400 transition-colors">Privacy</a>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <a href="#about" className="hover:text-blue-400 transition-colors">Terms</a>
                        <span className="w-1 h-1 rounded-full bg-slate-700" />
                        <button
                            onClick={scrollToTop}
                            className="inline-flex items-center gap-1.5 hover:text-blue-400 transition-colors cursor-pointer group"
                        >
                            <span>Back to top</span>
                            <svg className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;
