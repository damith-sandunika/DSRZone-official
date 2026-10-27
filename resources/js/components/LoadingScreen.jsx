import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CRITICAL_IMAGES = [
    '/images/preloader_bg.jpg',
    '/images/logo_pre_clean.png',
    '/images/DSRZone logo.png',
    '/images/about_bg.jpg',
];

const MIN_DISPLAY_MS = 1500;
const MAX_WAIT_MS = 10000;

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
                    <div className="absolute inset-0 pointer-events-none">
                        {/* High-res backdrop with cyber wave & neon outline DR */}
                        <motion.img
                            src="/images/preloader_bg.jpg"
                            alt="Cyber mesh backdrop"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.03, 1] }}
                            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-full h-full object-cover object-center opacity-90"
                        />

                        {/* Top & Bottom dark fade gradients for edge-to-edge screens */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/80" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/60 via-transparent to-[#020617]/60" />

                        {/* Ambient radial laser glow in the center */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/25 via-cyan-500/15 to-transparent rounded-full blur-[100px]" />
                    </div>

                    {/* ── 2. CENTERPIECE (LOGO & ANIMATIONS) ──────────────── */}
                    <div className="relative z-10 flex flex-col items-center px-4 max-w-lg text-center">

                        {/* Logo Monogram, DSRZone & Born to Innovate */}
                        <motion.div
                            initial={{ opacity: 0, y: 16, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex flex-col items-center"
                        >
                            <img
                                src="/images/logo_pre_clean.png"
                                alt="DSRZone - Born to Innovate"
                                className="w-56 sm:w-64 md:w-72 lg:w-80 h-auto object-contain filter drop-shadow-[0_0_30px_rgba(56,189,248,0.4)]"
                            />
                        </motion.div>

                        {/* ── 3. THREE GLOWING NEON BLUE LOADING DOTS [ ■ ■ ■ ] ─ */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex items-center justify-center gap-2 sm:gap-2.5 mt-5 sm:mt-6"
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
                                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[3px] bg-gradient-to-tr from-blue-500 via-sky-400 to-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.9),0_0_24px_rgba(14,165,233,0.5)]"
                                />
                            ))}
                        </motion.div>

                        {/* ── 4. SUBTITLE TYPOGRAPHY ──────────────────────────── */}
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.6 }}
                            className="mt-4 sm:mt-5 text-[10px] sm:text-xs font-semibold tracking-[0.25em] sm:tracking-[0.35em] uppercase text-cyan-200/90 font-mono drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                        >
                            Crafting Your Digital Experience
                        </motion.p>

                        {/* ── 5. SLEEK NEON PROGRESS BAR & COUNTER ────────────── */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.55, duration: 0.5 }}
                            className="mt-4 flex flex-col items-center w-40 sm:w-48"
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
                            <span className="mt-1.5 text-[9px] font-mono font-bold text-sky-400/80 tracking-wider">
                                {progress}%
                            </span>
                        </motion.div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
