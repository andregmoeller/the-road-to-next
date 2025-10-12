import { prisma } from "@/lib/prisma";

export const getTicket = async (id: string) => {
  return await prisma.ticket.findUnique({
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
    where: {
      id,
    },
  });
};
