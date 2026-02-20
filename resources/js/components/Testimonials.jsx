import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../config/axios';
import ScrollReveal from './ScrollReveal';
import { imageUrl } from '../utils/imageUrl';

function StarRating({ value }) {
  const v = Math.min(5, Math.max(0, Number(value) || 0));
  return (
    <div className="flex gap-0.5" aria-label={`Rating: ${v} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= v ? 'text-amber-400' : 'text-white/20'}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
        </span>
      ))}
    </div>
  );
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    product_name: '',
    company: '',
    contact_details: '',
    testimonial: '',
    rating: 5,
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const total = testimonials.length;
  const canGoPrev = total > 1;
  const canGoNext = total > 1;

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i <= 0 ? total - 1 : i - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i >= total - 1 ? 0 : i + 1));
  }, [total]);

  useEffect(() => {
    axios.get('/api/v1/testimonials').then((res) => setTestimonials(Array.isArray(res.data) ? res.data : [])).catch(() => setTestimonials([])).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (total <= 1) return;
    const t = setInterval(goNext, 5000);
    return () => clearInterval(t);
  }, [total, goNext]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'rating' ? parseInt(value, 10) || 5 : value }));
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files?.[0] || null);
  };

  const openModal = () => {
    setModalOpen(true);
    setStatus({ type: '', message: '' });
    setFormData({ name: '', product_name: '', company: '', contact_details: '', testimonial: '', rating: 5 });
    setAvatarFile(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    const input = document.getElementById('testimonial-avatar-modal');
    if (input) input.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const body = new FormData();
      body.append('name', formData.name);
      body.append('testimonial', formData.testimonial);
      body.append('rating', formData.rating);
      if (formData.product_name) body.append('product_name', formData.product_name);
      if (formData.company) body.append('company', formData.company);
      if (formData.contact_details) body.append('contact_details', formData.contact_details);
      if (avatarFile) body.append('avatar', avatarFile);

      const response = await axios.post('/api/v1/testimonials', body, {
        headers: { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' },
      });
      setStatus({ type: 'success', message: response.data.message || 'Thank you! Your review will appear after approval.' });
      setFormData({ name: '', product_name: '', company: '', contact_details: '', testimonial: '', rating: 5 });
      setAvatarFile(null);
      const input = document.getElementById('testimonial-avatar-modal');
      if (input) input.value = '';
      setTimeout(closeModal, 2000);
    } catch (error) {
      const msg = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(', ')
        : error.response?.data?.message || 'Something went wrong. Please try again.';
      setStatus({ type: 'error', message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-24 border-t border-white/5 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: 'url(/images/2.jpg)' }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#0a0c12]/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/10 via-transparent to-amber-950/10 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="section-label">Clients Say</p>
            <h2 className="section-title mt-2">
              <span className="section-title-accent">Testimonials</span>
            </h2>
            <div className="section-divider" />
            <p className="section-desc mt-6">
              What our clients say about our systems and support
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="text-center text-gray-500 py-12">Loading testimonials…</div>
        ) : testimonials.length > 0 ? (
          <ScrollReveal>
            <div className="relative mx-auto max-w-3xl">
              <div className="overflow-hidden rounded-2xl border border-amber-500/20 bg-white/[0.02] p-8 md:p-10 min-h-[280px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-start gap-5 mb-5">
                      <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-amber-500/30 bg-white/5 flex items-center justify-center">
                        {testimonials[currentIndex].avatar ? (
                          <img src={imageUrl(testimonials[currentIndex].avatar)} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl font-bold text-amber-400">{testimonials[currentIndex].name?.slice(0, 1) || '?'}</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white text-lg">{testimonials[currentIndex].name}</h3>
                        {testimonials[currentIndex].product_name && <p className="text-sm text-amber-400/90">{testimonials[currentIndex].product_name}</p>}
                        {testimonials[currentIndex].company && <p className="text-sm text-gray-500">{testimonials[currentIndex].company}</p>}
                        {testimonials[currentIndex].contact_details && <p className="text-xs text-gray-500 mt-0.5 truncate">{testimonials[currentIndex].contact_details}</p>}
                      </div>
                    </div>
                    <p className="text-gray-400 leading-relaxed flex-1 mb-5 text-lg">"{testimonials[currentIndex].testimonial}"</p>
                    <StarRating value={testimonials[currentIndex].rating} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full border border-amber-500/40 bg-slate-900/90 text-amber-400 flex items-center justify-center hover:bg-amber-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    aria-label="Previous testimonial"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full border border-amber-500/40 bg-slate-900/90 text-amber-400 flex items-center justify-center hover:bg-amber-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    aria-label="Next testimonial"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                  <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrentIndex(i)}
                        className={`h-2 rounded-full transition-all ${i === currentIndex ? 'w-6 bg-amber-500' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                        aria-label={`Go to testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </ScrollReveal>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No testimonials yet. Be the first to leave a review.</p>
          </div>
        )}

        <ScrollReveal>
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={openModal}
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add review
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Popup modal for Add review */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-amber-500/30 bg-[#0a0c12] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#0a0c12]/95 px-6 py-4 z-10">
                <h3 className="text-xl font-semibold text-white">Add review</h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6">
                {status.message && (
                  <div
                    className={`mb-4 p-3 rounded-lg text-sm ${
                      status.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}
                  >
                    {status.message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="tm-name" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Name *</label>
                      <input id="tm-name" name="name" value={formData.name} onChange={handleChange} required className="input-professional" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="tm-product" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Product name</label>
                      <input id="tm-product" name="product_name" value={formData.product_name} onChange={handleChange} className="input-professional" placeholder="e.g. Smarty Menu" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="tm-company" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Company</label>
                      <input id="tm-company" name="company" value={formData.company} onChange={handleChange} className="input-professional" placeholder="Company name" />
                    </div>
                    <div>
                      <label htmlFor="tm-contact" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Contact (email or phone)</label>
                      <input id="tm-contact" name="contact_details" value={formData.contact_details} onChange={handleChange} className="input-professional" placeholder="Email or phone" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="tm-review" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Your review *</label>
                    <textarea id="tm-review" name="testimonial" value={formData.testimonial} onChange={handleChange} required rows={4} className="input-professional resize-none" placeholder="Share your experience..." />
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <label htmlFor="tm-rating" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Rating (1–5)</label>
                      <input id="tm-rating" name="rating" type="number" min={1} max={5} value={formData.rating} onChange={handleChange} className="input-professional w-20" />
                    </div>
                    <div className="flex-1 min-w-[180px]">
                      <label htmlFor="testimonial-avatar-modal" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Profile photo (optional)</label>
                      <input id="testimonial-avatar-modal" type="file" accept="image/jpeg,image/png,image/jpg,image/gif,image/webp" onChange={handleAvatarChange} className="w-full text-sm text-gray-400 file:mr-2 file:rounded file:border-0 file:bg-amber-500/20 file:px-3 file:py-1.5 file:text-amber-400" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="flex-1 rounded-lg border border-white/20 px-4 py-3 text-gray-300 hover:bg-white/5 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={submitting} className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                      {submitting ? 'Submitting…' : 'Submit review'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Testimonials;
