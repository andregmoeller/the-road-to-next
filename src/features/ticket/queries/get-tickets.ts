import { prisma } from "@/lib/prisma";

export const getTickets = async (userId: string | undefined) => {
  return await prisma.ticket.findMany({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
