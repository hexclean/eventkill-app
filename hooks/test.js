import React, { useState } from "react";
import axios from "axios";
import baseUrl from "../config/baseUrl";
import authStorage from "../auth/storage";

export default postApi = async () => {
	const authToken = await authStorage.getToken();

	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const request = async (url, payload) => {
		let req = {
			headers: {
				"X-Auth-Token": authToken,
				"content-type": "application/json",
			},
			data: payload,
		};
		setLoading(true);

		const response = await axios.post(baseUrl.baseURL + url, data, req);
		setLoading(false);

		setError(response.data.status == 500);
		setData(response.data.result);
		return response;
	};

	return { data, error, loading, request };
};
