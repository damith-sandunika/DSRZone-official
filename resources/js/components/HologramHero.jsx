import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const NEON_CYAN = '#00f5ff';
const NEON_GREEN = '#39ff14';

function FloatingShapes() {
  const shapes = [
    { size: 80, x: -40, y: 20, delay: 0, duration: 6 },
    { size: 120, x: 120, y: -30, delay: 1, duration: 8 },
    { size: 60, x: -80, y: -60, delay: 0.5, duration: 7 },
    { size: 100, x: 60, y: 40, delay: 0.2, duration: 5 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-500/20 blur-3xl"
          style={{
            width: s.size,
            height: s.size,
            left: '50%',
            top: '50%',
            marginLeft: s.x,
            marginTop: s.y,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function HologramObject() {
  const groupRef = useRef();
  const particlesRef = useRef();
  const wireframeRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.15;
  });

  const particleCount = 800;
  const particlePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const wireframeGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 2);
    return new THREE.WireframeGeometry(geo);
  }, []);

  const innerWireframeGeometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(0.6, 1);
    return new THREE.WireframeGeometry(geo);
  }, []);

  return (
    <group ref={groupRef}>
      {/* Outer wireframe sphere */}
      <lineSegments ref={wireframeRef} geometry={wireframeGeometry}>
        <lineBasicMaterial color={NEON_CYAN} transparent opacity={0.9} />
      </lineSegments>

      {/* Inner wireframe */}
      <lineSegments geometry={innerWireframeGeometry}>
        <lineBasicMaterial color={NEON_GREEN} transparent opacity={0.7} />
      </lineSegments>

      {/* Particle shell */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color={NEON_CYAN}
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color={NEON_CYAN} />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color={NEON_GREEN} />
      <HologramObject />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 2 + 0.2}
        minPolarAngle={Math.PI / 2 - 0.2}
      />
      <EffectComposer>
        <Bloom intensity={1.4} luminanceThreshold={0.15} luminanceSmoothing={0.5} />
      </EffectComposer>
    </>
  );
}

function HologramHero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col lg:flex-row bg-slate-950 text-white overflow-hidden">
      {/* Left: Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-20 lg:py-0">
        <FloatingShapes />
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          Next Gen
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
            Digital Solutions
          </span>
        </motion.h1>
        <motion.p
          className="mt-6 text-lg sm:text-xl text-slate-400 max-w-lg leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          We build software systems that scale. From concept to deployment, we architect intelligent digital experiences.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3.5 font-semibold text-slate-900 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 transition-shadow"
          >
            Get Started
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-cyan-500/60 px-6 py-3.5 font-semibold text-cyan-400 hover:bg-cyan-500/10 transition-colors"
          >
            Our Services
          </a>
        </motion.div>
      </div>

      {/* Right: 3D Hologram */}
      <div className="relative flex-1 min-h-[50vh] lg:min-h-screen w-full">
        <Canvas
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
          camera={{ position: [0, 0, 4], fov: 50 }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 70% 50%, rgba(0, 245, 255, 0.06) 0%, transparent 60%)',
          }}
        />
      </div>
    </section>
  );
}

export default HologramHero;
