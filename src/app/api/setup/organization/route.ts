// src/app/api/setup/organizations/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const items = await prisma.organization.findMany({ orderBy: { name: 'asc' } });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load organizations',message:error }, { status: 500 });
    }
}
