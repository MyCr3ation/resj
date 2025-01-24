import React, { useEffect, useState } from "react";
import JournalList from "./JournalList.tsx";
import { Journal } from "./JournalCards.tsx";
import axios from "axios";

const ViewJournals: React.FC = () => {
	const [journals, setJournals] = useState<Journal[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchJournals = async () => {
		try {
			// Replace '/api/journals/view' with your actual API endpoint
			const response = await axios.get("/api/journals/view");
			setJournals((response.data as { journals: Journal[] }).journals);
		} catch (err: any) {
			setError(err.response?.data?.message || "Error fetching journals");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchJournals();
	}, []);

	const handleViewJournal = (jid: number) => {
		// Handle view action (e.g., navigate to JournalDetail page)
		console.log("View journal with ID:", jid);
	};

	const handleDeleteJournal = async (jid: number) => {
		try {
			// Replace `/api/journals/delete/${jid}` with your actual API endpoint
			await axios.delete(`/api/journals/delete/${jid}`);
			// Refresh the journal list after deletion
			fetchJournals();
		} catch (err: any) {
			console.error(err.response?.data?.message || "Error deleting journal");
		}
	};

	if (loading) {
		return <p className="text-center">Loading journals...</p>;
	}

	if (error) {
		return <p className="text-center text-red-500">{error}</p>;
	}

	return (
		<div className="max-w-3xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4 text-center">My Journals</h2>
			<JournalList
				journals={journals}
				onViewJournal={handleViewJournal}
				onDeleteJournal={handleDeleteJournal}
			/>
		</div>
	);
};

export default ViewJournals;
