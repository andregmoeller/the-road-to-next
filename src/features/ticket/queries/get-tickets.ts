import { prisma } from "@/lib/prisma";
import { SearchParams } from "../search-params";

export const getTickets = async (
  userId: string | undefined,
  searchParams: SearchParams
) => {
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
      title: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
