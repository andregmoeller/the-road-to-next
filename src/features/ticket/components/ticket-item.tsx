import clsx from "clsx";
import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ticketPath } from "@/paths";
import { Ticket } from "../../../types";
import { TICKET_ICONS } from "../constants";

type TicketItemProps = {
    ticket: Ticket;
    isDetail?: boolean;
};

const TicketItem = ({ ticket, isDetail }: TicketItemProps ) => {
  const detailButton = (
    <Button variant="outline" size="icon" asChild>
      <Link href={ticketPath(ticket.id)}>
        <LucideSquareArrowOutUpRight className="h-4 w-4" />
      </Link>
    </Button>
  );

  return (
    <div className={clsx("w-full flex gap-x-1", {
          "max-w-[580px]": isDetail,
          "max-w-[420px]": !isDetail,
        })}>
      <Card className="w-full">
         <CardHeader>
          <CardTitle className="flex gap-x-2">
          <span>{TICKET_ICONS[ticket.status]}</span>
          <h3 className="truncate">{ticket.title}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className={clsx("whitespace-break-spaces", {
            "line-clamp-3": !isDetail,
          })}>
            {ticket.content}
          </span>
        </CardContent>
      </Card>
      {isDetail ? null : (
        <div className="flex flex-col gap-y-1">{detailButton}</div>
      )}
    </div>
  );
};

export { TicketItem };
