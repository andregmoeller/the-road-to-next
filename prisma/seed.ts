import { hash } from "@node-rs/argon2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const usersData = [
  {
    username: "admin",
    email: "admin@admin.com",
    password: "adminadmin",
  },
  {
    username: "user",
    email: "user@user.com",
    password: "useruser",
  },
];

const ticketsData = [
  {
    assigneeUsername: "admin",
    title: "Ticket 1",
    content: "First ticket from DB.",
    status: "DONE" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 499,
  },
  {
    assigneeUsername: "admin",
    title: "Ticket 2",
    content: "Second ticket from DB.",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399,
  },
  {
    assigneeUsername: "user",
    title: "Ticket 3",
    content: "Third ticket from DB.",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 599,
  },
];

const commentsData = [
  {
    authorUsername: "user",
    ticketTitle: "Ticket 1",
    content: "First comment from DB.",
  },
  {
    authorUsername: "user",
    ticketTitle: "Ticket 1",
    content: "Second comment from DB.",
  },
  {
    authorUsername: "admin",
    ticketTitle: "Ticket 3",
    content: "Third comment from DB.",
  },
];

const seed = async () => {
  console.log("DB Seed: Started…");
  const t0 = performance.now();

  try {
    console.log("-> Deleting existing data...");
    await prisma.comment.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.session.deleteMany();
    await prisma.user.deleteMany();
    console.log("-> Existing data deleted.");

    console.log("-> Creating users...");
    const usersToCreate = await Promise.all(
      usersData.map(async (user) => {
        const passwordHash = await hash(user.password);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        return {
          ...rest,
          passwordHash,
        };
      })
    );

    const dbUsers = await prisma.user.createManyAndReturn({
      data: usersToCreate,
    });
    console.log(`-> ${dbUsers.length} users created.`);

    const userMap = new Map(dbUsers.map((user) => [user.username, user.id]));

    console.log("-> Creating tickets...");
    const ticketsToCreate = ticketsData.map((ticket) => {
      const { assigneeUsername, ...rest } = ticket;
      const userId = userMap.get(assigneeUsername);

      if (!userId) {
        throw new Error(
          `Seed Error: User '${assigneeUsername}' not found for ticket '${ticket.title}'.`
        );
      }

      return {
        ...rest,
        userId: userId,
      };
    });

    const dbTickets = await prisma.ticket.createManyAndReturn({
      data: ticketsToCreate,
    });
    console.log(`-> ${dbTickets.length} tickets created.`);

    const ticketMap = new Map(
      dbTickets.map((ticket) => [ticket.title, ticket.id])
    );

    console.log("-> Creating comments...");
    const commentsToCreate = commentsData.map((comment) => {
      const { authorUsername, ticketTitle, ...rest } = comment;

      const userId = userMap.get(authorUsername);
      const ticketId = ticketMap.get(ticketTitle);

      if (!userId) {
        throw new Error(
          `Seed Error: User '${authorUsername}' not found for comment.`
        );
      }
      if (!ticketId) {
        throw new Error(
          `Seed Error: Ticket '${ticketTitle}' not found for comment.`
        );
      }

      return {
        ...rest,
        userId: userId,
        ticketId: ticketId,
      };
    });

    await prisma.comment.createMany({
      data: commentsToCreate,
    });
    console.log(`-> ${commentsToCreate.length} comments created.`);
  } catch (e) {
    console.error("Seed Error:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    const t1 = performance.now();
    console.log(`DB Seed: Finished (${Math.round(t1 - t0)}ms)`);
  }
};

seed();
