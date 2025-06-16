import { initialTickets } from "@/data";
import { Ticket } from "../../../types";

export const getTicket = async (ticketId: string): Promise<Ticket | null> => {
  const maybeTicket = initialTickets.find((ticket) => ticket.id === ticketId);

  return new Promise((resolve) => {
    resolve(maybeTicket || null);
  });
};
