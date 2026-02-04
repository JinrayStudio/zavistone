import styles from './page.module.css';

export default function AboutPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1 className={styles.title}>About</h1>
                    <p className={styles.subtitle}>
                        Pioneering investment strategies for the digital age
                    </p>
                </div>
            </section>

            {/* Vision Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        <div className={styles.content}>
                            <h2 className={styles.sectionTitle}>Our Vision</h2>
                            <p className={styles.text}>
                                Zavistone Capital stands at the intersection of traditional investment
                                wisdom and cutting-edge technology. We believe that the future of
                                wealth creation lies in understanding and leveraging emerging
                                technologies before they become mainstream.
                            </p>
                            <p className={styles.text}>
                                Founded with a singular mission: to decode the complexities of
                                modern markets and harden value for our partners through rigorous
                                analysis and strategic foresight.
                            </p>
                        </div>
                        <div className={styles.stats}>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>2024</span>
                                <span className={styles.statLabel}>Founded</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>$50M+</span>
                                <span className={styles.statLabel}>Assets Analyzed</span>
                            </div>
                            <div className={styles.stat}>
                                <span className={styles.statNumber}>15+</span>
                                <span className={styles.statLabel}>Portfolio Companies</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className={styles.leadershipSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Leadership</h2>
                    <div className={styles.leaderCard}>
                        <div className={styles.leaderInfo}>
                            <h3 className={styles.leaderName}>Steve</h3>
                            <p className={styles.leaderRole}>Chairman & CEO</p>
                            <p className={styles.leaderBio}>
                                With over 15 years of experience in global markets and technology
                                investments, Steve leads Zavistone&apos;s strategic vision and
                                portfolio management. His expertise spans digital assets, AI
                                infrastructure, and emerging market fintech.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Our Principles</h2>
                    <div className={styles.valuesGrid}>
                        <div className={styles.valueCard}>
                            <span className={styles.valueIcon}>◈</span>
                            <h3>Rigorous Analysis</h3>
                            <p>Every investment decision is backed by comprehensive research and data-driven insights.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <span className={styles.valueIcon}>◈</span>
                            <h3>Long-term Vision</h3>
                            <p>We focus on sustainable value creation rather than short-term gains.</p>
                        </div>
                        <div className={styles.valueCard}>
                            <span className={styles.valueIcon}>◈</span>
                            <h3>Technological Edge</h3>
                            <p>Leveraging advanced tools and methodologies to stay ahead of market trends.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
