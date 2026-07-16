import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from '../config/axios';
import ScrollReveal from './ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

const DEMO_PINS = [
    { id:1, map_x:31.5, map_y:57.2, map_city:'Colombo',    title:'Smarty Menu System',     description:'QR-based digital menu with real-time updates and kitchen dashboard for a leading restaurant chain in Colombo.',     category:'Restaurant', project_url:'#', client:'The Garden Restaurant' },
    { id:2, map_x:45.2, map_y:41.8, map_city:'Kandy',      title:'Inventory Pro',           description:'Real-time stock tracking with barcode scanning across multiple branches. Reduced inventory losses by 60%.',          category:'Inventory',  project_url:'#', client:'Lanka Pharma' },
    { id:3, map_x:38.0, map_y:70.5, map_city:'Galle',      title:'EduPulse LMS',            description:'Full learning management system with video lessons, quizzes, attendance and automatic certificate generation.',       category:'EdTech',     project_url:'#', client:'Institute of Technology' },
    { id:4, map_x:25.0, map_y:50.2, map_city:'Negombo',    title:'ShopFlow E-Commerce',     description:'Custom e-commerce platform with automated WhatsApp order notifications, delivery tracking and payment management.',  category:'E-Commerce', project_url:'#', client:'Ceylon Fashion Hub' },
    { id:5, map_x:37.0, map_y:35.5, map_city:'Kurunegala', title:'ClinicPulse',             description:'Digital appointment and patient records system that eliminated double bookings and paper-based patient tracking.',    category:'Healthcare', project_url:'#', client:'MediCare Network' },
    { id:6, map_x:62.5, map_y:33.8, map_city:'Trincomalee',title:'BookEase Hotel System',   description:'Integrated hotel booking engine with room management, housekeeping dashboard and real-time point-of-sale.',         category:'Hospitality',project_url:'#', client:'Sunrise Hotel & Spa' },
];

/* ─── Canvas cyber overlay ─────────────────────────────────────────────── */
function CyberCanvas() {
    const ref = useRef(null);
    useEffect(() => {
        const c = ref.current; if (!c) return;
        const ctx = c.getContext('2d');
        const resize = () => { 
            const p = c.parentElement; 
            if(p) { c.width = p.offsetWidth; c.height = p.offsetHeight; } 
        };
        resize();
        
        const stars = Array.from({length:80}, () => ({ 
            x:Math.random()*2000, // spread wide
            y:Math.random()*2000, 
            r:Math.random()*1.5+0.5, 
            a:Math.random(), 
            sp:Math.random()*0.005+0.002 
        }));
        
        let scanY = 0, raf;
        function draw() {
            const w = c.width, h = c.height;
            if (!w || !h || !isFinite(w) || !isFinite(h)) { raf = requestAnimationFrame(draw); return; }
            
            ctx.clearRect(0,0,w,h);
            
            // Grid
            ctx.strokeStyle='rgba(56,189,248,0.04)'; 
            ctx.lineWidth=1;
            for(let x=0; x<w; x+=40){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke(); }
            for(let y=0; y<h; y+=40){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }
            
            // Stars
            stars.forEach(s => {
                s.a += s.sp; 
                const a = (Math.sin(s.a*Math.PI*2)*0.5+0.5)*0.8; 
                ctx.beginPath(); ctx.arc(s.x % w, s.y % h, s.r, 0, Math.PI*2);
                ctx.fillStyle = `rgba(147,197,253,${a})`; ctx.fill(); 
            });
            
            // Scanline
            scanY = (scanY+0.8) % h;
            const g = ctx.createLinearGradient(0,scanY-30,0,scanY+30);
            g.addColorStop(0,'rgba(56,189,248,0)');
            g.addColorStop(.5,'rgba(56,189,248,0.08)');
            g.addColorStop(1,'rgba(56,189,248,0)');
            ctx.fillStyle = g; ctx.fillRect(0,scanY-30,w,60);
            
            raf = requestAnimationFrame(draw);
        }
        draw();
        window.addEventListener('resize', resize);
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
    },[]);
    
    return <canvas ref={ref} className="absolute inset-0 pointer-events-none" style={{zIndex:0, width:'100%', height:'100%'}} />;
}

/* ─── Typewriter ───────────────────────────────────────────────────────── */
function Typewriter({ text, speed=22, delay=0, className='' }) {
    const [out, setOut] = useState('');
    useEffect(() => {
        setOut(''); if(!text) return;
        let i=0, id;
        const timeout = setTimeout(() => {
            id = setInterval(()=>{ i++; setOut(text.slice(0,i)); if(i>=text.length) clearInterval(id); },speed);
        }, delay);
        return ()=> { clearTimeout(timeout); clearInterval(id); };
    },[text,speed,delay]);
    return <span className={className}>{out}<span className="inline-block w-1.5 h-3 bg-sky-400 ml-0.5 align-bottom animate-pulse" /></span>;
}

