import React, { useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Products from './Products';
import SriLankaMap from './SriLankaMap';
import Portfolio from './Portfolio';
import Contact from './Contact';
import ProjectShowcase from './ProjectShowcase';
import Testimonials from './Testimonials';
import CallToAction from './CallToAction';
import Footer from './Footer';
import ProductDetail from './ProductDetail';
import LoadingScreen from './LoadingScreen';

function HomePage({ onVideoReady }) {
    return (
        <>
            <Navbar />
            <main>
                <Hero onVideoReady={onVideoReady} />
                <About />
                <Products />
                <Services />
                <SriLankaMap />
                <Portfolio />
                <CallToAction />
                <Testimonials />
                <Contact />
                <ProjectShowcase />
            </main>
            <Footer />
        </>
    );
}

function App() {
    const [loading, setLoading] = useState(true);
    const [videoReady, setVideoReady] = useState(false);
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    const handleVideoReady = useCallback(() => {
        setVideoReady(true);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0c12] text-white">
            {loading && (
                <LoadingScreen
                    videoReady={!isHomePage || videoReady}
                    onComplete={() => setLoading(false)}
                />
            )}
            <div
                className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
            >
                <Routes>
                    <Route path="/" element={<HomePage onVideoReady={handleVideoReady} />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
