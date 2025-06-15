import { use } from "react";
import { getTickets } from "@/features/queries/get-tickets";
import { TicketItem } from "./ticket-item";

const TicketList = () => {
  const tickets = use(getTickets());

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      {tickets.map((ticket) => (
        <TicketItem key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export { TicketList };