/* ─── Terminal Panel ────────────────────────────────────────────────────── */
function TerminalPanel({ project, isRightSide = false }) {
    if(!project) return null;
    
    // Temporary cover image
    const coverImage = `https://picsum.photos/seed/${project.id * 15}/400/200`;

    return (
        <AnimatePresence mode="wait">
        <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col h-full max-h-[480px] rounded-xl overflow-hidden border border-sky-500/20 bg-[#060c18]/80 backdrop-blur-xl shadow-2xl shadow-sky-900/20 relative z-10"
        >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#0a1628] border-b border-sky-500/10 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="ml-2 text-[10px] text-sky-400/50 font-mono">system@dsrzone: ~/projects</span>
            </div>

            {/* Cover image (Office Temp) */}
            <div className="relative h-32 shrink-0 border-b border-sky-500/10">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060c18] to-transparent" />
                
                {/* Category & City Tags over image */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30 backdrop-blur-sm">
                        {project.category || 'Project'}
                    </span>
                    {project.map_city && (
                        <div className="flex items-center gap-1.5 bg-[#060c18]/80 rounded px-2 py-0.5 border border-sky-500/20 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                            <span className="text-sky-300 text-[10px] font-semibold">{project.map_city}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 p-4 font-mono text-xs overflow-auto flex flex-col">
                <p className="text-sky-400/50 mb-3">$ execute project_deploy.sh --id={project.id}</p>
                
                <div className="mb-1 text-sky-300/60">&gt; Title:</div>
                <div className="text-white font-bold text-sm mb-3 h-5">
                    <Typewriter text={project.title} speed={25} />
                </div>

                {project.client && (
                    <>
                        <div className="mb-1 text-sky-300/60">&gt; Client:</div>
                        <div className="text-slate-300 mb-3 h-4">
                            <Typewriter text={project.client} speed={25} delay={project.title?.length * 25 + 100} />
                        </div>
                    </>
                )}

                <div className="mb-1 text-sky-300/60">&gt; Output_Log:</div>
                <div className="text-slate-400 leading-relaxed mb-4 flex-1">
                    <Typewriter 
                        text={project.description || ''} 
                        speed={15} 
                        delay={(project.title?.length * 25) + (project.client?.length * 25) + 300} 
                    />
                </div>

                {project.project_url && project.project_url !== '#' && (
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-sky-600/10 border border-sky-500/30 text-sky-400 text-xs hover:bg-sky-600/30 hover:border-sky-400 transition-all mt-auto self-start">
                        View Live Site
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>
                )}
            </div>
        </motion.div>
        </AnimatePresence>
    );
}

/* ─── Main ─────────────────────────────────────────────────────────────── */
export default function SriLankaMap() {
    const [projects, setProjects] = useState([]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        axios.get('/api/v1/projects')
            .then(r => { const m=r.data.filter(p=>p.map_x!=null&&p.map_y!=null); setProjects(m.length?m:DEMO_PINS); })
            .catch(() => setProjects(DEMO_PINS));
    },[]);

    const n = projects.length;

    /* Auto-rotation */
    useEffect(() => {
        if(paused || n<2) return;
        const id = setInterval(() => setActiveIdx(i=>(i+1)%n), 6500); // 6.5s to allow typewriter to finish
        return ()=>clearInterval(id);
    },[paused,n]);

    const leftIdx = activeIdx;
    const rightIdx = (activeIdx + 1) % n;
    
    const leftProj = projects[leftIdx];
    const rightProj = projects[rightIdx];

    const prev = ()=>{ setPaused(true); setActiveIdx(i=>(i-1+n)%n); };
    const next = ()=>{ setPaused(true); setActiveIdx(i=>(i+1)%n); };

    return (
        <section id="clients-map" className="relative bg-[#030610] border-t border-white/5 overflow-hidden w-full min-h-screen flex flex-col justify-center py-20">
            
            {/* FULL SECTION Cyber Canvas Background */}
            <CyberCanvas />

            {/* Bottom Glow */}
            <div className="absolute bottom-0 inset-x-0 h-64 pointer-events-none" style={{background:'radial-gradient(ellipse 120% 80% at 50% 100%, rgba(56,189,248,0.12) 0%, transparent 70%)', zIndex:1}} />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Heading */}
                <ScrollReveal>
                    <div className="text-center mb-12">
                        <p className="section-label">Our Reach</p>
                        <h2 className="section-title mt-2"><span className="section-title-accent">Clients Across Sri Lanka</span></h2>
                        <div className="section-divider" />
                        <p className="section-desc mt-5 max-w-2xl mx-auto">Auto-cycling through our client projects. Explore how we transformed businesses nationwide.</p>
                    </div>
                </ScrollReveal>

                {/* Main 3-Column Layout */}
                <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 w-full mt-4"
                     onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
                    
                    {/* LEFT PANEL (Desktop only) */}
                    <div className="hidden lg:block w-[30%] order-1 self-center">
                        <TerminalPanel project={leftProj} isRightSide={false} />
                    </div>

                    {/* CENTER MAP */}
                    <div className="w-full sm:max-w-md lg:w-[35%] order-2 relative flex flex-col items-center shrink-0">
                        <div className="relative w-full max-w-[340px] mx-auto">
                            {/* Map Image */}
                            <img src="/images/sri lanka Map.png" alt="Sri Lanka"
                                 className="relative w-full block select-none pointer-events-none"
                                 style={{filter:'drop-shadow(0 0 20px rgba(56,189,248,0.4)) brightness(1.15) saturate(1.6)',zIndex:10}} />

                            {/* Connector Lines SVG */}
                            <svg className="absolute inset-0 pointer-events-none hidden lg:block" width="100%" height="100%" style={{zIndex:12, overflow:'visible'}}>
                                {leftProj && (
                                    <>
                                        <line x1={`${leftProj.map_x}%`} y1={`${leftProj.map_y}%`} x2="-20%" y2={`${leftProj.map_y}%`} stroke="rgba(56,189,248,0.5)" strokeWidth="1" strokeDasharray="4 4" />
                                        <circle cx={`${leftProj.map_x}%`} cy={`${leftProj.map_y}%`} r="6" fill="rgba(56,189,248,0.3)" stroke="#38bdf8" strokeWidth="1.5">
                                            <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite"/>
                                            <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite"/>
                                        </circle>
                                    </>
                                )}
                                {rightProj && n > 1 && (
                                    <>
                                        <line x1={`${rightProj.map_x}%`} y1={`${rightProj.map_y}%`} x2="120%" y2={`${rightProj.map_y}%`} stroke="rgba(56,189,248,0.5)" strokeWidth="1" strokeDasharray="4 4" />
                                        <circle cx={`${rightProj.map_x}%`} cy={`${rightProj.map_y}%`} r="6" fill="rgba(56,189,248,0.3)" stroke="#38bdf8" strokeWidth="1.5">
                                            <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite"/>
                                            <animate attributeName="opacity" values="1;0.2;1" dur="2s" repeatCount="indefinite"/>
                                        </circle>
                                    </>
                                )}
                            </svg>

                            {/* Interactive Pins */}
                            <div className="absolute inset-0" style={{zIndex:15}}>
                                {projects.map((p,i) => {
                                    const isLeft = i === leftIdx;
                                    const isRight = (n > 1 && i === rightIdx);
                                    const isA = isLeft || isRight;
                                    
                                    return (
                                        <button key={p.id} type="button"
                                            onClick={()=>{setPaused(true); setActiveIdx(i);}}
                                            title={p.map_city||p.title}
                                            className="absolute"
                                            style={{left:`${p.map_x}%`,top:`${p.map_y}%`,transform:'translate(-50%,-50%)'}}>
                                            {isA && <span className="absolute inset-0 rounded-full animate-ping" style={{background:'rgba(56,189,248,0.4)'}} />}
                                            <span className="relative block rounded-full transition-all duration-300"
                                                  style={{
                                                      width:isA?14:8, height:isA?14:8,
                                                      background:isA?'#38bdf8':'rgba(56,189,248,0.4)',
                                                      border:`2px solid ${isA?'#bae6fd':'transparent'}`,
                                                      boxShadow:isA?'0 0 16px #38bdf8':'none',
                                                  }} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL (Desktop only) */}
                    <div className="hidden lg:block w-[30%] order-3 self-center">
                        {n > 1 && <TerminalPanel project={rightProj} isRightSide={true} />}
                    </div>

                    {/* MOBILE PANEL (Only 1 visible below map) */}
                    <div className="block lg:hidden w-full max-w-md mx-auto order-3 mt-4">
                        <TerminalPanel project={leftProj} isRightSide={false} />
                        
                        {/* Mobile Controls */}
                        <div className="flex justify-center gap-4 mt-6">
                            <button onClick={prev} className="flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 text-sky-400 bg-sky-900/10 hover:bg-sky-500/20 transition-all text-sm font-semibold">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                                Prev
                            </button>
                            <button onClick={next} className="flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 text-sky-400 bg-sky-900/10 hover:bg-sky-500/20 transition-all text-sm font-semibold">
                                Next
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
