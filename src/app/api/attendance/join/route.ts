// typescript
// src/app/api/attendance/join/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const {eventId, userId, fullName, departmentName} = await req.json();

        const event = await prisma.event.findUnique({
            where: {id: eventId},
            include: {attendees: true},
        });
        if (!event) return NextResponse.json({error: 'Event not found'}, {status: 404});

        let user;

        if (userId) {
            user = await prisma.user.findUnique({where: {id: userId}});
            if (!user) return NextResponse.json({error: 'User not found'}, {status: 404});
        } else {
            // Auto-register public attendee
            const existing = await prisma.user.findFirst({
                where: {fullName, role: 'ATTENDEE'},
            });
            if (existing) {
                user = existing;
            } else {
                let departmentId: string | null = null;
                if (departmentName) {
                    const dept = await prisma.department.findFirst({where: {name: departmentName}});
                    departmentId = dept?.id ?? null;
                }
                user = await prisma.user.create({
                    data: {
                        fullName,
                        role: 'ATTENDEE',
                        departmentId,
                    },
                });
            }
        }

        // Check private event access
        if (event.visibility === 'PRIVATE') {
            const isInvited = event.attendees.some(a => a.userId === user.id && a.isInvited);
            if (!isInvited) {
                return NextResponse.json({error: 'You are not invited to this meeting'}, {status: 403});
            }
        }

        // Upsert attendance
        const attendance = await prisma.eventAttendee.upsert({
            where: {userId_eventId: {userId: user.id, eventId}},
            update: {status: 'PRESENT', joinedAt: new Date(), signature: 'confirmed'},
            create: {
                userId: user.id,
                eventId,
                status: 'PRESENT',
                joinedAt: new Date(),
                signature: 'confirmed',
                isInvited: event.visibility === 'PRIVATE',
            },
        });

        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || null;

        await prisma.activityLog.create({
            data: {
                action: 'attendance.confirmed',
                userId: user.id,
                eventId,
                details: {ip},
            },
        });

        return NextResponse.json(attendance, {status: 201});
    } catch (error) {
        console.error('Join error:', error);
        return NextResponse.json({error: 'Failed to join meeting'}, {status: 500});
    }
}
