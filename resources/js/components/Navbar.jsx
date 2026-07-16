import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 24);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinkClass = "text-gray-300 hover:text-white text-sm font-medium pb-1 transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#3b82f6] after:transition-all after:duration-200 hover:after:w-full";

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled || isMobileMenuOpen ? 'bg-[#030610]/95 backdrop-blur-2xl border-b border-blue-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent shadow-[0_2px_12px_rgba(0,0,0,0.08)]'
        }`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24 lg:h-32">
                    {/* Mobile Hamburger Menu (Left) */}
                    <button
                        type="button"
                        className="md:hidden p-2 -ml-2 text-gray-300 bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-lg hover:bg-[#3b82f6]/20 transition-all"
                        onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setIsSocialOpen(false); }}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    {/* Logo (Center on mobile, Left on desktop) */}
                    <a href="#home" className="flex items-center justify-center h-full">
                        <img
                            src="/images/DSRZone logo.png"
                            alt="DSRZone.com"
                            className="h-10 lg:h-14 w-auto object-contain block"
                            fetchPriority="high"
                        />
                    </a>

                    {/* Mobile Right Action (Social Dropdown) */}
                    <div className="relative md:hidden">
                        <button
                            type="button"
                            className="p-2 -mr-2 text-blue-400 bg-[#3b82f6]/5 border border-[#3b82f6]/10 rounded-lg hover:bg-[#3b82f6]/10 transition-all"
                            onClick={() => { setIsSocialOpen(!isSocialOpen); setIsMobileMenuOpen(false); }}
                            aria-label="Social Media"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>

                        <AnimatePresence>
                            {isSocialOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-3 w-12 bg-[#0a0c12]/95 backdrop-blur-xl border border-[#3b82f6]/20 rounded-xl shadow-2xl overflow-hidden flex flex-col items-center py-3 gap-4"
                                >
                                    {[
                                        { name: 'fb', icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /> },
                                        { name: 'in', icon: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></> },
                                        { name: 'ig', icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" /></> },
                                        { name: 'tt', icon: <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5v3a3 3 0 01-3-3v8a7 7 0 11-7-7v3a4 4 0 004 4" /> }
                                    ].map((s, i) => (
                                        <motion.a
                                            key={s.name}
                                            href="#"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                            className="text-gray-400 hover:text-[#3b82f6] transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                                {s.icon}
                                            </svg>
                                        </motion.a>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#home" className={navLinkClass}>Home</a>
                        <a href="#about" className={navLinkClass}>About</a>
                        <a href="#services" className={navLinkClass}>Services</a>
                        <a href="#products" className={navLinkClass}>Products</a>
                        <a href="#clients-map" className={navLinkClass}>Clients</a>
                        <a href="#portfolio" className={navLinkClass}>Portfolio</a>
                        <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
                            Contact
                        </a>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-white/5 space-y-1">
                        <a href="#home" className="block py-2.5 text-gray-300 hover:text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
                        <a href="#about" className="block py-2.5 text-gray-300 hover:text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</a>
                        <a href="#services" className="block py-2.5 text-gray-300 hover:text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Services</a>
                        <a href="#products" className="block py-2.5 text-gray-300 hover:text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Products</a>
                        <a href="#clients-map" className="block py-2.5 text-gray-300 hover:text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Clients</a>
                        <a href="#portfolio" className="block py-2.5 text-gray-300 hover:text-white font-medium" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</a>
                        <a href="#contact" className="block mt-3 btn-primary text-center" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                    </div>
                )}
            </div>
            {/* Mobile bottom shading line */}
            <div className="md:hidden absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        </nav>
    );
}

export default Navbar;
