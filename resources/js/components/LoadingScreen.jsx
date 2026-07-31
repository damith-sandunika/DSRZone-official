import React, { useEffect, useState } from 'react';

const CRITICAL_IMAGES = [
    '/images/DSRZone logo.png',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
];

const MIN_DISPLAY_MS = 1400;
const MAX_WAIT_MS = 10000;

function preloadImages(urls) {
    return Promise.all(
        urls.map(
            (src) =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    const t = setTimeout(() => {
                        resolve();
                    }, 3000);
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

export default function LoadingScreen({ onComplete }) {
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const start = Date.now();
        const done = () => {
            const elapsed = Date.now() - start;
            const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
            setExiting(true);
            setTimeout(() => {
                onComplete?.();
            }, 320);
        };

        const timeout = setTimeout(done, MAX_WAIT_MS);

        Promise.all([preloadImages(CRITICAL_IMAGES), waitForPageLoad()]).then(
            () => {
                const elapsed = Date.now() - start;
                const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);
                setTimeout(done, remaining);
            }
        );

        return () => clearTimeout(timeout);
    }, [onComplete]);

    return (
        <div
            className={`loading-screen fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0a0c12] transition-opacity duration-300 ${
                exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            aria-hidden="true"
        >
            {/* Uncommon: morphing arc segments that rotate and pulse */}
            <div className="loading-screen-rings relative flex items-center justify-center w-40 h-40 sm:w-52 sm:h-52">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className="loading-screen-ring absolute rounded-full border-2 border-[#f59e0b]/40"
                        style={{
                            width: `${60 + i * 28}%`,
                            height: `${60 + i * 28}%`,
                            animationDelay: `${i * 0.2}s`,
                            borderColor: `rgba(245, 158, 11, ${0.2 + i * 0.15})`,
                        }}
                    />
                ))}
                {/* Center logo */}
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#0f1116] border border-[#f59e0b]/30 flex items-center justify-center overflow-hidden">
                    <img
                        src="/images/DSRZone logo.png"
                        alt="DSRZone Logo"
                        className="w-full h-full object-contain p-1.5"
                    />
                </div>
            </div>

            {/* Text with staggered shimmer */}
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.35em] text-white/90">
                <span className="loading-screen-text">Loading</span>
            </p>
            <div className="mt-3 h-0.5 w-24 overflow-hidden rounded-full bg-white/10">
                <div className="loading-screen-bar h-full w-1/2 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#fcd34d]" />
            </div>
        </div>
    );
}
