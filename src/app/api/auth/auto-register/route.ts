// typescript
// src/app/api/auth/auto-register/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const {fullName, departmentName, employeeId} = await req.json();

        // Find or create department
        let departmentId: string | null = null;
        if (departmentName) {
            let dept = await prisma.department.findFirst({where: {name: departmentName}});
            if (!dept) {
                dept = await prisma.department.create({data: {name: departmentName}});
            }
            departmentId = dept.id;
        }

        // Create user
        const user = await prisma.user.create({
            data: {
                fullName,
                employeeId: employeeId || null,
                role: 'ATTENDEE',
                departmentId,
            },
        });

        return NextResponse.json(user, {status: 201});
    } catch (error) {
        console.error('Auto-register error:', error);
        return NextResponse.json({error: 'Failed to register user'}, {status: 500});
    }
}
