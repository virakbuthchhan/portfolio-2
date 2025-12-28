// src/app/api/setup/positions/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const items = await prisma.position.findMany({ orderBy: { name: 'asc' } });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load positions',message:error }, { status: 500 });
    }
}
