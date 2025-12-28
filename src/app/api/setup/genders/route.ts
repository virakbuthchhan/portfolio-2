// src/app/api/setup/genders/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const items = await prisma.gender.findMany({ orderBy: { name: 'asc' } });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load genders',message:error }, { status: 500 });
    }
}
