import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, LayoutGroup } from 'framer-motion';
import { imageUrl } from '../utils/imageUrl';
import { fetchProducts } from '../api/products';

const COMPANY_LOGO = '/images/logo.png';
const ORBIT_RADIUS = 120;
const PLANET_SIZE = 48;

// Mock data – used when API returns nothing (same shape: id, name, logo, short_description)
const MOCK_PROJECTS = [
  { id: 1, name: 'Smarty Menu', logo: '/images/logo.png', short_description: 'Smart digital menu and ordering system for restaurants.' },
  { id: 2, name: 'Inventory Pro', logo: '/images/logo.png', short_description: 'Stock and warehouse management made simple.' },
  { id: 3, name: 'Booking Hub', logo: '/images/logo.png', short_description: 'Unified booking and scheduling platform.' },
];

function toProject(p) {
  return { id: p.id, name: p.name, logo: p.logo, short_description: p.desc || p.short_description || '' };
}

function Typewriter({ text, progress }) {
  const length = Math.floor((text?.length || 0) * Math.min(1, Math.max(0, progress)));
  return <span>{text?.slice(0, length)}</span>;
}

function SolarSystemHero() {
  const sectionRef = useRef(null);
  const [projects, setProjects] = useState(MOCK_PROJECTS);

  useEffect(() => {
    let cancelled = false;
    fetchProducts().then((data) => {
      if (cancelled || !Array.isArray(data) || data.length === 0) return;
      setProjects(data.map(toProject));
    });
    return () => { cancelled = true; };
  }, []);

  const [projectIndex, setProjectIndex] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [orbitRotation, setOrbitRotation] = useState(0);
  const orbitRef = useRef(0);
  const rafRef = useRef(null);

  const N = Math.max(1, projects.length);
  const sectionHeightVh = 4 * N * 100;
  const totalHeightPx = typeof window !== 'undefined' ? (sectionHeightVh / 100) * window.innerHeight : 400 * N;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const p = latest * N;
    const idx = Math.min(Math.floor(p), N - 1);
    const phaseP = p % 1;
    setProjectIndex(idx);
    setPhaseProgress(phaseP);
  });

  const phase = phaseProgress < 0.25 ? 'detach' : phaseProgress < 0.5 ? 'info' : phaseProgress < 0.75 ? 'dock' : 'orbit';

  useEffect(() => {
    if (phase !== 'orbit') return;
    const start = performance.now();
    const tick = (t) => {
      orbitRef.current = ((t - start) / 20000) * 360;
      setOrbitRotation(orbitRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  const sunOpacity = useTransform(scrollYProgress, (v) => {
    const phaseP = (v * N) % 1;
    if (phaseP < 0.25) return 1 - phaseP * 4;
    if (phaseP < 0.75) return 0;
    return Math.min(1, (phaseP - 0.75) * 4);
  });

  const orbitOpacity = useTransform(scrollYProgress, (v) => {
    const phaseP = (v * N) % 1;
    if (phaseP < 0.25) return 1 - phaseP * 2;
    if (phaseP < 0.75) return 0;
    return Math.min(1, (phaseP - 0.75) * 4);
  });

  const focalY = useTransform(scrollYProgress, (v) => {
    const phaseP = (v * N) % 1;
    if (phaseP < 0.25) return (phaseP / 0.25) * -120;
    if (phaseP < 0.5) return -120;
    if (phaseP < 0.75) return -120 + ((phaseP - 0.5) / 0.25) * 200;
    return 80;
  });

  const focalScale = useTransform(scrollYProgress, (v) => {
    const phaseP = (v * N) % 1;
    if (phaseP < 0.25) return 0.8 + (phaseP / 0.25) * 0.6;
    if (phaseP < 0.5) return 1.4;
    if (phaseP < 0.75) return 1.4 - ((phaseP - 0.5) / 0.25) * 0.6;
    return 0.8;
  });

  const infoOpacity = useTransform(scrollYProgress, (v) => {
    const phaseP = (v * N) % 1;
    if (phaseP < 0.25) return 0;
    if (phaseP < 0.5) return Math.min(1, (phaseP - 0.25) * 4);
    if (phaseP < 0.75) return Math.max(0, 1 - (phaseP - 0.5) * 4);
    return 0;
  });

  const inOrbit = (i) => phase === 'orbit' || i !== projectIndex;
  const typewriterProgress = phase === 'info' ? (phaseProgress - 0.25) / 0.25 : 0;
  const showInDock = (i) => (phase === 'dock' && i <= projectIndex) || (phase === 'orbit' && i <= projectIndex);
  const isActiveDocking = (i) => phase === 'dock' && i === projectIndex;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative bg-[#0a0c12]"
      style={{ height: `${sectionHeightVh}vh` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_40%,rgba(245,158,11,0.04)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-50 pointer-events-none" />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <LayoutGroup>
          {/* Left: intro / branding (optional) */}
          <div className="absolute left-0 top-0 bottom-0 w-full max-w-md flex flex-col justify-center pl-6 sm:pl-12 z-10 pointer-events-none">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-500 mb-4">Sldigitasystem</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              We Create <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-600">Digital Experiences</span>
            </h1>
            <p className="mt-4 text-gray-400 text-sm">Scroll to explore our systems.</p>
          </div>

          {/* Center: orbit + sun */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{ opacity: sunOpacity }}
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[#0f1116] border-2 border-amber-500/50 shadow-xl shadow-amber-500/20 flex items-center justify-center p-2">
                <img src={COMPANY_LOGO} alt="Sldigitasystem" className="w-full h-full object-contain" />
              </div>
            </motion.div>

            <motion.div
              className="absolute rounded-full border border-amber-500/30 pointer-events-none"
              style={{
                width: ORBIT_RADIUS * 2 + 80,
                height: ORBIT_RADIUS * 2 + 80,
                opacity: orbitOpacity,
                rotate: phase === 'orbit' ? orbitRotation : 0,
                transition: phase === 'orbit' ? undefined : 'opacity 0.4s ease',
              }}
            />
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: ORBIT_RADIUS * 2 + 80,
                height: ORBIT_RADIUS * 2 + 80,
                opacity: orbitOpacity,
                rotate: phase === 'orbit' ? orbitRotation : 0,
                transition: phase === 'orbit' ? undefined : 'opacity 0.4s ease',
              }}
            >
              {projects.map((project, i) => {
                if (!inOrbit(i)) return null;
                const angle = (i / N) * 360;
                const x = Math.cos((angle * Math.PI) / 180) * ORBIT_RADIUS;
                const y = Math.sin((angle * Math.PI) / 180) * ORBIT_RADIUS;
                return (
                  <motion.div
                    key={project.id}
                    layoutId={`planet-${project.id}`}
                    className="absolute rounded-full overflow-hidden bg-[#0f1116] border-2 border-amber-500/40 flex items-center justify-center"
                    style={{
                      width: PLANET_SIZE,
                      height: PLANET_SIZE,
                      left: `calc(50% + ${x}px - ${PLANET_SIZE / 2}px)`,
                      top: `calc(50% + ${y}px - ${PLANET_SIZE / 2}px)`,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {project.logo ? (
                      <img src={imageUrl(project.logo)} alt="" className="w-full h-full object-contain p-1" />
                    ) : (
                      <span className="text-amber-500 font-bold">{project.name?.slice(0, 1) || '?'}</span>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Focal point: top-center (detach + info) */}
            {(phase === 'detach' || phase === 'info') && projects[projectIndex] && (
              <motion.div
                className="absolute left-1/2 top-[28%] -translate-x-1/2 flex flex-col items-center z-20"
                style={{ y: focalY, scale: focalScale }}
              >
                <motion.div
                  layoutId={`planet-${projects[projectIndex].id}`}
                  className="rounded-full overflow-hidden bg-[#0f1116] border-2 border-amber-500/50 shadow-xl flex items-center justify-center shrink-0"
                  style={{ width: 80, height: 80 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {projects[projectIndex].logo ? (
                    <img src={imageUrl(projects[projectIndex].logo)} alt="" className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-amber-500 font-bold text-2xl">{projects[projectIndex].name?.slice(0, 1) || '?'}</span>
                  )}
                </motion.div>
                <motion.div className="mt-4 text-center max-w-sm px-4" style={{ opacity: infoOpacity }}>
                  <h2 className="text-xl font-bold text-white">{projects[projectIndex].name}</h2>
                  <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                    <Typewriter text={projects[projectIndex].short_description} progress={typewriterProgress} />
                  </p>
                </motion.div>
              </motion.div>
            )}

            {/* Docked area: bottom */}
            <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-4 px-4 z-10 flex-wrap">
              {projects.map((project, i) => {
                if (!showInDock(i)) return null;
                const active = isActiveDocking(i);
                return (
                  <motion.div
                    key={project.id}
                    layoutId={active ? `planet-${project.id}` : undefined}
                    className="flex flex-col items-center rounded-xl bg-[#0f1116]/95 border border-amber-500/30 p-3 min-w-[100px] backdrop-blur-sm"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-[#0a0c12] border border-amber-500/40 flex items-center justify-center shrink-0">
                      {project.logo ? (
                        <img src={imageUrl(project.logo)} alt="" className="w-full h-full object-contain p-1" />
                      ) : (
                        <span className="text-amber-500 font-bold text-sm">{project.name?.slice(0, 1) || '?'}</span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-white mt-2 truncate w-full text-center">{project.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </LayoutGroup>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-gray-500 text-xs uppercase tracking-widest">
          Scroll
        </div>
      </div>
    </section>
  );
}

export default SolarSystemHero;
