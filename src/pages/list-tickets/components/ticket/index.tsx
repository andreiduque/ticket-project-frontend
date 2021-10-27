import { TicketTypeEnum } from "enums/ticket-type";
import { TicketEntity } from "hooks/api/types/ticket/ticket-entity";
import { Container } from "./styles";

export const Ticket: FC<{ ticket: TicketEntity }> = ({ ticket }) => {
	const { name, description, type, discountValue, code } = ticket;

	const getValue = () => {
		if (type === TicketTypeEnum.PERCENTAGE) {
			return `${discountValue}%`;
		}

		return Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(discountValue);
	};

	return (
		<Container>
			<span>{name}</span>
			<p>{description}</p>
			<div>
				<span>Código: </span>
				<span>{code}</span>
			</div>
			<div>
				<span>Valor: </span>
				<span>{getValue()}</span>
			</div>
		</Container>
	);
};
