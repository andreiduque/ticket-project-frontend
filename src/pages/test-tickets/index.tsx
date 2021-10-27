import { Input, Button, Form } from "antd";
import { TicketTypeEnum } from "enums/ticket-type";
import { useApi } from "hooks/api";
import { useLoading } from "hooks/loading";
import { useState } from "react";
import { toast } from "react-toastify";

interface FormData {
	code: string;
	price: string;
}

const TestTickets = () => {
	const { findByCode } = useApi();
	const { requestState, setErrorState, setLoadingState, setSuccessState } =
		useLoading();

	const [result, setResult] = useState<string>();

	const onFinish = async ({ code, price }: FormData) => {
		try {
			setLoadingState();

			const priceNumber = parseFloat(price);

			const ticketFound = await findByCode({ code });

			const formatter = Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
			});

			const comparePriceDiscount = () =>
				ticketFound.discountValue > priceNumber
					? // eslint-disable-next-line @typescript-eslint/no-magic-numbers
					  setResult(formatter.format(0))
					: setResult(
							formatter.format(priceNumber - ticketFound.discountValue),
					  );

			if (ticketFound.type === TicketTypeEnum.PERCENTAGE) {
				setResult(
					formatter.format(
						// eslint-disable-next-line @typescript-eslint/no-magic-numbers
						((100 - ticketFound.discountValue) / 100) * priceNumber,
					),
				);
			} else {
				comparePriceDiscount();
			}

			setSuccessState();
		} catch (err: any) {
			// eslint-disable-next-line no-console
			console.error(err);
			setErrorState();
		}
	};

	const onFinishFailed = (error: any) => {
		setErrorState();

		toast.error("Cupom inválido");
		// eslint-disable-next-line no-console
		console.log(error);
	};

	return (
		<>
			<Form
				name="test-ticket"
				labelCol={{ span: 12 }}
				wrapperCol={{ span: 16 }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<Form.Item
					label="Código do Cupom"
					name="code"
					rules={[{ required: true, message: "Este é um campo obrigatório" }]}
				>
					<Input placeholder="Digite o código do cupom" />
				</Form.Item>
				<Form.Item
					label="Preço do produto"
					name="price"
					rules={[{ required: true, message: "Este é um campo obrigatório" }]}
				>
					<Input placeholder="Digite o preço do produto" />
				</Form.Item>
				<Form.Item
					wrapperCol={{ offset: 8, span: 16 }}
					style={{ marginBottom: 0 }}
				>
					<Button
						type="ghost"
						htmlType="submit"
						disabled={requestState === "LOADING"}
					>
						Testar cupom
					</Button>
				</Form.Item>
			</Form>
			<p>{result}</p>
		</>
	);
};

// eslint-disable-next-line import/no-default-export
export default TestTickets;
