import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            {/* Background gradient effects */}
            <div className={styles.bgGradient}></div>
            <div className={styles.bgGlow}></div>

            {/* 3D Crystal Visual - Inspired by brand identity */}
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

                {/* Ground reflection glow */}
                <div className={styles.groundGlow}></div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                {/* Left - Brand */}
                <div className={styles.brandSection}>
                    <h1 className={styles.brandName}>ZAVISTONE</h1>
                    <p className={styles.brandSub}>ZAVISTONE CAPITAL</p>
                </div>

                {/* Right - CEO & Tagline */}
                <div className={styles.infoSection}>
                    <div className={styles.ceoInfo}>
                        <span className={styles.ceoName}>Steve</span>
                        <span className={styles.ceoTitle}>Chairman & CEO</span>
                    </div>
                    <h2 className={styles.tagline}>DECODING REALITY, HARDENING VALUE</h2>
                    <a href="/contact" className={styles.ctaButton}>REQUEST ACCESS</a>
                </div>
            </div>
        </section>
    );
}
