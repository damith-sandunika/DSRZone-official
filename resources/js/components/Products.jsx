import React, { useEffect, useState } from 'react';
import ScrollReveal from './ScrollReveal';
import ProductCard from './ProductCard';
import { products as staticProducts } from '../data/products';
import { fetchProducts } from '../api/products';

export default function Products() {
    const [products, setProducts] = useState(staticProducts);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetchProducts().then((apiProducts) => {
            if (!cancelled && apiProducts && apiProducts.length > 0) {
                setProducts(apiProducts);
            }
            if (!cancelled) setLoading(false);
        });
        return () => { cancelled = true; };
    }, []);

    return (
        <section id="products" className="py-24 bg-[#0a0c12] border-t border-white/5 relative overflow-hidden">
            <div className="section-grid-pattern" aria-hidden />
            <div className="absolute inset-0 bg-gradient-to-b from-[#f59e0b]/5 via-transparent to-[#f59e0b]/5 pointer-events-none z-0" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <p className="section-label">What We Offer</p>
                        <h2 className="section-title mt-2">
                            <span className="section-title-accent">Products & Solutions</span>
                        </h2>
                        <div className="section-divider" />
                        <p className="section-desc mt-6">
                            IT and graphic solutions tailored for modern businesses
                        </p>
                    </div>
                </ScrollReveal>
                {loading ? (
                    <div className="text-center text-gray-400 py-12">Loading products…</div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {products.map((product, i) => (
                            <ScrollReveal key={product.id ?? product.slug} delay={i * 100}>
                                <ProductCard product={product} />
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
