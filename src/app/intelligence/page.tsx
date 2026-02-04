import ReportCard from '@/components/ReportCard';
import styles from './page.module.css';

// Sample report data
const reports = [
    {
        id: 'digital-asset-outlook-2024',
        title: 'Digital Asset Outlook: Navigating the 2024 Landscape',
        category: 'Market Analysis',
        date: 'Jan 15, 2024',
        summary: 'A comprehensive analysis of emerging trends in digital assets, including institutional adoption patterns and regulatory developments across major markets.',
        isPremium: true,
    },
    {
        id: 'ai-infrastructure-investment',
        title: 'AI Infrastructure: The Hidden Investment Opportunity',
        category: 'Sector Deep Dive',
        date: 'Jan 8, 2024',
        summary: 'Exploring the critical infrastructure layer powering the AI revolution—from data centers to specialized semiconductors.',
        isPremium: true,
    },
    {
        id: 'emerging-market-fintech',
        title: 'Emerging Market Fintech: Southeast Asia Focus',
        category: 'Regional Report',
        date: 'Dec 20, 2023',
        summary: 'Analysis of fintech adoption and investment opportunities across Southeast Asian markets, with spotlight on Indonesia and Vietnam.',
        isPremium: false,
    },
    {
        id: 'sustainable-investing-framework',
        title: 'Building a Sustainable Investing Framework',
        category: 'Strategy',
        date: 'Dec 12, 2023',
        summary: 'Our proprietary framework for evaluating ESG factors in portfolio construction without sacrificing returns.',
        isPremium: false,
    },
    {
        id: 'defi-protocols-analysis',
        title: 'DeFi Protocols: Risk Assessment Methodology',
        category: 'Technical Analysis',
        date: 'Nov 28, 2023',
        summary: 'A rigorous approach to evaluating decentralized finance protocols, including smart contract risk, liquidity analysis, and governance structures.',
        isPremium: true,
    },
    {
        id: 'macro-outlook-q1-2024',
        title: 'Macro Outlook Q1 2024: Rates, Inflation, and Growth',
        category: 'Macro',
        date: 'Nov 15, 2023',
        summary: 'Quarterly macroeconomic outlook examining the interplay between central bank policy, inflation trends, and global growth prospects.',
        isPremium: false,
    },
];

const categories = ['All', 'Market Analysis', 'Sector Deep Dive', 'Regional Report', 'Strategy', 'Technical Analysis', 'Macro'];

export default function IntelligencePage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Intelligence</h1>
                    <p className={styles.subtitle}>
                        Premium research and analysis for discerning investors
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className={styles.filters}>
                <div className={styles.container}>
                    <div className={styles.categoryList}>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`${styles.categoryBtn} ${category === 'All' ? styles.active : ''}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reports Grid */}
            <section className={styles.reports}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {reports.map((report) => (
                            <ReportCard key={report.id} {...report} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Unlock Premium Insights</h2>
                        <p className={styles.ctaText}>
                            Get exclusive access to our full research library and real-time market intelligence.
                        </p>
                        <a href="/contact" className={styles.ctaBtn}>Request Access</a>
                    </div>
                </div>
            </section>
        </div>
    );
}
