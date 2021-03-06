import { TicketTypeEnum } from "enums/ticket-type";

export interface TicketEntity {
	id: string;

	code: string;

	name: string;

	description: string;

	type: TicketTypeEnum;

	discountValue: number;

	expirationDate: Date;

	isValid: boolean;
}
