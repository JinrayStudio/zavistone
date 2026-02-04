import styles from './ProjectCard.module.css';

interface ProjectCardProps {
    name: string;
    description: string;
    tags: string[];
    status: 'Active' | 'Completed' | 'In Development';
    year: string;
    color?: string;
}

export default function ProjectCard({
    name,
    description,
    tags,
    status,
    year,
    color = '#CC0000'
}: ProjectCardProps) {
    const getStatusClass = () => {
        switch (status) {
            case 'Active': return styles.statusActive;
            case 'Completed': return styles.statusCompleted;
            case 'In Development': return styles.statusDev;
            default: return '';
        }
    };

    return (
        <article className={styles.card}>
            {/* Visual Element */}
            <div className={styles.visual} style={{ '--project-color': color } as React.CSSProperties}>
                <div className={styles.icon}>
                    <span className={styles.initial}>{name.charAt(0)}</span>
                </div>
                <div className={styles.gradient}></div>
            </div>

            {/* Content */}
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.name}>{name}</h3>
                    <span className={`${styles.status} ${getStatusClass()}`}>
                        {status}
                    </span>
                </div>

                <p className={styles.description}>{description}</p>

                <div className={styles.tags}>
                    {tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                </div>

                <div className={styles.footer}>
                    <span className={styles.year}>Est. {year}</span>
                    <a href="#" className={styles.link}>
                        Learn More
                        <span className={styles.arrow}>→</span>
                    </a>
                </div>
            </div>
        </article>
    );
}
