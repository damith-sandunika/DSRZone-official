import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import GoldenHero from './GoldenHero';
import About from './About';
import Services from './Services';
import Products from './Products';
import SriLankaMap from './SriLankaMap';
import Portfolio from './Portfolio';
import Contact from './Contact';
import Testimonials from './Testimonials';
import Footer from './Footer';
import CursorGlow from './CursorGlow';
import ProductDetail from './ProductDetail';
import LoadingScreen from './LoadingScreen';

function HomePage() {
    return (
        <>
            <Navbar />
            <main>
                <GoldenHero />
                <About />
                <Services />
                <Products />
                <SriLankaMap />
                <Portfolio />
                <Testimonials />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

function App() {
    const [loading, setLoading] = useState(true);

    return (
        <div className="min-h-screen bg-[#0a0c12] text-white">
            {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
            <div
                className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
            >
                <CursorGlow />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
