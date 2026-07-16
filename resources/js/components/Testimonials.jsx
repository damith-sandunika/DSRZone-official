import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../config/axios';
import ScrollReveal from './ScrollReveal';
import { imageUrl } from '../utils/imageUrl';

function StarRating({ value }) {
  const v = Math.min(5, Math.max(0, Number(value) || 0));
  return (
    <div className="flex gap-1" aria-label={`Rating: ${v} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= v ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]' : 'text-white/10'}>
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
    <section id="testimonials" className="py-24 sm:py-32 bg-[#030610] border-t border-white/5 relative overflow-hidden">
      {/* Cyber Background Effects */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-400/5 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-blue-400/90 mb-3">Clients Say</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300">Testimonials</span>
            </h2>
            <p className="mt-6 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              What our clients say about our robust systems and premium support.
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="text-center text-gray-500 py-12 animate-pulse">Loading testimonials…</div>
        ) : testimonials.length > 0 ? (
          <ScrollReveal>
            <div className="relative mx-auto max-w-4xl">
              
              <div className="overflow-hidden rounded-3xl border border-blue-500/20 bg-[#0a0c12]/60 backdrop-blur-xl p-8 md:p-14 min-h-[300px] shadow-2xl relative">
                {/* Large Quote Icon */}
                <div className="absolute top-0 right-6 text-[180px] text-blue-500/5 font-serif leading-none select-none pointer-events-none">
                  "
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col md:flex-row gap-8 items-center md:items-start h-full relative z-10"
                  >
                    {/* Client Info (Left) */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0 md:w-64">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-blue-500/50 bg-[#0a0c12] flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.15)] mb-5 relative group">
                        <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {testimonials[currentIndex].avatar ? (
                          <img src={imageUrl(testimonials[currentIndex].avatar)} alt={testimonials[currentIndex].name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-4xl font-bold text-blue-400">{testimonials[currentIndex].name?.slice(0, 1) || '?'}</span>
                        )}
                      </div>
                      
                      <h3 className="font-extrabold text-white text-xl md:text-2xl mb-1">{testimonials[currentIndex].name}</h3>
                      {testimonials[currentIndex].company && <p className="text-sm font-semibold text-blue-400 mb-1">{testimonials[currentIndex].company}</p>}
                      {testimonials[currentIndex].product_name && <p className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full mt-2">{testimonials[currentIndex].product_name}</p>}
                    </div>

                    {/* Testimonial Content (Right) */}
                    <div className="flex-1 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8">
                      <div className="mb-6">
                        <StarRating value={testimonials[currentIndex].rating} />
                      </div>
                      <p className="text-slate-300 leading-relaxed text-lg sm:text-xl font-medium italic">
                        "{testimonials[currentIndex].testimonial}"
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6 w-12 h-12 rounded-full border border-blue-500/30 bg-[#0a0c12]/90 backdrop-blur-md text-blue-400 flex items-center justify-center hover:bg-blue-500/20 hover:scale-110 transition-all shadow-xl z-20"
                    aria-label="Previous testimonial"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6 w-12 h-12 rounded-full border border-blue-500/30 bg-[#0a0c12]/90 backdrop-blur-md text-blue-400 flex items-center justify-center hover:bg-blue-500/20 hover:scale-110 transition-all shadow-xl z-20"
                    aria-label="Next testimonial"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                  </button>
                  
                  <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCurrentIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]' : 'w-2 bg-blue-500/20 hover:bg-blue-500/50'}`}
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
            <p className="text-slate-500 bg-white/5 rounded-2xl inline-block px-6 py-4">No testimonials yet. Be the first to leave a review.</p>
          </div>
        )}

        <ScrollReveal>
          <div className="text-center mt-12">
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center gap-3 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-semibold px-8 py-3.5 hover:bg-blue-600/20 hover:border-blue-400 transition-all shadow-[0_0_20px_rgba(59,130,246,0.1)] hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Review
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-blue-500/20 bg-[#0a0c12] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 flex items-center justify-between border-b border-white/5 bg-[#0a0c12]/95 backdrop-blur-md px-6 py-5 z-10">
                <h3 className="text-xl font-bold text-white">Add Review</h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6 sm:p-8">
                {status.message && (
                  <div
                    className={`mb-6 p-4 rounded-xl text-sm font-medium ${
                      status.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}
                  >
                    {status.message}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="tm-name" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Name *</label>
                      <input id="tm-name" name="name" value={formData.name} onChange={handleChange} required className="input-professional bg-white/5 border-white/10 text-white rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="tm-product" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Product name</label>
                      <input id="tm-product" name="product_name" value={formData.product_name} onChange={handleChange} className="input-professional bg-white/5 border-white/10 text-white rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20" placeholder="e.g. Smarty Menu" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="tm-company" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Company</label>
                      <input id="tm-company" name="company" value={formData.company} onChange={handleChange} className="input-professional bg-white/5 border-white/10 text-white rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20" placeholder="Company name" />
                    </div>
                    <div>
                      <label htmlFor="tm-contact" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Contact</label>
                      <input id="tm-contact" name="contact_details" value={formData.contact_details} onChange={handleChange} className="input-professional bg-white/5 border-white/10 text-white rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20" placeholder="Email or phone" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="tm-review" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Your review *</label>
                    <textarea id="tm-review" name="testimonial" value={formData.testimonial} onChange={handleChange} required rows={4} className="input-professional bg-white/5 border-white/10 text-white rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20 resize-none" placeholder="Share your experience..." />
                  </div>
                  <div className="flex flex-wrap items-center gap-5">
                    <div>
                      <label htmlFor="tm-rating" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Rating (1–5)</label>
                      <input id="tm-rating" name="rating" type="number" min={1} max={5} value={formData.rating} onChange={handleChange} className="input-professional bg-white/5 border-white/10 text-white rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20 w-24 text-center" />
                    </div>
                    <div className="flex-1 min-w-[180px]">
                      <label htmlFor="testimonial-avatar-modal" className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Profile photo</label>
                      <input id="testimonial-avatar-modal" type="file" accept="image/jpeg,image/png,image/jpg,image/gif,image/webp" onChange={handleAvatarChange} className="w-full text-sm text-slate-400 file:mr-3 file:rounded-xl file:border-0 file:bg-blue-500/10 file:px-4 file:py-2 file:text-blue-400 file:font-semibold hover:file:bg-blue-500/20 transition-all cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4 mt-4 border-t border-white/5">
                    <button type="button" onClick={closeModal} className="flex-1 rounded-xl border border-white/10 px-4 py-3.5 text-slate-300 font-semibold hover:bg-white/5 transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={submitting} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl py-3.5 shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                      {submitting ? 'Submitting…' : 'Submit Review'}
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
