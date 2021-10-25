// import { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.baseURL = "http://192.168.100.70:9000/api/meets";

// const useAxios = ({ url, method, body = null, headers = null }) => {
// 	const [response, setResponse] = useState(null);
// 	const [error, setError] = useState("");
// 	const [loading, setLoading] = useState(false);

// 	const fetchData = async () => {
// 		setLoading(true);
// 		axios[method](url, JSON.parse(headers), JSON.parse(body))
// 			.then(res => {
// 				setResponse(res.data.result);
// 				setLoading(false);
// 			})
// 			.catch(err => {
// 				setError(err);
// 			});
// 	};

// 	useEffect(() => {
// 		fetchData();
// 	}, [method, url, body, headers]);

// 	return { response, error, loading };
// };

// export default useAxios;

import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (method, url, body) => {
	const [isLoading, setIsLoading] = useState(false);
	const [apiData, setApiData] = useState([]);
	const [serverError, setServerError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				await axios({
					method: method,
					url: url,
					data: body,
				}).then(result => {
					setApiData(result.data.result);
					setIsLoading(false);
				});
			} catch (error) {
				setServerError(error);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [url, method, body]);

	return { isLoading, apiData, serverError };
};

export default useAxios;
