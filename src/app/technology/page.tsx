import styles from './page.module.css';

export default function TechnologyPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Technology</h1>
                    <p className={styles.subtitle}>
                        Advanced systems powering next-generation investment intelligence
                    </p>
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className={styles.section}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Our Technology Stack</h2>
                    <div className={styles.techGrid}>
                        <div className={styles.techCard}>
                            <div className={styles.techIcon}>
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="#CC0000" strokeWidth="2" fill="none" />
                                    <circle cx="24" cy="24" r="8" fill="#CC0000" opacity="0.6" />
                                </svg>
                            </div>
                            <h3>AI-Powered Analysis</h3>
                            <p>Machine learning models for market prediction and sentiment analysis across global markets.</p>
                        </div>
                        <div className={styles.techCard}>
                            <div className={styles.techIcon}>
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="8" y="8" width="32" height="32" stroke="#CC0000" strokeWidth="2" fill="none" />
                                    <rect x="16" y="16" width="16" height="16" fill="#CC0000" opacity="0.6" />
                                </svg>
                            </div>
                            <h3>Blockchain Verification</h3>
                            <p>Immutable audit trails and cryptographic proofs for investment documentation.</p>
                        </div>
                        <div className={styles.techCard}>
                            <div className={styles.techIcon}>
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="24" cy="24" r="20" stroke="#CC0000" strokeWidth="2" fill="none" />
                                    <path d="M12 24H36M24 12V36" stroke="#CC0000" strokeWidth="2" />
                                </svg>
                            </div>
                            <h3>Real-time Data</h3>
                            <p>Sub-millisecond data processing for timely market insights and alerts.</p>
                        </div>
                        <div className={styles.techCard}>
                            <div className={styles.techIcon}>
                                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 24L16 12V20H32V12L44 24L32 36V28H16V36L4 24Z" fill="#CC0000" opacity="0.6" />
                                </svg>
                            </div>
                            <h3>Secure Infrastructure</h3>
                            <p>Enterprise-grade security with multi-layer encryption and access controls.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Capabilities Section */}
            <section className={styles.capSection}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Capabilities</h2>
                    <div className={styles.capList}>
                        <div className={styles.capItem}>
                            <span className={styles.capNumber}>01</span>
                            <div className={styles.capContent}>
                                <h3>Quantitative Research</h3>
                                <p>Statistical modeling and algorithmic strategies for portfolio optimization.</p>
                            </div>
                        </div>
                        <div className={styles.capItem}>
                            <span className={styles.capNumber}>02</span>
                            <div className={styles.capContent}>
                                <h3>Alternative Data</h3>
                                <p>Satellite imagery, social sentiment, and non-traditional data sources.</p>
                            </div>
                        </div>
                        <div className={styles.capItem}>
                            <span className={styles.capNumber}>03</span>
                            <div className={styles.capContent}>
                                <h3>Risk Management</h3>
                                <p>Real-time risk monitoring and automated hedging strategies.</p>
                            </div>
                        </div>
                        <div className={styles.capItem}>
                            <span className={styles.capNumber}>04</span>
                            <div className={styles.capContent}>
                                <h3>Compliance Automation</h3>
                                <p>Automated regulatory reporting and audit trail generation.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
