import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "First ticket from DB.",
    status: "DONE" as const,
  },
  {
    title: "Ticket 2",
    content: "Second ticket from DB.",
    status: "OPEN" as const,
  },
  {
    title: "Ticket 3",
    content: "Third ticket from DB.",
    status: "IN_PROGRESS" as const,
  },
];

async function seed() {
  console.log("DB Seed: Started…");
  const t0 = performance.now();

  try {
    await prisma.ticket.deleteMany();
    await prisma.ticket.createMany({ data: tickets });
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
