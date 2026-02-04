'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './ReportLayout.module.css';

// ================================================
// Types
// ================================================
export interface ReportData {
    title: string;
    date: string;
    author: string;
    classification?: 'CONFIDENTIAL' | 'INTERNAL' | 'PUBLIC';
    reference?: string;
    target?: string;
    category?: string;
    executiveSummary?: string;
    keyTakeaways?: string[];
    content: string;
}

interface TableOfContentsItem {
    id: string;
    title: string;
    level: number;
}

// ================================================
// Generate Table of Contents
// ================================================
function generateTOC(content: string): TableOfContentsItem[] {
    const toc: TableOfContentsItem[] = [];
    const lines = content.split('\n');

    for (const line of lines) {
        const h2Match = line.match(/^## (.+)/);
        if (h2Match) {
            const title = h2Match[1].trim();
            toc.push({
                id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                title: title.replace(/^[IVX]+\.\s*/, ''),
                level: 2,
            });
        }
    }

    return toc;
}

// ================================================
// Render Full Content as Continuous Document
// ================================================
function renderContent(content: string) {
    const elements: React.ReactNode[] = [];
    const lines = content.split('\n');
    let currentParagraph: string[] = [];
    let sectionIndex = 0;

    const flushParagraph = () => {
        if (currentParagraph.length > 0) {
            const text = currentParagraph.join(' ').trim();
            if (text) {
                const htmlContent = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                elements.push(
                    <p key={`p-${elements.length}`} dangerouslySetInnerHTML={{ __html: htmlContent }} />
                );
            }
            currentParagraph = [];
        }
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Skip horizontal rules
        if (trimmed === '---') {
            flushParagraph();
            continue;
        }

        // Handle h2 headings
        if (trimmed.startsWith('## ')) {
            flushParagraph();
            const title = trimmed.replace('## ', '');
            const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            sectionIndex++;
            elements.push(
                <h2 key={`h2-${i}`} id={id} data-section={id} className={styles.contentH2}>
                    {title}
                </h2>
            );
            continue;
        }

        // Handle h3 headings
        if (trimmed.startsWith('### ')) {
            flushParagraph();
            elements.push(
                <h3 key={`h3-${i}`} className={styles.contentH3}>
                    {trimmed.replace('### ', '')}
                </h3>
            );
            continue;
        }

        // Handle bullet lists
        if (trimmed.startsWith('- ')) {
            flushParagraph();
            const listItems: string[] = [trimmed];
            while (i + 1 < lines.length && lines[i + 1].trim().startsWith('- ')) {
                i++;
                listItems.push(lines[i].trim());
            }
            elements.push(
                <ul key={`ul-${i}`} className={styles.contentList}>
                    {listItems.map((item, idx) => {
                        const content = item.replace('- ', '').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                        return <li key={idx} dangerouslySetInnerHTML={{ __html: content }} />;
                    })}
                </ul>
            );
            continue;
        }

        // Handle blockquotes
        if (trimmed.startsWith('> ')) {
            flushParagraph();
            const quoteLines: string[] = [trimmed];
            while (i + 1 < lines.length && lines[i + 1].trim().startsWith('> ')) {
                i++;
                quoteLines.push(lines[i].trim());
            }
            const quoteText = quoteLines.map(l => l.replace(/^>\s*/, '')).join(' ');
            const htmlContent = quoteText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            elements.push(
                <blockquote key={`quote-${i}`} className={styles.contentBlockquote} dangerouslySetInnerHTML={{ __html: htmlContent }} />
            );
            continue;
        }

        // Empty line = new paragraph
        if (trimmed === '') {
            flushParagraph();
            continue;
        }

        // Accumulate paragraph text
        currentParagraph.push(trimmed);
    }

    flushParagraph();
    return elements;
}

// ================================================
// Main Component
// ================================================
export default function ReportLayout({ report }: { report: ReportData }) {
    const [activeSection, setActiveSection] = useState<string>('');
    const toc = generateTOC(report.content);

    useEffect(() => {
        const handleScroll = () => {
            const sectionElements = document.querySelectorAll('[data-section]');
            let currentActive = '';

            sectionElements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 200) {
                    currentActive = el.getAttribute('data-section') || '';
                }
            });

            setActiveSection(currentActive);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.querySelector(`[data-section="${id}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <main className={styles.main}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <Link href="/" className={styles.logo}>
                        ZAVISTONE<span className={styles.redDot}>.</span>
                    </Link>
                    <Link href="/#views" className={styles.backLink}>
                        ← Back to Market Views
                    </Link>
                </div>
            </header>

            {/* Document Header */}
            <section className={styles.documentHeader}>
                <div className={styles.documentContainer}>
                    {/* Classification & Reference */}
                    <div className={styles.documentMeta}>
                        {report.classification && (
                            <span className={`${styles.classification} ${styles[report.classification.toLowerCase()]}`}>
                                {report.classification}
                            </span>
                        )}
                        {report.reference && (
                            <span className={styles.reference}>{report.reference}</span>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className={styles.documentTitle}>STRATEGIC INTELLIGENCE REPORT</h1>
                    <h2 className={styles.documentSubtitle}>{report.title}</h2>

                    {/* Document Info Grid */}
                    <div className={styles.documentInfo}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>DATE</span>
                            <span className={styles.infoValue}>{report.date}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>PREPARED BY</span>
                            <span className={styles.infoValue}>{report.author}</span>
                        </div>
                        {report.target && (
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>TARGET</span>
                                <span className={styles.infoValue}>{report.target}</span>
                            </div>
                        )}
                        {report.category && (
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>CLASSIFICATION</span>
                                <span className={styles.infoValue}>{report.category}</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className={styles.layout}>
                {/* Article - Continuous Document */}
                <article className={styles.article}>
                    {/* Executive Summary */}
                    {report.executiveSummary && (
                        <div className={styles.executiveSummary}>
                            <h3 className={styles.summaryTitle}>EXECUTIVE SUMMARY</h3>
                            <p className={styles.summaryText}>{report.executiveSummary}</p>
                            {report.keyTakeaways && report.keyTakeaways.length > 0 && (
                                <div className={styles.keyTakeaways}>
                                    {report.keyTakeaways.map((item, i) => (
                                        <span key={i} className={styles.takeawayBadge}>{item}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Continuous Content */}
                    <div className={styles.content}>
                        {renderContent(report.content)}
                    </div>
                </article>

                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    {/* Table of Contents */}
                    <div className={styles.sidebarCard}>
                        <h4 className={styles.sidebarTitle}>CONTENTS</h4>
                        <nav className={styles.tocNav}>
                            {toc.map((item, index) => (
                                <button
                                    key={index}
                                    className={`${styles.tocItem} ${activeSection === item.id ? styles.active : ''}`}
                                    onClick={() => scrollToSection(item.id)}
                                >
                                    <span className={styles.tocNumber}>{String(index + 1).padStart(2, '0')}</span>
                                    <span className={styles.tocText}>{item.title}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Key Insights */}
                    <div className={styles.sidebarCard}>
                        <h4 className={styles.sidebarTitle}>KEY INSIGHTS</h4>
                        <ul className={styles.insightsList}>
                            <li>Intelligence-Compute Production Model</li>
                            <li>Compute as Sovereign Asset Class</li>
                            <li>Premium of Sovereignty in AI</li>
                            <li>Post-Quantum Cryptography Required</li>
                        </ul>
                    </div>

                    {/* Related Assets */}
                    <div className={styles.sidebarCard}>
                        <h4 className={styles.sidebarTitle}>RELATED ASSETS</h4>
                        <Link href="/market-views/vaso-infrastructure" className={styles.relatedAsset}>
                            <span>VASO</span>
                            <p>AI Safety Infrastructure</p>
                        </Link>
                        <Link href="/market-views/searfit-platform" className={styles.relatedAsset}>
                            <span>Searfit</span>
                            <p>Digital Media Platform</p>
                        </Link>
                    </div>
                </aside>
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContainer}>
                    <p className={styles.disclaimer}>
                        This document is for informational purposes only and does not constitute investment advice.
                        Past performance is not indicative of future results.
                    </p>
                    <p className={styles.copyright}>
                        © 2026 Zavistone Asset Management. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </main>
    );
}
