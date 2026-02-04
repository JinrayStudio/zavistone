'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../../upload/page.module.css';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default function EditPage({ params }: PageProps) {
    const { slug } = use(params);
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        author: '',
        category: '',
        classification: 'INTERNAL',
        reference: '',
        target: '',
        executiveSummary: '',
        keyTakeaways: '',
        content: ''
    });
    const [sha, setSha] = useState('');
    const [loading, setLoading] = useState(true);
    const [publishing, setPublishing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/admin/posts/${slug}`);

                if (res.status === 401) {
                    router.push('/admin');
                    return;
                }

                if (!res.ok) {
                    setError('글을 찾을 수 없습니다.');
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setSha(data.sha);

                // Parse MDX frontmatter
                const content = data.content;
                const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

                if (frontmatterMatch) {
                    const frontmatter = frontmatterMatch[1];
                    const body = frontmatterMatch[2].trim();

                    // Parse frontmatter fields
                    const getValue = (key: string) => {
                        const match = frontmatter.match(new RegExp(`^${key}:\\s*"?([^"\\n]*)"?`, 'm'));
                        return match ? match[1] : '';
                    };

                    // Parse keyTakeaways array
                    const keyTakeawaysMatch = frontmatter.match(/keyTakeaways:\n([\s\S]*?)(?=\n\w|$)/);
                    let keyTakeaways = '';
                    if (keyTakeawaysMatch) {
                        const itemPattern = /- "([^"]+)"/g;
                        const matches: string[] = [];
                        let match;
                        while ((match = itemPattern.exec(keyTakeawaysMatch[1])) !== null) {
                            matches.push(match[1]);
                        }
                        keyTakeaways = matches.join('\n');
                    }

                    setFormData({
                        title: getValue('title'),
                        date: getValue('date'),
                        author: getValue('author'),
                        category: getValue('category'),
                        classification: getValue('classification') || 'INTERNAL',
                        reference: getValue('reference'),
                        target: getValue('target'),
                        executiveSummary: getValue('executiveSummary'),
                        keyTakeaways,
                        content: body
                    });
                }
            } catch {
                setError('글을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug, router]);

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

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.content.trim()) {
            setError('제목과 내용은 필수입니다.');
            return;
        }

        setPublishing(true);
        setError('');

        try {
            const content = generateMDX();

            const res = await fetch(`/api/admin/posts/${slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, sha }),
            });

            if (res.ok) {
                setSuccess(true);
            } else {
                const data = await res.json();
                setError(data.error || '수정에 실패했습니다.');
            }
        } catch {
            setError('수정 중 오류가 발생했습니다.');
        } finally {
            setPublishing(false);
        }
    };

    if (loading) {
        return (
            <main className={styles.main}>
                <div className={styles.container}>
                    <p style={{ textAlign: 'center', color: '#666', paddingTop: '4rem' }}>불러오는 중...</p>
                </div>
            </main>
        );
    }

    if (success) {
        return (
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.headerContainer}>
                        <Link href="/admin" className={styles.logo}>
                            ZAVISTONE<span className={styles.redDot}>.</span>
                        </Link>
                        <span className={styles.headerTitle}>글 수정</span>
                    </div>
                </header>

                <div className={styles.container}>
                    <div className={styles.successBox}>
                        <h2>✓ 수정 완료!</h2>
                        <p style={{ color: '#9CA3AF', marginBottom: '1.5rem' }}>
                            변경사항이 GitHub에 커밋되었습니다. Vercel에서 자동으로 배포됩니다.
                        </p>
                        <div className={styles.successActions}>
                            <Link
                                href={`/market-views/${slug}`}
                                className={styles.primaryBtn}
                                target="_blank"
                            >
                                글 보기 ↗
                            </Link>
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
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <Link href="/admin" className={styles.logo}>
                        ZAVISTONE<span className={styles.redDot}>.</span>
                    </Link>
                    <span className={styles.headerTitle}>글 수정: {slug}</span>
                </div>
            </header>

            <div className={styles.container}>
                <h1 className={styles.title}>리포트 수정</h1>

                {error && <div className={styles.errorBox}>{error}</div>}

                <form onSubmit={handleUpdate} className={styles.form}>
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
                                <input
                                    type="text"
                                    value={formData.reference}
                                    onChange={e => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                                    placeholder="ZAV-2026-001"
                                />
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
                                placeholder="## I. First Section&#10;&#10;Content here..."
                                rows={16}
                                className={styles.contentEditor}
                                required
                            />
                        </div>
                    </section>

                    <button type="submit" className={styles.submitBtn} disabled={publishing}>
                        {publishing ? '저장 중...' : '💾 변경사항 저장'}
                    </button>
                </form>
            </div>
        </main>
    );
}
