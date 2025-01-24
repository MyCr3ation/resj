/**
 * Formats a given date string into a more readable format.
 *
 * @param dateString - The date string to format.
 * @returns A formatted date string (e.g., "January 15, 2024").
 */
export const formatDate = (dateString: string): string => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return new Date(dateString).toLocaleDateString(undefined, options);
};

// You can add other helper functions here as needed.
