import { useState } from "react";

export const useLoading = () => {
	const [requestState, setRequestState] = useState<
		"DEFAULT" | "ERROR" | "LOADING" | "SUCCESS"
	>("DEFAULT");

	const setErrorState = () => {
		setRequestState("ERROR");
	};

	const setLoadingState = () => {
		setRequestState("LOADING");
	};

	const setSuccessState = () => {
		setRequestState("SUCCESS");
	};

	return {
		requestState,
		setErrorState,
		setLoadingState,
		setSuccessState,
	};
};
