import axios from "axios";
import authStorage from "../auth/storage";

const apiUrl = "http://192.168.0.178:9000/api/";
axios.defaults.withCredentials = true;

export const get = async (resource, qs) => {
	const req = await axios({
		method: "get",
		withCredentials: true,
		url: apiUrl + resource,
		params: qs,
	});

	return req.data;
};

export const post = async (resource, data) => {
	const authToken = await authStorage.getToken();
	const req = await axios({
		method: "post",
		withCredentials: true,
		url: apiUrl + resource,
		data: data,
	});

	return req.data;
};

export const put = async (resource, data) => {
	const req = await axios({
		method: "put",
		withCredentials: true,
		url: apiUrl + resource,
		data: data,
	});

	return req.data;
};

export const del = async (resource, data) => {
	const req = await axios({
		method: "delete",
		withCredentials: true,
		url: apiUrl + resource,
		data: data,
	});

	return req.data;
};
