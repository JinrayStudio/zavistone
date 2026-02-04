import Link from 'next/link';
import styles from './ReportCard.module.css';

interface ReportCardProps {
    id: string;
    title: string;
    category: string;
    date: string;
    summary: string;
    isPremium?: boolean;
}

export default function ReportCard({
    id,
    title,
    category,
    date,
    summary,
    isPremium = false
}: ReportCardProps) {
    return (
        <article className={styles.card}>
            <div className={styles.header}>
                <span className={`${styles.category} ${isPremium ? styles.premium : ''}`}>
                    {isPremium && <span className={styles.premiumIcon}>★</span>}
                    {category}
                </span>
                <time className={styles.date}>{date}</time>
            </div>

            <h3 className={styles.title}>
                <Link href={`/intelligence/${id}`}>
                    {title}
                </Link>
            </h3>

            <p className={styles.summary}>{summary}</p>

            <div className={styles.footer}>
                <Link href={`/intelligence/${id}`} className={styles.readMore}>
                    Read Report
                    <span className={styles.arrow}>→</span>
                </Link>
            </div>
        </article>
    );
}
