import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProducts } from '../api/products';
import { imageUrl } from '../utils/imageUrl';

const COMPANY_LOGO = '/images/logo.png';
const ORBIT_RADIUS = 220;
const LOGO_SIZE = 64;

function GoldenHero() {
  const sectionRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [systems, setSystems] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchProducts().then((data) => {
      if (cancelled || !Array.isArray(data)) return;
      setSystems(data);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (systems.length <= 1) return;
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % systems.length);
    }, 2000);
    return () => clearInterval(t);
  }, [systems.length]);

  const handleMouseMove = useCallback(
    (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: y * 20, y: -x * 20 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const activeSystem = systems[activeIndex];

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen text-white overflow-hidden flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-20 lg:gap-y-0 px-6 sm:px-10 lg:px-16 pt-24 pb-20 lg:pt-32 lg:pb-0"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: 'url(/images/3.jpg)' }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#0a0c12]/80 pointer-events-none" />
      {/* Square grid background */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(250, 204, 21, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(250, 204, 21, 0.5) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(234, 179, 8, 0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 179, 8, 0.6) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Left: Text content – matching our systems */}
      <div className="relative z-10 order-1 flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left max-w-xl lg:max-w-none lg:pr-8">
        <motion.p
          className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400/90"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sldigitasystem
        </motion.p>
        <motion.h1
          className="mt-2 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          Digital Systems
          <br />
          That Scale
        </motion.h1>
        <motion.p
          className="mt-5 text-slate-400 text-lg leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          We build and integrate software systems for menus, inventory, booking, and operations — so your business runs smoother.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
        >
          <a
            href="#products"
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-semibold px-6 py-3.5 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/40 transition-all"
          >
            View products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-yellow-500/50 text-yellow-400 font-semibold px-6 py-3.5 hover:bg-yellow-500/10 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Right: Main logo + orbit; orbit scaled on mobile so circle fits; pt for navbar clearance on desktop */}
      <div className="relative order-2 flex-1 min-h-[320px] lg:min-h-[520px] flex flex-col items-center justify-center lg:justify-center" style={{ perspective: '1200px' }}>
        {/* Sunlight glow behind */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
          <div
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-full opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(250, 204, 21, 0.3) 0%, rgba(234, 179, 8, 0.1) 45%, transparent 70%)',
              filter: 'blur(24px)',
            }}
          />
        </div>

        {/* Main company logo – stronger 3D tilt, no extra background */}
        <motion.div
          className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 flex items-center justify-center cursor-default outline-none"
          style={{
            rotateX: tilt.x,
            rotateY: tilt.y,
            transformStyle: 'preserve-3d',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          whileHover={{ scale: 1.08, transition: { duration: 0.25 } }}
        >
          <motion.div
            className="w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{
              rotateZ: [0, 2, -2, 0],
              y: [0, 6, -6, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src={COMPANY_LOGO}
              alt="Sldigitasystem"
              className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(250,204,21,0.45)]"
            />
          </motion.div>
        </motion.div>

        {/* Orbit circle: rotating ring + system logos (hover only, no link / no click action) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center origin-center scale-[0.88] sm:scale-95 lg:scale-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute rounded-full border-2 border-yellow-500/30"
            style={{
              width: ORBIT_RADIUS * 2,
              height: ORBIT_RADIUS * 2,
              left: '50%',
              top: '50%',
              marginLeft: -ORBIT_RADIUS,
              marginTop: -ORBIT_RADIUS,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          >
            {systems.map((product, i) => {
              const n = Math.max(systems.length, 1);
              const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
              const x = Math.cos(angle) * ORBIT_RADIUS;
              const y = Math.sin(angle) * ORBIT_RADIUS;
              const half = LOGO_SIZE / 2;
              const leftPx = ORBIT_RADIUS + x - half;
              const topPx = ORBIT_RADIUS + y - half;
              return (
                <motion.div
                  key={product.id}
                  className="absolute z-20 rounded-full overflow-hidden flex items-center justify-center border-2 border-yellow-400/50 bg-slate-900/30 backdrop-blur-sm hover:border-yellow-300 hover:shadow-[0_0_18px_rgba(234,179,8,0.4)] transition-all cursor-default"
                  style={{
                    width: LOGO_SIZE,
                    height: LOGO_SIZE,
                    left: leftPx,
                    top: topPx,
                    boxShadow: '0 0 12px rgba(234, 179, 8, 0.2)',
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                >
                  {product.logo ? (
                    <img
                      src={imageUrl(product.logo)}
                      alt={product.name}
                      className="w-full h-full object-contain p-1.5"
                    />
                  ) : (
                    <span className="text-yellow-400 font-bold text-sm">{product.name?.slice(0, 1) || '?'}</span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* System name + tagline below (cycle every 2s) */}
        <div className="relative z-10 mt-6 min-h-[3.5rem] flex flex-col items-center justify-center px-4">
          <AnimatePresence mode="wait">
            {activeSystem && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <p className="text-yellow-400 font-semibold text-lg">{activeSystem.name}</p>
                {activeSystem.tagline && (
                  <p className="text-slate-400 text-sm mt-0.5 max-w-[240px] mx-auto">{activeSystem.tagline}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default GoldenHero;
