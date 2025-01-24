import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/**
 * Registers a new user.
 * @param name - The user's full name.
 * @param email - The user's email.
 * @param password - The user's password.
 */
export const signup = async (name: string, email: string, password: string) => {
	const response = await axios.post(`${API_URL}/auth/signup`, {
		name,
		email,
		password,
	});
	return response.data;
};

/**
 * Logs in an existing user.
 * @param email - The user's email.
 * @param password - The user's password.
 */
export const login = async (email: string, password: string) => {
	const response = await axios.post(`${API_URL}/auth/login`, {
		email,
		password,
	});
	return response.data;
};

/**
 * Logs out the current user.
 */
export const logout = async () => {
	const response = await axios.post(`${API_URL}/auth/logout`);
	return response.data;
};

/**
 * Performs OAuth sign-in (e.g., Google).
 */
export const oauthSignIn = async () => {
	const response = await axios.post(`${API_URL}/auth/oauth`);
	return response.data;
};
