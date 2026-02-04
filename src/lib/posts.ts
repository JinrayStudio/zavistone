import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ================================================
// Types
// ================================================
export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    author: string;
    summary: string;
    category?: string;
    classification?: 'CONFIDENTIAL' | 'INTERNAL' | 'PUBLIC';
    reference?: string;
    target?: string;
    executiveSummary?: string;
    keyTakeaways?: string[];
}

export interface Post extends PostMeta {
    content: string;
}

// ================================================
// Paths
// ================================================
const postsDirectory = path.join(process.cwd(), 'content/market-views');

// ================================================
// Get all posts (sorted by date, newest first)
// ================================================
export function getAllPosts(): PostMeta[] {
    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);

    const posts = fileNames
        .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx?$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);

            return {
                slug,
                title: data.title || 'Untitled',
                date: data.date || '',
                author: data.author || 'Zavistone Research',
                summary: data.summary || '',
                category: data.category || 'Research',
                classification: data.classification,
                reference: data.reference,
                target: data.target,
                executiveSummary: data.executiveSummary,
                keyTakeaways: data.keyTakeaways,
            } as PostMeta;
        });

    // Sort by date (newest first)
    return posts.sort((a, b) => {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
    });
}

// ================================================
// Get single post by slug
// ================================================
export function getPostBySlug(slug: string): Post | null {
    const possibleExtensions = ['.mdx', '.md'];

    for (const ext of possibleExtensions) {
        const fullPath = path.join(postsDirectory, `${slug}${ext}`);

        if (fs.existsSync(fullPath)) {
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || 'Untitled',
                date: data.date || '',
                author: data.author || 'Zavistone Research',
                summary: data.summary || '',
                category: data.category || 'Research',
                classification: data.classification,
                reference: data.reference,
                target: data.target,
                executiveSummary: data.executiveSummary,
                keyTakeaways: data.keyTakeaways,
                content,
            };
        }
    }

    return null;
}

// ================================================
// Get all post slugs (for static generation)
// ================================================
export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames
        .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
        .map((fileName) => fileName.replace(/\.mdx?$/, ''));
}

// ================================================
// Format date for display
// ================================================
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    }).toUpperCase();
}
