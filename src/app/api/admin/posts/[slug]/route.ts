import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, getGitHubFile, updateGitHubFile, deleteGitHubFile } from '@/lib/admin';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// GET: Get single post
export async function GET(request: NextRequest, { params }: RouteParams) {
    const isAuthed = await verifyAuth(request);
    if (!isAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { slug } = await params;
        const file = await getGitHubFile(slug);

        if (!file) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(file);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to fetch post' },
            { status: 500 }
        );
    }
}

// PUT: Update post
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const isAuthed = await verifyAuth(request);
    if (!isAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { slug } = await params;
        const { content, sha } = await request.json();

        if (!content || !sha) {
            return NextResponse.json(
                { error: 'Content and SHA are required' },
                { status: 400 }
            );
        }

        await updateGitHubFile(slug, content, sha);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to update post' },
            { status: 500 }
        );
    }
}

// DELETE: Delete post
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const isAuthed = await verifyAuth(request);
    if (!isAuthed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { slug } = await params;
        const { sha } = await request.json();

        if (!sha) {
            return NextResponse.json({ error: 'SHA is required' }, { status: 400 });
        }

        await deleteGitHubFile(slug, sha);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to delete post' },
            { status: 500 }
        );
    }
}
