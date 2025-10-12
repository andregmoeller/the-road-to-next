import { hash } from '@node-rs/argon2';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = [
  {
    username: "admin",
    email: "admin@admin.com",
    password: "adminadmin",
    tickets: [
      {
        title: "Ticket 1",
        content: "First ticket from DB.",
        status: "DONE" as const,
        deadline: new Date().toISOString().split("T")[0],
        bounty: 499,
      },
      {
        title: "Ticket 2",
        content: "Second ticket from DB.",
        status: "OPEN" as const,
        deadline: new Date().toISOString().split("T")[0],
        bounty: 399,
      },
    ],
  },
  {
    username: "user",
    email: "user@user.com",
    password: "useruser",
    tickets: [
      {
        title: "Ticket 3",
        content: "Third ticket from DB.",
        status: "IN_PROGRESS" as const,
        deadline: new Date().toISOString().split("T")[0],
        bounty: 599,
      },
    ],
  },
];

async function seed() {
  console.log("DB Seed: Started…");
  const t0 = performance.now();

  try {
    console.log("-> Deleting existing data...");
    await prisma.session.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.user.deleteMany();
    console.log("-> Existing data deleted.");
    
    console.log("-> Creating new users and their tickets...");
    for (const userData of seedData) {
      const passwordHash = await hash(userData.password);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { tickets, password, ...user } = userData;

      await prisma.user.create({
        data: {
          ...user,
          passwordHash,
          tickets: {
            create: tickets,
          },
        },
      });
    }
    console.log("-> New data created successfully.");

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    const t1 = performance.now();
    console.log(`DB Seed: Finished (${Math.round(t1 - t0)}ms)`);
  }
}

seed();
