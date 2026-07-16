import React, { useState, useEffect } from 'react';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 24);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinkClass = "text-gray-300 hover:text-white text-sm font-medium pb-1 transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#3b82f6] after:transition-all after:duration-200 hover:after:w-full";

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-[#0a0c12]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.25)]' : 'bg-transparent shadow-[0_2px_12px_rgba(0,0,0,0.08)]'
        }`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24 lg:h-32">
                    <a href="#home" className="flex items-center h-full">
                        <img
                            src="/images/logo.png"
                            alt="DSRZone.com"
                            className="h-20 lg:h-28 w-auto object-contain block"
                            fetchPriority="high"
                        />
                    </a>

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

                    <button
                        type="button"
                        className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        </nav>
    );
}

export default Navbar;
