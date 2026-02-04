'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function UploadPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        author: 'Zavistone Research',
        category: 'Research',
        classification: 'INTERNAL',
        reference: '',
        target: 'Strategic Partners & Investors',
        executiveSummary: '',
        keyTakeaways: '',
        content: ''
    });
    const [publishing, setPublishing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        // Check if logged in
        fetch('/api/admin/posts').then(res => {
            setIsLoggedIn(res.ok);
            if (!res.ok) {
                router.push('/admin');
            }
        });
    }, [router]);

    const generateSlug = () => {
        return formData.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .substring(0, 60);
    };

    const generateReference = () => {
        const year = new Date().getFullYear();
        const num = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
        setFormData(prev => ({ ...prev, reference: `ZAV-${year}-${num}` }));
    };

    const generateMDX = () => {
        const keyTakeaways = formData.keyTakeaways
            ? formData.keyTakeaways.split('\n').filter(line => line.trim())
            : [];

        return `---
title: "${formData.title.replace(/"/g, '\\"')}"
date: "${formData.date}"
author: "${formData.author}"
summary: "${(formData.executiveSummary || formData.title).substring(0, 200).replace(/"/g, '\\"')}"
category: "${formData.category}"
classification: "${formData.classification}"
reference: "${formData.reference}"
target: "${formData.target}"
executiveSummary: "${formData.executiveSummary.replace(/"/g, '\\"').replace(/\n/g, ' ')}"
keyTakeaways:
${keyTakeaways.map(item => `  - "${item.trim().replace(/"/g, '\\"')}"`).join('\n')}
---

${formData.content}
`;
    };

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.content.trim()) {
            setError('제목과 내용은 필수입니다.');
            return;
        }

        setPublishing(true);
        setError('');

        try {
            const slug = generateSlug();
            const content = generateMDX();

            const res = await fetch('/api/admin/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug, content }),
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                const data = await res.json();
                setError(data.error || '게시에 실패했습니다.');
            }
        } catch {
            setError('게시 중 오류가 발생했습니다.');
        } finally {
            setPublishing(false);
        }
    };

    const handleNewPost = () => {
        setFormData({
            title: '',
            date: new Date().toISOString().split('T')[0],
            author: 'Zavistone Research',
            category: 'Research',
            classification: 'INTERNAL',
            reference: '',
            target: 'Strategic Partners & Investors',
            executiveSummary: '',
            keyTakeaways: '',
            content: ''
        });
        setSuccess(false);
        setError('');
    };

    if (isLoggedIn === null) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <p style={{ textAlign: 'center', color: '#666' }}>Loading...</p>
                </div>
            </main>
        );
    }

    if (success) {
        return (
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.headerContainer}>
                        <Link href="/" className={styles.logo}>
                            ZAVISTONE<span className={styles.redDot}>.</span>
                        </Link>
                        <span className={styles.headerTitle}>Content Generator</span>
                    </div>
                </header>

                <div className={styles.container}>
                    <div className={styles.successBox}>
                        <h2>✓ 게시 완료!</h2>
                        <p style={{ color: '#9CA3AF', marginBottom: '1.5rem' }}>
                            글이 GitHub에 커밋되었습니다. Vercel에서 자동으로 배포됩니다.
                        </p>
                        <div className={styles.successActions}>
                            <Link
                                href={`/market-views/${generateSlug()}`}
                                className={styles.primaryBtn}
                                target="_blank"
                            >
                                글 보기 ↗
                            </Link>
                            <button onClick={handleNewPost} className={styles.secondaryBtn}>
                                새 글 작성
                            </button>
                            <Link href="/admin" className={styles.secondaryBtn}>
                                관리자로 돌아가기
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <Link href="/admin" className={styles.logo}>
                        ZAVISTONE<span className={styles.redDot}>.</span>
                    </Link>
                    <span className={styles.headerTitle}>새 글 작성</span>
                </div>
            </header>

            <div className={styles.container}>
                <h1 className={styles.title}>새 리포트 작성</h1>

                {error && <div className={styles.errorBox}>{error}</div>}

                <form onSubmit={handlePublish} className={styles.form}>
                    {/* Metadata Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Document Metadata</h2>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Report title..."
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Date</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Author</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Classification</label>
                                <select
                                    value={formData.classification}
                                    onChange={e => setFormData(prev => ({ ...prev, classification: e.target.value }))}
                                >
                                    <option value="CONFIDENTIAL">CONFIDENTIAL</option>
                                    <option value="INTERNAL">INTERNAL</option>
                                    <option value="PUBLIC">PUBLIC</option>
                                </select>
                            </div>
                            <div className={styles.field}>
                                <label>Reference</label>
                                <div className={styles.inputWithButton}>
                                    <input
                                        type="text"
                                        value={formData.reference}
                                        onChange={e => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                                        placeholder="ZAV-2026-001"
                                    />
                                    <button type="button" onClick={generateReference} className={styles.genBtn}>
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Target Audience</label>
                                <input
                                    type="text"
                                    value={formData.target}
                                    onChange={e => setFormData(prev => ({ ...prev, target: e.target.value }))}
                                />
                            </div>
                        </div>
                    </section>

                    {/* Summary Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Executive Summary</h2>

                        <div className={styles.field}>
                            <label>Summary</label>
                            <textarea
                                value={formData.executiveSummary}
                                onChange={e => setFormData(prev => ({ ...prev, executiveSummary: e.target.value }))}
                                placeholder="Brief executive summary..."
                                rows={3}
                            />
                        </div>

                        <div className={styles.field}>
                            <label>Key Takeaways (one per line)</label>
                            <textarea
                                value={formData.keyTakeaways}
                                onChange={e => setFormData(prev => ({ ...prev, keyTakeaways: e.target.value }))}
                                placeholder="Key point 1&#10;Key point 2&#10;Key point 3"
                                rows={4}
                            />
                        </div>
                    </section>

                    {/* Content Section */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Report Content</h2>
                        <p className={styles.hint}>
                            Use Markdown: ## for sections, ### for subsections, - for bullet points
                        </p>

                        <div className={styles.field}>
                            <textarea
                                value={formData.content}
                                onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                placeholder="## I. First Section&#10;&#10;Content here...&#10;&#10;## II. Second Section&#10;&#10;More content..."
                                rows={16}
                                className={styles.contentEditor}
                                required
                            />
                        </div>
                    </section>

                    <button type="submit" className={styles.submitBtn} disabled={publishing}>
                        {publishing ? '게시 중...' : '🚀 GitHub에 게시'}
                    </button>
                </form>
            </div>
        </main>
    );
}
