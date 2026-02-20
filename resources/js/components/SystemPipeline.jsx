import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fetchProducts } from '../api/products';
import { products as staticProducts } from '../data/products';
import { imageUrl } from '../utils/imageUrl';

const CARD_GAP = 32;
const CARD_HEIGHT = 100; // used for viewport clip and column height

function SystemCard({ product }) {
  const logoOrIcon = product.logo || product.icon;
  const isImage = logoOrIcon && typeof logoOrIcon === 'string' && (logoOrIcon.startsWith('http') || logoOrIcon.startsWith('/') || logoOrIcon.includes('.'));

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex w-full items-center gap-4 rounded-2xl border border-amber-500/40 px-5 py-4 shadow-[0_0_28px_-8px_rgba(234,179,8,0.18)] transition-all hover:border-amber-400/60 hover:shadow-[0_0_36px_-6px_rgba(234,179,8,0.28)] focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:ring-offset-2 focus:ring-offset-[#0a0c12]"
      style={{ minHeight: CARD_HEIGHT }}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 ring-1 ring-amber-500/40">
        {isImage ? (
          <img src={imageUrl(logoOrIcon)} alt="" className="h-8 w-8 object-contain" />
        ) : (
          <span className="text-xl font-bold text-amber-400">{product.name?.slice(0, 1) || '?'}</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-lg font-semibold text-white group-hover:text-amber-100">{product.name}</h3>
        {product.tagline && <p className="mt-1 truncate text-sm text-amber-400/90">{product.tagline}</p>}
      </div>
      <svg className="h-5 w-5 shrink-0 text-amber-500/60 group-hover:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}

export default function SystemPipeline() {
  const sectionRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const totalColumnHeight = products.length > 0 ? products.length * (CARD_HEIGHT + CARD_GAP) - CARD_GAP : 500;
  const y = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 0, -totalColumnHeight, -totalColumnHeight]);

  const viewportHeight = 2 * CARD_HEIGHT + 2 * CARD_GAP;
  const columnTopPadding = viewportHeight / 2 - CARD_HEIGHT / 2;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchProducts().then((data) => {
      if (cancelled) return;
      if (Array.isArray(data) && data.length > 0) setProducts(data);
      else setProducts(staticProducts);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  if (loading || products.length === 0) {
    return (
      <section id="pipeline" className="border-t border-amber-500/10 bg-gradient-to-b from-amber-950/25 via-slate-950 to-amber-950/25 py-20">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-20 w-20 animate-pulse rounded-xl bg-amber-500/10" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="pipeline"
      ref={sectionRef}
      className="relative border-t border-amber-500/10 bg-gradient-to-b from-amber-950/25 via-slate-950 via-40% to-amber-950/25"
      style={{ minHeight: '220vh' }}
    >
      <div className="sticky top-0 flex min-h-screen items-center justify-center py-16">
        {/* Vertical gold chain line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-px rounded-full bg-gradient-to-b from-transparent from-0% via-amber-500/60 via-20% via-amber-500/70 via-50% to-transparent to-100%"
          aria-hidden
        />

        {/* Viewport: only one full card visible, half of next and half of previous */}
        <div
          className="relative flex flex-col items-center overflow-hidden"
          style={{ height: viewportHeight, width: '100%', maxWidth: '420px' }}
        >
          <motion.div
            style={{
              y,
              paddingTop: columnTopPadding,
              top: 0,
            }}
            className="absolute left-1/2 flex w-full max-w-[380px] -translate-x-1/2 flex-col items-center px-4 sm:max-w-[420px]"
          >
            <div className="flex flex-col" style={{ gap: CARD_GAP }}>
              {products.map((product) => (
                <div key={product.id ?? product.slug} className="w-full shrink-0">
                  <SystemCard product={product} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
