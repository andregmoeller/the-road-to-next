import { initialTickets } from "@/data"
import { Ticket } from "../../types";

export const getTickets = async (): Promise<Ticket[]> => {
  return new Promise((resolve) => {
    resolve(initialTickets);
  });
};
