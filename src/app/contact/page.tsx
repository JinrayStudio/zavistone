'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission (Netlify Forms will handle this in production)
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Contact</h1>
                    <p className={styles.subtitle}>
                        Connect with our team for investment inquiries and partnership opportunities
                    </p>
                </div>
            </section>

            {/* Contact Form */}
            <section className={styles.formSection}>
                <div className={styles.container}>
                    <div className={styles.formWrapper}>
                        {isSubmitted ? (
                            <div className={styles.success}>
                                <div className={styles.successIcon}>✓</div>
                                <h2 className={styles.successTitle}>Message Sent</h2>
                                <p className={styles.successText}>
                                    Thank you for reaching out. Our team will review your inquiry
                                    and respond within 2-3 business days.
                                </p>
                                <button
                                    className={styles.resetBtn}
                                    onClick={() => {
                                        setIsSubmitted(false);
                                        setFormData({ name: '', email: '', company: '', subject: '', message: '' });
                                    }}
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form
                                className={styles.form}
                                onSubmit={handleSubmit}
                                name="contact"
                                method="POST"
                                data-netlify="true"
                                netlify-honeypot="bot-field"
                            >
                                {/* Netlify hidden fields */}
                                <input type="hidden" name="form-name" value="contact" />
                                <p className={styles.hidden}>
                                    <label>Don't fill this out: <input name="bot-field" /></label>
                                </p>

                                <div className={styles.formGrid}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name" className={styles.label}>Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className={styles.input}
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="email" className={styles.label}>Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className={styles.input}
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="company" className={styles.label}>Company</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className={styles.input}
                                            placeholder="Your company name"
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="subject" className={styles.label}>Subject *</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className={styles.select}
                                        >
                                            <option value="">Select an inquiry type</option>
                                            <option value="investment">Investment Inquiry</option>
                                            <option value="partnership">Partnership Opportunity</option>
                                            <option value="intelligence">Intelligence Access</option>
                                            <option value="media">Media Inquiry</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="message" className={styles.label}>Message *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className={styles.textarea}
                                        placeholder="Tell us about your inquiry..."
                                        rows={6}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={styles.submitBtn}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className={styles.info}>
                        <div className={styles.infoCard}>
                            <h3 className={styles.infoTitle}>Headquarters</h3>
                            <p className={styles.infoText}>
                                Seoul, South Korea<br />
                                Gangnam District
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3 className={styles.infoTitle}>Email</h3>
                            <p className={styles.infoText}>
                                <a href="mailto:contact@zavistone.com">contact@zavistone.com</a>
                            </p>
                        </div>
                        <div className={styles.infoCard}>
                            <h3 className={styles.infoTitle}>Response Time</h3>
                            <p className={styles.infoText}>
                                2-3 Business Days
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
