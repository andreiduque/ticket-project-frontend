import { TicketTypeEnum } from "enums/ticket-type";
import { TicketEntity } from "./ticket-entity";

export interface CreateTicketInput {
	code?: string;
	name: string;
	description: string;
	type: TicketTypeEnum;
	discountValue: number;
	expirationDate: Date;
}

export type CreateTicketOutput = TicketEntity;
