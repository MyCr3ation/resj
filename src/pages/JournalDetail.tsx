// src/pages/JournalDetail.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface JournalDetailParams extends Record<string, string | undefined> {
	id: string;
}

interface Media {
	Mid: number;
	MediaURL: string;
	MediaType: string;
}

export interface Journal {
	Jid: number;
	EntryDate: string;
	Weather?: string;
	Emotions?: string;
	Data: string;
	QuoteText?: string;
	QuoteAuthor?: string;
	media?: Media[];
}

interface JournalResponse {
	journal: Journal;
}

const JournalDetail: React.FC = () => {
	const { id } = useParams<JournalDetailParams>();
	const [journal, setJournal] = useState<Journal | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchJournal = async () => {
			try {
				const response = await axios.get<JournalResponse>(
					`/api/journals/${id}`
				);
				setJournal(response.data.journal);
			} catch (err: any) {
				setError(err.response?.data?.message || "Error fetching journal entry");
			} finally {
				setLoading(false);
			}
		};

		fetchJournal();
	}, [id]);

	if (loading) {
		return <p className="text-center">Loading journal...</p>;
	}

	if (error) {
		return <p className="text-center text-red-500">{error}</p>;
	}

	if (!journal) {
		return <p className="text-center">No journal found.</p>;
	}

	return (
		<div className="max-w-3xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-2">
				Journal Entry from {new Date(journal.EntryDate).toLocaleDateString()}
			</h2>
			{journal.Weather && (
				<p className="text-gray-600">Weather: {journal.Weather}</p>
			)}
			{journal.Emotions && (
				<p className="text-gray-600">Emotion: {journal.Emotions}</p>
			)}
			<div className="my-4">
				<p>{journal.Data}</p>
			</div>
			{journal.QuoteText && (
				<div className="mt-4">
					<p className="italic text-gray-600">
						“{journal.QuoteText}”{" "}
						{journal.QuoteAuthor && `- ${journal.QuoteAuthor}`}
					</p>
				</div>
			)}
			{journal.media && journal.media.length > 0 && (
				<div className="mt-4 grid grid-cols-2 gap-4">
					{journal.media.map((media) => (
						<div key={media.Mid}>
							<img
								src={media.MediaURL}
								alt={`Media ${media.Mid}`}
								className="w-full h-auto rounded shadow"
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default JournalDetail;
