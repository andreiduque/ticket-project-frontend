import { Form, Button, Checkbox, Input, Col } from "antd";
import { useAuthContext } from "context/auth";
import { useApi } from "hooks/api";
import { useLoading } from "hooks/loading";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { Container, FormContainer } from "./styles";

const Login = () => {
	const history = useHistory();
	const { login } = useApi();
	const { requestState, setErrorState, setLoadingState, setSuccessState } =
		useLoading();
	const { setToken } = useAuthContext();

	const onFinish = useCallback(async (values: any) => {
		try {
			setLoadingState();

			const { authCode } = await login(values);

			setSuccessState();

			if (values.remember) {
				localStorage.setItem("userToken", authCode);
			}

			setToken(authCode);
			history.push("/");

			toast.success("Acesso efetuado com sucesso");
		} catch (err: any) {
			setErrorState();

			toast.error("Falha ao tentar acessar");
			// eslint-disable-next-line no-console
			console.log(err);
		}
	}, []);

	const onFinishFailed = useCallback((error: any) => {
		setErrorState();

		toast.error("Falha ao tentar acessar");
		// eslint-disable-next-line no-console
		console.log(error);
	}, []);

	return (
		<Container>
			<FormContainer>
				{requestState === "ERROR" && <p>Email ou senha incorreto(s)</p>}
				<Form
					name="login"
					wrapperCol={{ span: 24 }}
					initialValues={{ remember: false }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item
						labelCol={{ offset: 2 }}
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Email é um campo obrigatório" },
							{ type: "email", message: "Email precisa ser válido" },
						]}
					>
						<Input placeholder="Digite seu email" type="email" />
					</Form.Item>

					<Form.Item
						label="Password"
						name="password"
						rules={[
							{ required: true, message: "Senha é um campo obrigatório" },
						]}
					>
						<Input.Password placeholder="Digite sua senha" />
					</Form.Item>

					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 7 }}
					>
						<Checkbox>Lembre-se de mim</Checkbox>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 7 }}>
						<Button
							type="primary"
							htmlType="submit"
							disabled={requestState === "LOADING"}
						>
							Iniciar sessão
						</Button>
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 5 }} style={{ marginBottom: 0 }}>
						<span> Ainda não possui cadastro? </span>
						<Col offset={3}>
							<Link to="/register">Registre-se aqui.</Link>
						</Col>
					</Form.Item>
				</Form>
			</FormContainer>
		</Container>
	);
};

Login.layout = "blank";

// eslint-disable-next-line import/no-default-export
export default Login;
