'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

interface Post {
    name: string;
    path: string;
    sha: string;
}

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                setIsLoggedIn(true);
                fetchPosts();
            } else {
                setError('잘못된 비밀번호입니다.');
            }
        } catch {
            setError('로그인 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/posts');
            if (res.ok) {
                const data = await res.json();
                setPosts(data.files || []);
            } else if (res.status === 401) {
                setIsLoggedIn(false);
            } else {
                const data = await res.json();
                setError(data.error || '글 목록을 불러오는데 실패했습니다.');
            }
        } catch {
            setError('글 목록을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (post: Post) => {
        if (deleteConfirm !== post.name) {
            setDeleteConfirm(post.name);
            return;
        }

        setLoading(true);
        const slug = post.name.replace(/\.(mdx?|md)$/, '');

        try {
            const res = await fetch(`/api/admin/posts/${slug}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sha: post.sha }),
            });

            if (res.ok) {
                setPosts(posts.filter(p => p.name !== post.name));
                setDeleteConfirm(null);
            } else {
                const data = await res.json();
                setError(data.error || '삭제에 실패했습니다.');
            }
        } catch {
            setError('삭제 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check if already logged in
        fetch('/api/admin/posts').then(res => {
            if (res.ok) {
                setIsLoggedIn(true);
                fetchPosts();
            }
        });
    }, []);

    if (!isLoggedIn) {
        return (
            <main className={styles.main}>
                <div className={styles.loginContainer}>
                    <div className={styles.loginBox}>
                        <h1 className={styles.loginTitle}>
                            ZAVISTONE<span className={styles.redDot}>.</span>
                        </h1>
                        <p className={styles.loginSubtitle}>Admin Access</p>

                        <form onSubmit={handleLogin} className={styles.loginForm}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호 입력"
                                className={styles.passwordInput}
                                autoFocus
                            />
                            <button
                                type="submit"
                                className={styles.loginBtn}
                                disabled={loading}
                            >
                                {loading ? '로그인 중...' : '로그인'}
                            </button>
                        </form>

                        {error && <p className={styles.error}>{error}</p>}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <Link href="/" className={styles.logo}>
                        ZAVISTONE<span className={styles.redDot}>.</span>
                    </Link>
                    <span className={styles.headerTitle}>Content Manager</span>
                </div>
            </header>

            <div className={styles.container}>
                <div className={styles.titleRow}>
                    <h1 className={styles.title}>글 관리</h1>
                    <Link href="/admin/upload" className={styles.newBtn}>
                        + 새 글 작성
                    </Link>
                </div>

                {error && <p className={styles.error}>{error}</p>}

                {loading ? (
                    <div className={styles.loading}>불러오는 중...</div>
                ) : posts.length === 0 ? (
                    <div className={styles.empty}>
                        <p>등록된 글이 없습니다.</p>
                        <Link href="/admin/upload" className={styles.newBtn}>
                            첫 글 작성하기
                        </Link>
                    </div>
                ) : (
                    <div className={styles.postList}>
                        {posts.map((post) => {
                            const slug = post.name.replace(/\.(mdx?|md)$/, '');
                            return (
                                <div key={post.name} className={styles.postItem}>
                                    <div className={styles.postInfo}>
                                        <span className={styles.postName}>{post.name}</span>
                                        <Link
                                            href={`/market-views/${slug}`}
                                            className={styles.viewLink}
                                            target="_blank"
                                        >
                                            보기 ↗
                                        </Link>
                                    </div>
                                    <div className={styles.postActions}>
                                        <Link
                                            href={`/admin/edit/${slug}`}
                                            className={styles.editBtn}
                                        >
                                            수정
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post)}
                                            className={`${styles.deleteBtn} ${deleteConfirm === post.name ? styles.confirm : ''}`}
                                        >
                                            {deleteConfirm === post.name ? '확인' : '삭제'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}
