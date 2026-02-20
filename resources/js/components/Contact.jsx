import React, { useState } from 'react';
import axios from '../config/axios';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });
        try {
            const response = await axios.post('/api/v1/contact', formData);
            setStatus({ type: 'success', message: response.data.message || 'Thank you! Your message has been sent.' });
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            if (error.response?.data?.errors) {
                setStatus({ type: 'error', message: Object.values(error.response.data.errors).flat().join(', ') });
            } else {
                setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-[#0a0c12] border-t border-white/5 relative overflow-hidden">
            <div className="section-grid-pattern" aria-hidden />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12">
                    <p className="section-label">Get In Touch</p>
                    <h2 className="section-title mt-2">
                        <span className="section-title-accent">Contact Us</span>
                    </h2>
                    <div className="section-divider" />
                    <p className="section-desc mt-6">
                        Have a project in mind? We’d love to hear from you.
                    </p>
                </div>

                <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-8 md:p-10">
                    {status.message && (
                        <div
                            className={`mb-6 p-4 rounded-lg text-sm ${
                                status.type === 'success'
                                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                            }`}
                        >
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="input-professional"
                                    placeholder="Your name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="input-professional"
                                    placeholder="you@company.com"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input-professional"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="input-professional"
                                    placeholder="Project inquiry"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="input-professional resize-none"
                                placeholder="Tell us about your project..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;
