import { useState } from "react";

export default useApi = apiFunc => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);

	const request = async (...args) => {
		const response = await apiFunc(...args);
		setError(false);

		if (!response.ok) return setError(true);
		setError(false);
		setData(response.data.result);
	};

	return { request, data, error };
};
