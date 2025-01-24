import React from "react";

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

interface JournalCardProps {
	journal: Journal;
	onView: (jid: number) => void;
	onDelete: (jid: number) => void;
}

const JournalCards: React.FC<JournalCardProps> = ({
	journal,
	onView,
	onDelete,
}) => {
	return (
		<div className="bg-white shadow-md rounded p-4 mb-4">
			<div className="flex justify-between items-center mb-2">
				<span className="font-semibold">
					{new Date(journal.EntryDate).toLocaleDateString()}
				</span>
				{journal.Weather && <span>{journal.Weather}</span>}
			</div>
			{journal.Emotions && (
				<div className="flex items-center mb-2">
					<span className="mr-2">{journal.Emotions}</span>
				</div>
			)}
			{journal.media && journal.media.length > 0 && (
				<div className="mb-2">
					<img
						src={journal.media[0].MediaURL}
						alt="Media Preview"
						className="w-16 h-16 object-cover"
					/>
				</div>
			)}
			<p className="text-gray-700 mb-4">{journal.Data.slice(0, 150)}...</p>
			{journal.QuoteText && (
				<p className="italic text-sm text-gray-600 mb-2">
					“{journal.QuoteText}”{" "}
					{journal.QuoteAuthor && `- ${journal.QuoteAuthor}`}
				</p>
			)}
			<div className="flex justify-end space-x-2">
				<button
					onClick={() => onView(journal.Jid)}
					className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
				>
					View
				</button>
				<button
					onClick={() => onDelete(journal.Jid)}
					className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
				>
					Delete
				</button>
			</div>
		</div>
	);
};

export default JournalCards;
