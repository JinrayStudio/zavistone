import ProjectCard from '@/components/ProjectCard';
import styles from './page.module.css';

// Portfolio projects data
const projects = [
    {
        name: 'Searfit',
        description: 'AI-powered fitness platform revolutionizing personalized workout experiences. Leveraging computer vision and machine learning to deliver real-time form correction and adaptive training programs.',
        tags: ['AI/ML', 'Fitness Tech', 'Computer Vision', 'B2C'],
        status: 'Active' as const,
        year: '2023',
        color: '#0088CC',
    },
    {
        name: 'VASO',
        description: 'Enterprise evidence management and verification system. Streamlining compliance workflows with blockchain-backed authenticity proofs and automated audit trails.',
        tags: ['Enterprise SaaS', 'Compliance', 'Blockchain', 'B2B'],
        status: 'Active' as const,
        year: '2024',
        color: '#CC0000',
    },
    {
        name: 'QuantumEdge',
        description: 'Next-generation algorithmic trading infrastructure optimized for high-frequency markets. Proprietary latency optimization achieving sub-microsecond execution times.',
        tags: ['FinTech', 'Trading', 'Infrastructure', 'Institutional'],
        status: 'In Development' as const,
        year: '2024',
        color: '#00CC88',
    },
    {
        name: 'NeuraBridge',
        description: 'Brain-computer interface research lab focused on non-invasive neural signal processing for consumer applications in focus enhancement and meditation.',
        tags: ['Neurotech', 'Research', 'Consumer', 'Healthcare'],
        status: 'In Development' as const,
        year: '2024',
        color: '#8844CC',
    },
];

export default function PortfolioPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Portfolio</h1>
                    <p className={styles.subtitle}>
                        Strategic investments in transformative technology ventures
                    </p>
                </div>
            </section>

            {/* Investment Thesis */}
            <section className={styles.thesis}>
                <div className={styles.container}>
                    <div className={styles.thesisContent}>
                        <h2 className={styles.thesisTitle}>Our Investment Thesis</h2>
                        <p className={styles.thesisText}>
                            We identify and partner with exceptional founders building category-defining
                            companies at the intersection of technology and human potential. Our focus
                            areas include artificial intelligence, financial infrastructure, and
                            emerging frontier technologies.
                        </p>
                        <div className={styles.focusAreas}>
                            <div className={styles.focusArea}>
                                <span className={styles.focusIcon}>◈</span>
                                <h3>Artificial Intelligence</h3>
                                <p>Infrastructure, applications, and vertical solutions</p>
                            </div>
                            <div className={styles.focusArea}>
                                <span className={styles.focusIcon}>◈</span>
                                <h3>Financial Infrastructure</h3>
                                <p>Payment systems, trading technology, and DeFi</p>
                            </div>
                            <div className={styles.focusArea}>
                                <span className={styles.focusIcon}>◈</span>
                                <h3>Frontier Tech</h3>
                                <p>Biotech, neurotech, and emerging platforms</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className={styles.projects}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Portfolio Companies</h2>
                    <div className={styles.grid}>
                        {projects.map((project) => (
                            <ProjectCard key={project.name} {...project} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Partnership CTA */}
            <section className={styles.partnership}>
                <div className={styles.container}>
                    <div className={styles.partnerContent}>
                        <h2 className={styles.partnerTitle}>Building Something Exceptional?</h2>
                        <p className={styles.partnerText}>
                            We're always looking to connect with visionary founders.
                            If you're building in our focus areas, let's talk.
                        </p>
                        <a href="/contact" className={styles.partnerBtn}>
                            Get in Touch
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
