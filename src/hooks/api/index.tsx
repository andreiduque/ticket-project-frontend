import axios from "axios";
import { useAuthContext } from "context/auth";
import { CountTicketOutput } from "./types/ticket/count-tickets";
import { CreateTicketInput, CreateTicketOutput } from "./types/ticket/create";
import { FindByCodeInput, FindByCodeOutput } from "./types/ticket/find-by-code";
import { ListTicketInput, ListTicketOutput } from "./types/ticket/list-tickets";
import { LoginInput, LoginOutput } from "./types/user/login";
import { RegisterInput, RegisterOutput } from "./types/user/register";

export const useApi = () => {
	const authContext = useAuthContext();

	const instance = axios.create({
		baseURL: "https://andrei-ticket-project.herokuapp.com/",
	});

	const register = (params: RegisterInput) =>
		instance
			.post<RegisterOutput>("/user/register", params)
			.then(result => result.data);

	const login = (params: LoginInput) =>
		instance
			.post<LoginOutput>("/user/login", params)
			.then(result => result.data);

	const countTickets = () =>
		instance
			.get<CountTicketOutput>("/ticket/count-tickets", {
				headers: { authorization: `Bearer ${authContext.token}` },
			})
			.then(result => result.data);

	const listTickets = ({ page }: ListTicketInput) =>
		instance
			.get<ListTicketOutput>(
				`/ticket/list-tickets-by-page?${page ? `page=${page}` : ""}`,
				{
					headers: { authorization: `Bearer ${authContext.token}` },
				},
			)
			.then(result => result.data);

	const findByCode = ({ code }: FindByCodeInput) =>
		instance
			.get<FindByCodeOutput>(`ticket/find-by-code?code=${code}`, {
				headers: { authorization: `Bearer ${authContext.token}` },
			})
			.then(result => result.data);

	const create = (params: CreateTicketInput) =>
		instance
			.post<CreateTicketOutput>("ticket/create", params, {
				headers: { authorization: `Bearer ${authContext.token}` },
			})
			.then(result => result.data);

	return {
		register,
		login,
		countTickets,
		listTickets,
		findByCode,
		create,
	};
};
