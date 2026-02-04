import Link from 'next/link';
import { getAllPosts, formatDate } from '@/lib/posts';
import styles from './page.module.css';

// ================================================
// Typographic Wordmark Logo - ZAVISTONE. with Red Dot
// ================================================
const Logo = () => (
  <span className={styles.logoMark}>
    ZAVISTONE<span className={styles.redDot}>.</span>
  </span>
);

export default function Home() {
  // Get posts from MDX files
  const posts = getAllPosts();

  return (
    <main className={styles.main}>
      {/* ================================================
          Header - Typographic Logo
          ================================================ */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/" className={styles.logo}>
            <Logo />
          </Link>
          <nav className={styles.nav}>
            <Link href="#firm" className={styles.navLink}>The Firm</Link>
            <Link href="#businesses" className={styles.navLink}>Our Businesses</Link>
            <Link href="#views" className={styles.navLink}>Market Views</Link>
            <Link href="#contact" className={styles.navLink}>Contact</Link>
          </nav>
        </div>
      </header>

      {/* ================================================
          Hero Section
          ================================================ */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>

        {/* 3D Crystal Animation */}
        <div className={styles.crystalContainer}>
          <svg className={styles.crystal} viewBox="0 0 400 500" fill="none">
            <defs>
              <linearGradient id="crystalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#CC0000" />
                <stop offset="50%" stopColor="#990000" />
                <stop offset="100%" stopColor="#660000" />
              </linearGradient>
              <linearGradient id="crystalGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E60000" />
                <stop offset="100%" stopColor="#880000" />
              </linearGradient>
              <linearGradient id="crystalDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#550000" />
                <stop offset="100%" stopColor="#330000" />
              </linearGradient>
              <filter id="crystalGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="20" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Main crystal shape */}
            <polygon
              points="200,30 340,140 300,380 100,380 60,140"
              fill="url(#crystalGrad1)"
              filter="url(#crystalGlow)"
            />

            {/* Crystal facets */}
            <polygon points="200,30 340,140 200,220" fill="url(#crystalGrad2)" opacity="0.9" />
            <polygon points="200,30 60,140 200,220" fill="#AA0000" opacity="0.7" />
            <polygon points="200,220 340,140 300,380" fill="#770000" opacity="0.6" />
            <polygon points="200,220 60,140 100,380" fill="#880000" opacity="0.5" />
            <polygon points="200,220 300,380 100,380" fill="url(#crystalDark)" opacity="0.8" />

            {/* Wireframe overlay */}
            <polygon
              points="200,30 340,140 300,380 100,380 60,140"
              fill="none"
              stroke="rgba(255,80,80,0.3)"
              strokeWidth="1"
            />
            <line x1="200" y1="30" x2="200" y2="220" stroke="rgba(255,80,80,0.2)" strokeWidth="0.5" />
            <line x1="60" y1="140" x2="200" y2="220" stroke="rgba(255,80,80,0.2)" strokeWidth="0.5" />
            <line x1="340" y1="140" x2="200" y2="220" stroke="rgba(255,80,80,0.2)" strokeWidth="0.5" />
            <line x1="100" y1="380" x2="200" y2="220" stroke="rgba(255,80,80,0.2)" strokeWidth="0.5" />
            <line x1="300" y1="380" x2="200" y2="220" stroke="rgba(255,80,80,0.2)" strokeWidth="0.5" />

            {/* Highlight points */}
            <circle cx="200" cy="30" r="3" fill="#FF6666" opacity="0.8" />
            <circle cx="340" cy="140" r="2" fill="#FF4444" opacity="0.5" />
            <circle cx="60" cy="140" r="2" fill="#FF4444" opacity="0.5" />
          </svg>
          <div className={styles.groundGlow}></div>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>BUILDING THE DIGITAL FUTURE.</h1>
          <p className={styles.heroSubtitle}>
            We invest in and operate the infrastructure of the AI economy.
          </p>
        </div>
      </section>

      {/* ================================================
          Section: OUR BUSINESSES
          ================================================ */}
      <section id="businesses" className={styles.businesses}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionLabel}>OUR BUSINESSES</h2>

          <div className={styles.businessGrid}>
            {/* VASO */}
            <div className={styles.businessCard}>
              <span className={styles.businessCategory}>TECHNOLOGY & INNOVATIONS</span>
              <h3 className={styles.businessTitle}>VASO Infrastructure</h3>
              <p className={styles.businessDesc}>
                AI Safety protocols and compliance solutions.
              </p>
            </div>

            {/* Searfit */}
            <div className={styles.businessCard}>
              <span className={styles.businessCategory}>DIGITAL MEDIA</span>
              <h3 className={styles.businessTitle}>Searfit Platform</h3>
              <p className={styles.businessDesc}>
                Lifestyle curation and high-traffic digital real estate, led by Jinray.
              </p>
            </div>

            {/* Strategic Research */}
            <Link href="/market-views/intelligence-standard-2026" className={styles.businessCard}>
              <span className={styles.businessCategory}>STRATEGIC RESEARCH</span>
              <h3 className={styles.businessTitle}>Intelligence Standard Report</h3>
              <p className={styles.businessDesc}>
                The Financialization of Compute: Q1 2026 Strategic Alpha Analysis for Institutional Investors.
              </p>
              <span className={styles.businessLink}>Read Full Report →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================
          Section: MARKET VIEWS (Dynamic from MDX)
          ================================================ */}
      <section id="views" className={styles.views}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionLabel}>MARKET VIEWS</h2>

          <div className={styles.viewsList}>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/market-views/${post.slug}`}
                className={styles.viewRow}
              >
                <span className={styles.viewDate}>{formatDate(post.date)}</span>
                <span className={styles.viewTitle}>{post.title}</span>
                <span className={styles.viewArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          Section: THE FIRM
          ================================================ */}
      <section id="firm" className={styles.firm}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionLabel}>THE FIRM</h2>

          <div className={styles.firmContent}>
            <blockquote className={styles.firmQuote}>
              &ldquo;We deliver value by seeing what others miss. Grounded in First Principles.&rdquo;
            </blockquote>
            <div className={styles.firmSignature}>
              <span className={styles.signatureName}>Steve</span>
              <span className={styles.signatureRole}>Founder & Chairman</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          Footer
          ================================================ */}
      <footer id="contact" className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <Logo />
            <p>Asset Management</p>
          </div>

          <div className={styles.footerContact}>
            <span>Contact</span>
            <a href="mailto:contact@zavistone.com">contact@zavistone.com</a>
          </div>

          <div className={styles.footerCopy}>
            © 2026 Zavistone Asset Management. All Rights Reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
