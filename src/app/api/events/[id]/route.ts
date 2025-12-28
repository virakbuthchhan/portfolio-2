// src/app/api/events/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const event = await prisma.event.findUnique({
            where: { id },
            include: {
                organizer: { select: { fullName: true, email: true } },
                attendees: {
                    include: { user: { select: { fullName: true, employeeId: true } } },
                },
            },
        });
        if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { title, description, date, location, status } = await req.json();
        const event = await prisma.event.update({
            where: { id },
            data: {
                title,
                description,
                date: date ? new Date(date) : undefined,
                location,
                status,
            },
        });
        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.event.delete({ where: { id } });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
