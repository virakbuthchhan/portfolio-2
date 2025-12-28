// typescript
// src/app/api/events/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const {
            title,
            description,
            date,
            location,
            visibility,
            organizerId,
            departmentId,
            templateId,
        } = await req.json();

        const organizer = await prisma.user.findUnique({where: {id: organizerId}});
        if (!organizer) {
            return NextResponse.json({error: 'Organizer not found'}, {status: 404});
        }

        // Generate unique event code
        const code = `EVT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        const event = await prisma.event.create({
            data: {
                code,
                title,
                description,
                date: new Date(date),
                location,
                visibility,
                status: 'ACTIVE',
                organizerId,
                departmentId: departmentId || null,
                templateId: templateId || null,
            },
        });

        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || null;

        await prisma.activityLog.create({
            data: {
                action: 'event.created',
                userId: organizerId,
                eventId: event.id,
                details: {ip},
            },
        });

        return NextResponse.json(event, {status: 201});
    } catch (error) {
        console.error('Create event error:', error);
        return NextResponse.json({error: 'Failed to create event'}, {status: 500});
    }
}

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            include: {
                organizer: {select: {fullName: true}},
                _count: {select: {attendees: true}},
            },
            orderBy: {date: 'desc'},
        });
        return NextResponse.json(events);
    } catch (error) {
        return NextResponse.json({error: error}, {status: 500});
    }
}
