import { NextRequest, NextResponse } from 'next/server';
import { createSession, getSessionCookie } from '@/lib/admin';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'zavistone2026';

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }

        const token = createSession();
        const response = NextResponse.json({ success: true });
        response.cookies.set(getSessionCookie(token));

        return response;
    } catch {
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
