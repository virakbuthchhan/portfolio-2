// src/app/api/attendance/event/[eventId]/route.ts
import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ eventId: string }> }
) {
    try {
        const { eventId } = await params;
        const attendees = await prisma.eventAttendee.findMany({
            where: { eventId },
            include: {
                user: {
                    select: {
                        fullName: true,
                        employeeId: true,
                        department: { select: { name: true } },
                    },
                },
            },
            orderBy: { joinedAt: 'asc' },
        });
        return Response.json(attendees);
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'Failed to fetch attendees' }, { status: 500 });
    }
}
