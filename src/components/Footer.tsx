import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Top Section */}
                <div className={styles.top}>
                    {/* Brand */}
                    <div className={styles.brand}>
                        <svg className={styles.logoIcon} viewBox="0 0 60 70" fill="none">
                            <path d="M30 2L55 18V52L30 68L5 52V18L30 2Z" fill="#111" stroke="#CC0000" strokeWidth="1" />
                            <path d="M25 20L40 28L35 45L20 50L15 35L25 20Z" fill="#CC0000" opacity="0.6" />
                        </svg>
                        <div className={styles.brandText}>
                            <span className={styles.brandName}>ZAVISTONE</span>
                            <span className={styles.brandSub}>ZAVISTONE CAPITAL</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className={styles.nav}>
                        <div className={styles.navGroup}>
                            <h4>Company</h4>
                            <Link href="/about">About</Link>
                            <Link href="/contact">Contact</Link>
                        </div>
                        <div className={styles.navGroup}>
                            <h4>Invest</h4>
                            <Link href="/portfolio">Investment</Link>
                            <Link href="/technology">Technology</Link>
                        </div>
                        <div className={styles.navGroup}>
                            <h4>Resources</h4>
                            <Link href="/intelligence">Insights</Link>
                        </div>
                    </nav>
                </div>

                {/* Divider */}
                <div className={styles.divider}></div>

                {/* Bottom Section */}
                <div className={styles.bottom}>
                    <p className={styles.copyright}>
                        © {currentYear} Zavistone Capital. All rights reserved.
                    </p>
                    <p className={styles.tagline}>Decoding Reality, Hardening Value</p>
                </div>
            </div>
        </footer>
    );
}
