import { NextRequest, NextResponse } from 'next/server';

// Simple password-based authentication
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'zavistone2026';
const SESSION_COOKIE = 'admin_session';

export async function verifyAuth(request: NextRequest): Promise<boolean> {
    const session = request.cookies.get(SESSION_COOKIE);
    if (!session) return false;

    // Simple token verification
    try {
        const decoded = Buffer.from(session.value, 'base64').toString();
        const [password, timestamp] = decoded.split(':');
        const sessionTime = parseInt(timestamp);
        const now = Date.now();

        // Session valid for 24 hours
        if (password === ADMIN_PASSWORD && (now - sessionTime) < 24 * 60 * 60 * 1000) {
            return true;
        }
    } catch {
        return false;
    }

    return false;
}

export function createSession(): string {
    const token = Buffer.from(`${ADMIN_PASSWORD}:${Date.now()}`).toString('base64');
    return token;
}

export function getSessionCookie(token: string) {
    return {
        name: SESSION_COOKIE,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
    };
}

// GitHub API helpers
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO; // format: owner/repo
const CONTENT_PATH = 'content/market-views';

interface GitHubFile {
    name: string;
    path: string;
    sha: string;
    content?: string;
}

export async function getGitHubFiles(): Promise<GitHubFile[]> {
    if (!GITHUB_TOKEN || !GITHUB_REPO) {
        throw new Error('GitHub credentials not configured');
    }

    const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}`,
        {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
            cache: 'no-store',
        }
    );

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const files = await response.json();
    return files.filter((f: GitHubFile) => f.name.endsWith('.mdx') || f.name.endsWith('.md'));
}

export async function getGitHubFile(slug: string): Promise<{ content: string; sha: string } | null> {
    if (!GITHUB_TOKEN || !GITHUB_REPO) {
        throw new Error('GitHub credentials not configured');
    }

    const extensions = ['.mdx', '.md'];

    for (const ext of extensions) {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}/${slug}${ext}`,
            {
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json',
                },
                cache: 'no-store',
            }
        );

        if (response.ok) {
            const data = await response.json();
            const content = Buffer.from(data.content, 'base64').toString('utf-8');
            return { content, sha: data.sha };
        }
    }

    return null;
}

export async function createGitHubFile(slug: string, content: string): Promise<void> {
    if (!GITHUB_TOKEN || !GITHUB_REPO) {
        throw new Error('GitHub credentials not configured');
    }

    const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}/${slug}.mdx`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Add post: ${slug}`,
                content: Buffer.from(content).toString('base64'),
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`GitHub API error: ${error.message}`);
    }
}

export async function updateGitHubFile(slug: string, content: string, sha: string): Promise<void> {
    if (!GITHUB_TOKEN || !GITHUB_REPO) {
        throw new Error('GitHub credentials not configured');
    }

    const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}/${slug}.mdx`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Update post: ${slug}`,
                content: Buffer.from(content).toString('base64'),
                sha,
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`GitHub API error: ${error.message}`);
    }
}

export async function deleteGitHubFile(slug: string, sha: string): Promise<void> {
    if (!GITHUB_TOKEN || !GITHUB_REPO) {
        throw new Error('GitHub credentials not configured');
    }

    // Try both extensions
    const extensions = ['.mdx', '.md'];

    for (const ext of extensions) {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}/${slug}${ext}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `Delete post: ${slug}`,
                    sha,
                }),
            }
        );

        if (response.ok) {
            return;
        }
    }

    throw new Error('Failed to delete file');
}
