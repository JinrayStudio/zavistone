import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, getGitHubFiles, createGitHubFile } from '@/lib/admin';

// GET: List all posts
export async function GET(request: NextRequest) {
    const isAuthed = await verifyAuth(request);
    if (!isAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const files = await getGitHubFiles();
        return NextResponse.json({ files });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch posts' },
            { status: 500 }
        );
    }
}

// POST: Create new post
export async function POST(request: NextRequest) {
    const isAuthed = await verifyAuth(request);
    if (!isAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { slug, content } = await request.json();

        if (!slug || !content) {
            return NextResponse.json(
                { error: 'Slug and content are required' },
                { status: 400 }
            );
        }

        await createGitHubFile(slug, content);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to create post' },
            { status: 500 }
        );
    }
}
