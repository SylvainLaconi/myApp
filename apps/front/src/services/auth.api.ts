import axios from 'axios';

import { Response, User, UserCredentials } from '@/types';

import authHeader from './auth.header';

const baseURL = import.meta.env.VITE_API_URL;

export const SignUserUp = async (newUser: User): Promise<Response> => {
	const response = await axios.post(`${baseURL}/auth/signup`, newUser);

	if (!response.data.success) {
		throw new Error(response.data.error);
	}

	return response.data;
};

export const LogUserIn = async (
	request: UserCredentials,
): Promise<Response> => {
	const response = await axios.post(`${baseURL}/auth/login`, request);

	if (!response.data.success) {
		throw new Error(response.data.error);
	}

	return response.data;
};

export const GetUserProfile = async (): Promise<Response> => {
	const response = await axios.get(`${baseURL}/auth/profile`, {
		headers: authHeader(),
	});

	if (!response.data.success) {
		throw new Error(response.data.error);
	}

	return response.data;
};
