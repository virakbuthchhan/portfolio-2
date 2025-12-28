// src/app/api/events/[id]/invite/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { userIds } = await req.json(); // array of user IDs

        const event = await prisma.event.findUnique({
            where: { id },
            include: { attendees: true },
        });
        if (!event) return NextResponse.json({ error: 'Event not found' }, { status: 404 });

        if (event.visibility !== 'PRIVATE') {
            return NextResponse.json({ error: 'Only private events support invitations' }, { status: 400 });
        }

        // Get existing invited user IDs
        const existingInvited = new Set(event.attendees.map(a => a.userId));

        const newInvites = userIds
            .filter((id: string) => !existingInvited.has(id))
            .map((userId: string) => ({
                userId,
                eventId: id,
                isInvited: true,
                status: 'PENDING',
            }));

        if (newInvites.length > 0) {
            await prisma.eventAttendee.createMany({ data: newInvites });
        }

        return NextResponse.json({ success: true, invited: newInvites.length });
    } catch (error) {
        console.error('Invite error:', error);
        return NextResponse.json({ error: 'Failed to send invites' }, { status: 500 });
    }
}
