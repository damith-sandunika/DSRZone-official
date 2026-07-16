import React, { useState, useEffect } from 'react';
import axios from '../config/axios';

const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#products', label: 'Products' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
];

function SocialIcon({ icon, className }) {
    if (icon === 'linkedin')
        return (
            <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
        );
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

function Footer() {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState('');
    const [contactDetails, setContactDetails] = useState({
        email: null,
        phone: null,
        linkedin_url: null,
        facebook_url: null,
        whatsapp: null,
    });

    useEffect(() => {
        axios.get('/api/v1/contact-details').then((res) => {
            setContactDetails({
                email: res.data.email || null,
                phone: res.data.phone || null,
                linkedin_url: res.data.linkedin_url || null,
                facebook_url: res.data.facebook_url || null,
                whatsapp: res.data.whatsapp || null,
            });
        }).catch(() => {});
    }, []);

    const whatsappHref = contactDetails.whatsapp
        ? (contactDetails.whatsapp.startsWith('http') ? contactDetails.whatsapp : `https://wa.me/${contactDetails.whatsapp.replace(/\D/g, '')}`)
        : null;

    const handleNewsletter = (e) => {
        e.preventDefault();
        if (!newsletterEmail.trim()) return;
        setNewsletterStatus('Thanks for subscribing!');
        setNewsletterEmail('');
    };

    return (
        <footer className="bg-[#0a0d10] border-t border-white/5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Column 1: Company */}
                    <div>
                        <a href="#home" className="text-lg font-bold gradient-text">DSRZone.com</a>
                        <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-xs">
                            Architects of the digital future, blending technology and creativity to build modern solutions.
                        </p>
                    </div>
                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="text-gray-500 hover:text-[#3b82f6] text-sm transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Column 3: Get in Touch (from admin contact details) */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Get in Touch</h4>
                        <ul className="space-y-3">
                            {contactDetails.email && (
                                <li>
                                    <a href={`mailto:${contactDetails.email}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#3b82f6] transition-colors">
                                        <svg className="w-4 h-4 shrink-0 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        {contactDetails.email}
                                    </a>
                                </li>
                            )}
                            {contactDetails.phone && (
                                <li>
                                    <a href={`tel:${contactDetails.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#3b82f6] transition-colors">
                                        <svg className="w-4 h-4 shrink-0 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        {contactDetails.phone}
                                    </a>
                                </li>
                            )}
                            {whatsappHref && (
                                <li>
                                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#3b82f6] transition-colors">
                                        <svg className="w-4 h-4 shrink-0 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                        WhatsApp
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                    {/* Column 4: Follow Us (LinkedIn, Facebook from admin) + Newsletter */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Follow Us</h4>
                        <div className="flex gap-3 mb-6">
                            {contactDetails.linkedin_url && (
                                <a
                                    href={contactDetails.linkedin_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/30 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <SocialIcon icon="linkedin" className="w-5 h-5" />
                                </a>
                            )}
                            {contactDetails.facebook_url && (
                                <a
                                    href={contactDetails.facebook_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#3b82f6] hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/30 transition-colors"
                                    aria-label="Facebook"
                                >
                                    <SocialIcon icon="facebook" className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 mb-3">Get the latest updates and news from us.</p>
                        <form onSubmit={handleNewsletter} className="flex gap-2">
                            <input
                                type="email"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="Your email address"
                                className="flex-1 min-w-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6]/30 focus:outline-none"
                            />
                            <button type="submit" className="shrink-0 rounded-lg bg-[#3b82f6] text-white font-semibold px-4 py-2.5 text-sm hover:bg-blue-400 transition-colors">
                                Subscribe
                            </button>
                        </form>
                        {newsletterStatus && <p className="mt-2 text-sm text-emerald-400">{newsletterStatus}</p>}
                    </div>
                </div>
            </div>
            <div className="border-t border-white/5">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center">
                    <p className="text-xs text-gray-600">
                        © {new Date().getFullYear()} DSRZone.com. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
