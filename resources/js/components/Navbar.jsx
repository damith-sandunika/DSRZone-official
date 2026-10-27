import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
            const sections = ['home', 'about', 'products', 'services', 'portfolio', 'process', 'contact'];
            const scrollPos = window.scrollY + 200;
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPos >= top && scrollPos < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Home', href: '#home', id: 'home' },
        { label: 'About', href: '#about', id: 'about' },
        { label: 'Products', href: '#products', id: 'products' },
        { label: 'Services', href: '#services', id: 'services' },
        { label: 'Our Work', href: '#portfolio', id: 'portfolio' },
        { label: 'Contact', href: '#contact', id: 'contact' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isMobileMenuOpen 
                ? 'bg-[#030712]/95 backdrop-blur-xl border-b border-white/10 py-3' 
                : isScrolled
                    ? 'bg-black/30 backdrop-blur-md border-b border-white/5 py-3.5'
                    : 'bg-transparent border-transparent py-5 sm:py-6'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Brand Logo */}
                <a href="#home" className="flex items-center gap-3 group">
                    <img
                        src="/images/DSRZone logo.png"
                        alt="DSRZone - Born to Innovate"
                        className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                    />
                </a>

                {/* Desktop Nav Links */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id;
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                className={`text-sm font-medium transition-all relative py-1 ${
                                    isActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                                }`}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.span
                                        layoutId="navActiveLine"
                                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                                    />
                                )}
                            </a>
                        );
                    })}
                </nav>

                {/* Desktop Right CTA Button */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#1062FE] hover:bg-[#0052E0] text-white font-semibold text-sm shadow-[0_0_20px_rgba(16,98,254,0.4)] hover:shadow-[0_0_30px_rgba(16,98,254,0.65)] hover:-translate-y-0.5 transition-all"
                    >
                        <span>Let's Talk</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10"
                    aria-label="Toggle navigation menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Drawer Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-white/10 bg-[#030712]/98 backdrop-blur-2xl px-6 py-5 overflow-hidden"
                    >
                        <div className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`py-2 text-base font-semibold transition-colors ${
                                        activeSection === link.id ? 'text-[#38bdf8]' : 'text-slate-300 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mt-2 text-center py-3 rounded-full bg-[#1062FE] text-white font-bold text-sm shadow-[0_0_20px_rgba(16,98,254,0.4)]"
                            >
                                Let's Talk &rarr;
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Navbar;
