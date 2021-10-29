import { useApi } from "hooks/api";
import { useLoading } from "hooks/loading";
import { toast } from "react-toastify";
import { Form, Input, Radio, InputNumber, DatePicker, Button } from "antd";
import { TicketTypeEnum } from "enums/ticket-type";
import locale from "antd/es/date-picker/locale/pt_BR";
import { Moment } from "moment";
import { RuleRender } from "antd/lib/form";
import { useCallback } from "react";

const Create = () => {
	const { create } = useApi();
	const { requestState, setErrorState, setLoadingState, setSuccessState } =
		useLoading();

	const validateDiscountPercentage: RuleRender = useCallback(
		({ getFieldValue }) => ({
			validator: (_, discountValue) => {
				if (
					getFieldValue("type") === TicketTypeEnum.PERCENTAGE &&
					// eslint-disable-next-line @typescript-eslint/no-magic-numbers
					parseFloat(discountValue) > 100
				) {
					return Promise.reject(
						"Descontos do tipo porcentagem não aceitam valores superiores a 100.",
					);
				}

				return Promise.resolve();
			},
		}),
		[],
	);

	const onFinish = useCallback(async (values: any) => {
		try {
			setLoadingState();

			await create(values);

			setSuccessState();

			toast.success("Cupom criado com sucesso");
		} catch (err: any) {
			setErrorState();

			toast.error("Falha ao criar cupom");
			// eslint-disable-next-line no-console
			console.error(err);
		}
	}, []);

	const onFinishFailed = useCallback((error: any) => {
		setErrorState();

		toast.error("Falha ao criar cupom");
		// eslint-disable-next-line no-console
		console.error(error);
	}, []);

	const disableDate = (current: Moment) => {
		return current.isBefore(new Date());
	};

	return (
		<div>
			<div>
				<Form
					initialValues={{ type: TicketTypeEnum.PERCENTAGE }}
					name="create"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Form.Item name="code" label="Código">
						<Input placeholder="Insira um código para o cupom" />
					</Form.Item>
					<Form.Item
						name="name"
						label="Nome"
						rules={[{ required: true, message: "Nome é um campo obrigatório" }]}
					>
						<Input placeholder="Insira um nome para o cupom" />
					</Form.Item>
					<Form.Item
						name="description"
						label="Descrição"
						rules={[
							{ required: true, message: "Descrição é um campo obrigatório" },
						]}
					>
						<Input.TextArea placeholder="Insira uma descrição para o cupom" />
					</Form.Item>
					<Form.Item
						name="type"
						label="Tipo de desconto"
						rules={[
							{
								required: true,
								message: "Tipo de desconto é um campo obrigatório",
							},
						]}
					>
						<Radio.Group>
							<Radio value={TicketTypeEnum.PERCENTAGE}>Porcentagem</Radio>
							<Radio value={TicketTypeEnum.RAW}>Valor bruto</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						name="discountValue"
						label="Valor do desconto"
						rules={[
							{
								required: true,
								message: "Valor do desconto é um campo obrigatório",
							},
							validateDiscountPercentage,
						]}
					>
						<InputNumber type="number" min={1} />
					</Form.Item>
					<Form.Item
						name="expirationDate"
						label="Validade"
						rules={[
							{ required: true, message: "Validade é um campo obrigatório" },
						]}
					>
						<DatePicker
							disabledDate={disableDate}
							locale={locale}
							format="DD/MM/YYYY"
						/>
					</Form.Item>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							disabled={requestState === "LOADING"}
						>
							Criar cupom
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

// eslint-disable-next-line import/no-default-export
export default Create;
