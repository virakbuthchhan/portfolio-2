import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding...');

    // ────────────────────────────────────────
    // 1. DATA SETUP
    // ────────────────────────────────────────

    // Genders
    const male = await prisma.gender.upsert({
        where: { name: 'Male' },
        update: {},
        create: { name: 'Male' },
    });
    const female = await prisma.gender.upsert({
        where: { name: 'Female' },
        update: {},
        create: { name: 'Female' },
    });
    const other = await prisma.gender.upsert({
        where: { name: 'Other' },
        update: {},
        create: { name: 'Other' },
    });

    // Positions
    const manager = await prisma.position.upsert({
        where: { name: 'Manager' },
        update: {},
        create: { name: 'Manager' },
    });
    const developer = await prisma.position.upsert({
        where: { name: 'Software Developer' },
        update: {},
        create: { name: 'Software Developer' },
    });
    const designer = await prisma.position.upsert({
        where: { name: 'UI/UX Designer' },
        update: {},
        create: { name: 'UI/UX Designer' },
    });

    // Departments
    const it = await prisma.department.upsert({
        where: { name: 'Information Technology' },
        update: {},
        create: { name: 'Information Technology' },
    });
    const hr = await prisma.department.upsert({
        where: { name: 'Human Resources' },
        update: {},
        create: { name: 'Human Resources' },
    });
    const finance = await prisma.department.upsert({
        where: { name: 'Finance' },
        update: {},
        create: { name: 'Finance' },
    });

    // Organizations
    const org = await prisma.organization.upsert({
        where: { name: 'Digital Solutions Co.' },
        update: {},
        create: { name: 'Digital Solutions Co.' },
    });

    // ────────────────────────────────────────
    // 2. USERS
    // ────────────────────────────────────────

    // Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@company.com' },
        update: {},
        create: {
            email: 'admin@company.com',
            fullName: 'Admin User',
            employeeId: 'ADM001',
            role: 'ADMIN',
            genderId: male.id,
            positionId: manager.id,
            departmentId: it.id,
            organizationId: org.id,
        },
    });

    // Attendees
    const users = await Promise.all([
        prisma.user.upsert({
            where: { email: 'sokha@company.com' },
            update: {},
            create: {
                email: 'sokha@company.com',
                fullName: 'Sokha Lim',
                employeeId: 'IT001',
                role: 'ATTENDEE',
                genderId: female.id,
                positionId: developer.id,
                departmentId: it.id,
                organizationId: org.id,
            },
        }),
        prisma.user.upsert({
            where: { email: 'vireak@company.com' },
            update: {},
            create: {
                email: 'vireak@company.com',
                fullName: 'Vireak Buth',
                employeeId: 'IT002',
                role: 'ATTENDEE',
                genderId: male.id,
                positionId: developer.id,
                departmentId: it.id,
                organizationId: org.id,
            },
        }),
        prisma.user.upsert({
            where: { email: 'mony@company.com' },
            update: {},
            create: {
                email: 'mony@company.com',
                fullName: 'Mony Keo',
                employeeId: 'HR001',
                role: 'ATTENDEE',
                genderId: female.id,
                positionId: manager.id,
                departmentId: hr.id,
                organizationId: org.id,
            },
        }),
        prisma.user.upsert({
            where: { email: 'dara@company.com' },
            update: {},
            create: {
                email: 'dara@company.com',
                fullName: 'Dara Seng',
                employeeId: 'FIN001',
                role: 'ATTENDEE',
                genderId: male.id,
                positionId: manager.id,
                departmentId: finance.id,
                organizationId: org.id,
            },
        }),
        prisma.user.upsert({
            where: { email: 'sreyneath@company.com' },
            update: {},
            create: {
                email: 'sreyneath@company.com',
                fullName: 'Sreyneath Chheang',
                employeeId: 'IT003',
                role: 'ATTENDEE',
                genderId: female.id,
                positionId: designer.id,
                departmentId: it.id,
                organizationId: org.id,
            },
        }),
    ]);

    // ────────────────────────────────────────
    // 3. EVENT TEMPLATES
    // ────────────────────────────────────────

    const weeklySync = await prisma.eventTemplate.upsert({
        where: { name: 'Weekly Team Sync' },
        update: {},
        create: {
            name: 'Weekly Team Sync',
            defaultTitle: 'Weekly Team Sync',
            defaultLocation: 'Conference Room A',
            description: 'Regular team alignment meeting',
            departmentId: it.id,
        },
    });

    // ────────────────────────────────────────
    // 4. EVENTS
    // ────────────────────────────────────────

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const nextWeek = new Date(now);
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(14, 0, 0, 0);

    // Public Event
    const publicEvent = await prisma.event.create({
        data: {
            code: "MPWT-001",
            title: 'Company-Wide Town Hall',
            description: 'Open to all employees',
            date: nextWeek,
            location: 'Main Auditorium',
            visibility: 'PUBLIC',
            status: 'ACTIVE',
            organizerId: admin.id,
            departmentId: null, // public = no department
        },
    });

    // Private Event
    const privateEvent = await prisma.event.create({
        data: {
            code: "MPWT-002",
            title: 'IT Department Planning',
            description: 'Q4 roadmap discussion',
            date: tomorrow,
            location: 'IT Meeting Room',
            visibility: 'PRIVATE',
            status: 'ACTIVE',
            organizerId: admin.id,
            departmentId: it.id,
            templateId: weeklySync.id,
        },
    });

    // Invite IT team to private event
    const itUsers = users.slice(0, 3); // first 3 are IT
    await prisma.eventAttendee.createMany({
        data: itUsers.map(user => ({
            userId: user.id,
            eventId: privateEvent.id,
            isInvited: true,
            status: 'PENDING',
        })),
    });

    console.log('✅ Seeding completed!');
    console.log(`🔑 Admin email: admin@company.com`);
    console.log(`📅 Public event ID: ${publicEvent.id}`);
    console.log(`🔒 Private event ID: ${privateEvent.id} (invited: IT team)`);
}

main()
    .catch(e => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
