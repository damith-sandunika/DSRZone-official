import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CRITICAL_IMAGES = [
    '/images/dsrzone-preloader-backdrop.jpg',
    '/images/dsrzone-logo-preloader.png',
    '/images/dsrzone-official-logo.png',
    '/images/dsrzone-about-banner.jpg',
];

const MIN_DISPLAY_MS = 1500;
const MAX_WAIT_MS = 25000;

function preloadImages(urls) {
    return Promise.all(
        urls.map(
            (src) =>
                new Promise((resolve) => {
                    const img = new Image();
                    const t = setTimeout(() => resolve(), 3000);
                    img.onload = () => {
                        clearTimeout(t);
                        resolve();
                    };
                    img.onerror = () => {
                        clearTimeout(t);
                        resolve();
                    };
                    img.src = src;
                })
        )
    );
}

function waitForPageLoad() {
    if (document.readyState === 'complete') return Promise.resolve();
    return new Promise((resolve) => {
        window.addEventListener('load', resolve, { once: true });
    });
}

export default function LoadingScreen({ onComplete, videoReady = false }) {
    const [exiting, setExiting] = useState(false);
    const [progress, setProgress] = useState(15);
    const [pageAssetsReady, setPageAssetsReady] = useState(false);
    const [timedOut, setTimedOut] = useState(false);
    const startTimeRef = React.useRef(Date.now());

    // 1. Preload core assets & wait for DOM readiness
    useEffect(() => {
        Promise.all([preloadImages(CRITICAL_IMAGES), waitForPageLoad()]).then(() => {
            setPageAssetsReady(true);
        });

        // Safety fallback timeout: release after 10s even if video or network is sluggish
        const timeout = setTimeout(() => {
            setTimedOut(true);
        }, MAX_WAIT_MS);

        return () => clearTimeout(timeout);
    }, []);

    // 2. All required resources are ready if (pageAssetsReady AND (videoReady OR timedOut))
    const isReady = pageAssetsReady && (videoReady || timedOut);

    // 3. Smooth simulated progress ticker
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (!isReady) {
                    // Hold progress between 80% - 88% while waiting for video to load
                    if (prev >= 88) return 88;
                    return Math.min(88, prev + Math.floor(Math.random() * 8) + 4);
                } else {
                    // Once ready, rush to 100%
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return Math.min(100, prev + 12);
                }
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isReady]);

    // 4. Trigger exit once 100% is reached AND minimum display time has elapsed
    useEffect(() => {
        if (progress >= 100 && isReady && !exiting) {
            const elapsed = Date.now() - startTimeRef.current;
            const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

            const timer = setTimeout(() => {
                setExiting(true);
                setTimeout(() => {
                    onComplete?.();
                }, 600);
            }, remaining);

            return () => clearTimeout(timer);
        }
    }, [progress, isReady, exiting, onComplete]);

    return (
        <AnimatePresence>
            {!exiting && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#020617] overflow-hidden select-none"
                    aria-hidden="true"
                >
                    {/* ── 1. BACKGROUND CYBER MESH & GLOW ─────────────────── */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                        {/* Ambient blurred atmospheric background layer: fills entire phone screen with matching electric-blue cyber atmosphere so no empty black borders exist */}
                        <img
                            src="/images/dsrzone-preloader-backdrop.jpg"
                            alt="DSRZone Cyber Atmosphere"
                            className="absolute inset-0 w-full h-full object-cover object-center filter blur-3xl opacity-65 scale-135"
                        />

                        {/* Crisp central backdrop with feathered mask so edges dissolve softly into the ambient blue shade */}
                        <motion.img
                            src="/images/dsrzone-preloader-backdrop.jpg"
                            alt="DSRZone Cyber Mesh Backdrop"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.025, 1] }}
                            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-full h-full object-cover object-center opacity-90 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black_30%,transparent_85%)]"
                        />

                        {/* Dedicated smooth side vignettes to dissolve left and right boundaries on mobile screens */}
                        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#020617] via-[#020617]/75 to-transparent pointer-events-none z-10" />
                        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#020617] via-[#020617]/75 to-transparent pointer-events-none z-10" />

                        {/* Soft directional shade vignettes to dissolve top and bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-[#020617]/90" />

                        {/* Ambient radial laser glow in the center */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] bg-gradient-to-r from-blue-600/30 via-cyan-500/18 to-transparent rounded-full blur-[80px] sm:blur-[110px]" />
                    </div>

                    {/* ── 2. CENTERPIECE (LOGO & ANIMATIONS) ──────────────── */}
                    <div className="relative z-10 flex flex-col items-center px-4 max-w-lg text-center">

                        {/* Logo Monogram, DSRZone & Born to Innovate - Scaled down for mobile so watermark is visible */}
                        <motion.div
                            initial={{ opacity: 0, y: 16, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex flex-col items-center"
                        >
                            <img
                                src="/images/dsrzone-logo-preloader.png"
                                alt="DSRZone Born to Innovate"
                                title="DSRZone – Born to Innovate"
                                className="w-28 sm:w-44 md:w-56 lg:w-72 h-auto object-contain filter drop-shadow-[0_0_25px_rgba(56,189,248,0.45)]"
                            />
                        </motion.div>

                        {/* ── 3. THREE GLOWING NEON BLUE LOADING DOTS [ ■ ■ ■ ] ─ */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex items-center justify-center gap-1.5 sm:gap-2.5 mt-3 sm:mt-5"
                        >
                            {[0, 1, 2].map((i) => (
                                <motion.span
                                    key={i}
                                    animate={{
                                        scale: [0.85, 1.35, 0.85],
                                        opacity: [0.35, 1, 0.35],
                                    }}
                                    transition={{
                                        duration: 1.1,
                                        repeat: Infinity,
                                        delay: i * 0.22,
                                        ease: 'easeInOut',
                                    }}
                                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[2px] sm:rounded-[3px] bg-gradient-to-tr from-blue-500 via-sky-400 to-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.9),0_0_20px_rgba(14,165,233,0.5)]"
                                />
                            ))}
                        </motion.div>

                        {/* ── 4. SUBTITLE TYPOGRAPHY ──────────────────────────── */}
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.6 }}
                            className="mt-2.5 sm:mt-4 text-[8px] sm:text-[10px] md:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-cyan-200/90 font-mono drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                        >
                            Crafting Your Digital Experience
                        </motion.p>

                        {/* ── 5. SLEEK NEON PROGRESS BAR & COUNTER ────────────── */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.5 }}
                            className="mt-2.5 sm:mt-4 flex flex-col items-center w-28 sm:w-40 md:w-48"
                        >
                            {/* Thin progress track */}
                            <div className="w-full h-[2px] bg-blue-950/80 rounded-full overflow-hidden border border-blue-900/40 shadow-inner">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-cyan-300 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                                    style={{ width: `${progress}%` }}
                                    transition={{ ease: 'easeOut', duration: 0.2 }}
                                />
                            </div>

                            {/* Percentage */}
                            <span className="mt-1 text-[8px] sm:text-[9px] font-mono font-bold text-sky-400/80 tracking-wider">
                                {progress}%
                            </span>
                        </motion.div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
