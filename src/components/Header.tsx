'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/about', label: 'About' },
        { href: '/portfolio', label: 'Investment' },
        { href: '/technology', label: 'Technology' },
        { href: '/intelligence', label: 'Insights' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <svg className={styles.logoIcon} viewBox="0 0 60 70" fill="none">
                        {/* Hexagon shape with S */}
                        <path d="M30 2L55 18V52L30 68L5 52V18L30 2Z" fill="#1a1a1a" stroke="#CC0000" strokeWidth="1.5" />
                        <path d="M30 12L48 24V46L30 58L12 46V24L30 12Z" fill="#CC0000" opacity="0.15" />
                        <path d="M30 8L52 22V48L30 62L8 48V22L30 8Z" fill="none" stroke="#333" strokeWidth="0.5" />
                        {/* Red crystal accent */}
                        <path d="M25 20L40 28L35 45L20 50L15 35L25 20Z" fill="#CC0000" opacity="0.8" />
                        <path d="M25 20L40 28L32 35L25 20Z" fill="#E60000" opacity="0.6" />
                        <path d="M32 35L40 28L35 45L32 35Z" fill="#990000" opacity="0.7" />
                    </svg>
                    <span className={styles.logoText}>ZAVISTONE</span>
                </Link>

                {/* Navigation */}
                <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={styles.navLink}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Toggle */}
                <button
                    className={`${styles.menuBtn} ${isMobileMenuOpen ? styles.active : ''}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}
