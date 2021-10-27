import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: beige;
`;

export const FormContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	max-height: 35rem;
	height: 100%;
	max-width: 40rem;
	width: 100%;
	background-color: white;

	> Form {
		max-width: 40rem;
		max-height: 35rem;
	}
`;
