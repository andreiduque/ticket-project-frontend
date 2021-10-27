import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Button } from "antd";
import { useAuthContext } from "context/auth";
import { Container, NavItem } from "./styles";

export const SideBar = () => {
	const location = useLocation();

	const authContext = useAuthContext();

	const isSamePage = (path: string) => {
		return location.pathname === path;
	};

	return (
		<Container>
			<ul>
				<NavItem isSamePage={isSamePage("/")}>
					<Link to="/">Home</Link>
				</NavItem>
				<NavItem isSamePage={isSamePage("criar-ticket")}>
					<Link to="/criar-ticket">Criar Ticket</Link>
				</NavItem>
				<NavItem isSamePage={isSamePage("testar-ticket")}>
					<Link to="testar-ticket">Testar Ticket</Link>
				</NavItem>
				<NavItem isSamePage={isSamePage("listar-tickets")}>
					<Link to="listar-tickets">Listar Tickets</Link>
				</NavItem>
				<NavItem isSamePage={isSamePage("criar-cupom")}>
					<Link to="criar-cupom">Criar cupom</Link>
				</NavItem>
			</ul>
			<Button type="primary" onClick={authContext.logout}>
				Encerrar sessão
			</Button>
		</Container>
	);
};
