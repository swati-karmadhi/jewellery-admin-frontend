import axios from "axios";
import AuthStorage from "../utils/authStorage";
import * as CONFIG from "../constants/config";

const instance = axios.create({
	baseURL: CONFIG.API_BASE_URL,
    headers: {
		"Content-Type": "application/json",
	},
});

// Prepare request
instance.interceptors.request.use(
	(config) => {
		let token = AuthStorage.getToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// Prepare Response
instance.interceptors.response.use(
	(response) => {
		return response.data.success ? response.data.data : response.error;
	},
	(error) => {
		return Promise.reject({
			errors: error.response.data.error,
			status: error.response.data.status,
		});
	}
);


const post = (url, data, headers = {}) => instance.post(url, data, headers);

const destroy = (url) => instance.delete(url);

const get = (url, params) =>
	instance.get(url, {
		params,
	});

const put = (url, data, headers = {}) => instance.put(url, data, headers);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	post,
	destroy,
	get,
	put,
};