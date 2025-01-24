import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/**
 * Creates a new journal entry along with any uploaded media.
 * @param formData - A FormData object containing journal data and media files.
 */
export const createJournal = async (formData: FormData) => {
	const response = await axios.post(`${API_URL}/journals/create`, formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response.data;
};

/**
 * Retrieves all journal entries for the authenticated user.
 */
export const getJournals = async () => {
	const response = await axios.get(`${API_URL}/journals/view`);
	return response.data;
};

/**
 * Retrieves a specific journal entry by ID.
 * @param journalId - The ID of the journal entry to retrieve.
 */
export const getJournalById = async (journalId: number) => {
	const response = await axios.get(`${API_URL}/journals/${journalId}`);
	return response.data;
};

/**
 * Deletes a journal entry by its ID.
 * @param journalId - The ID of the journal entry to delete.
 */
export const deleteJournal = async (journalId: number) => {
	const response = await axios.delete(
		`${API_URL}/journals/delete/${journalId}`
	);
	return response.data;
};
