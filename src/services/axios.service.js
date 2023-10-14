import axios from "axios";
import AuthStorage from "../utils/authStorage";
import * as CONFIG from "../constants/config";
import { apiConfig } from "../config";
import { HELPER } from ".";

const instance = axios.create({
	baseURL: apiConfig.baseURL,
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
		// in the case, server is stoped
		if (error.code == "ERR_NETWORK") {
			HELPER.toaster.error("Something went wrong, Please try after sometimes.");
		}

        if(error.response.data.status === 401){
            AuthStorage.deauthenticateUser();
        }

		return Promise.reject({
			errors:
			  error?.response && error.response?.data?.error
				? error.response?.data?.error
				: { message: ["Somthing went wrong."] },
			status:
			  error?.response && error.response?.data?.status
				? error.response?.data?.status
				: 501,
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