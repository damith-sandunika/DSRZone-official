import React, { useState, useEffect, useRef } from 'react';

const TRAIL_LEN = 5;
const LERP = 0.18;
const GOLD = '245, 158, 11';

function lerp(a, b, t) {
    return a + (b - a) * t;
}

export default function CursorGlow() {
    const [visible, setVisible] = useState(false);
    const [trail, setTrail] = useState(() =>
        Array.from({ length: TRAIL_LEN }, () => ({ x: -100, y: -100 }))
    );
    const mouseRef = useRef({ x: -100, y: -100 });
    const trailRef = useRef(trail);
    const rafRef = useRef(null);

    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;


    useEffect(() => {
        const handler = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            if (!visible) setVisible(true);
        };
        const leave = () => setVisible(false);
        window.addEventListener('mousemove', handler, { passive: true });
        document.documentElement.addEventListener('mouseleave', leave);
        return () => {
            window.removeEventListener('mousemove', handler);
            document.documentElement.removeEventListener('mouseleave', leave);
        };
    }, [visible]);

    useEffect(() => {
        if (isTouch) return;
        const tick = () => {
            const mouse = mouseRef.current;
            const prev = trailRef.current;
            const next = [];
            next[0] = {
                x: lerp(prev[0].x, mouse.x, LERP),
                y: lerp(prev[0].y, mouse.y, LERP),
            };
            for (let i = 1; i < TRAIL_LEN; i++) {
                next[i] = {
                    x: lerp(prev[i].x, next[i - 1].x, LERP),
                    y: lerp(prev[i].y, next[i - 1].y, LERP),
                };
            }
            trailRef.current = next;
            setTrail([...next]);
        };
        const loop = () => {
            tick();
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isTouch]);

    if (isTouch) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
            {trail.map((p, i) => {
                const t = i / (TRAIL_LEN - 1);
                const size = 8 - t * 5;
                const opacity = visible ? 0.35 + (1 - t) * 0.65 : 0;
                const scale = 0.6 + (1 - t) * 0.4;
                return (
                    <div
                        key={i}
                        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200"
                        style={{
                            left: p.x,
                            top: p.y,
                            width: size,
                            height: size,
                            marginLeft: -size / 2,
                            marginTop: -size / 2,
                            opacity,
                            transform: `translate(-50%, -50%) scale(${scale})`,
                            background: `radial-gradient(circle at 30% 30%, rgba(${GOLD}, 0.9), rgba(${GOLD}, 0.4))`,
                            boxShadow: `0 0 ${6 + t * 4}px rgba(${GOLD}, ${0.3 + (1 - t) * 0.4})`,
                        }}
                    />
                );
            })}
            {/* Lead dot: small sharp tip */}
            <div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-200"
                style={{
                    left: trail[0]?.x ?? -100,
                    top: trail[0]?.y ?? -100,
                    width: 4,
                    height: 4,
                    marginLeft: -2,
                    marginTop: -2,
                    opacity: visible ? 1 : 0,
                    background: `#f59e0b`,
                    boxShadow: `0 0 10px rgba(${GOLD}, 0.8)`,
                }}
            />
        </div>
    );
}
