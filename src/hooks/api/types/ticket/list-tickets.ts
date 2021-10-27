import { TicketEntity } from "./ticket-entity";

export interface ListTicketInput {
	page?: number;
}

export type ListTicketOutput = Array<TicketEntity>;
