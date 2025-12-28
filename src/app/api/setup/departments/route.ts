// src/app/api/setup/departments/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const items = await prisma.department.findMany({ orderBy: { name: 'asc' } });
        return NextResponse.json(items);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to load departments' }, { status: 500 });
    }
}
