import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/**
 * Generates a PDF resume based on the provided resume data.
 * @param data - The resume data including personal details, experiences, education, skills, and template selection.
 */
export const generateResume = async (data: any) => {
	const response = await axios.post(`${API_URL}/resume/generate`, data, {
		headers: { "Content-Type": "application/json" },
	});
	return response.data;
};
