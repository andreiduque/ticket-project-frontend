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
	max-height: 30rem;
	height: 100%;
	max-width: 30rem;
	width: 100%;
	background-color: white;
	flex-wrap: wrap;

	> Form {
		max-width: 30rem;
		max-height: 30rem;
	}
`;
