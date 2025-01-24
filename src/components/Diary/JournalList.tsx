import React from "react";
import { Journal } from "./JournalCards.tsx";
import JournalCard from "./JournalCards.tsx";

interface JournalListProps {
	journals: Journal[];
	onViewJournal: (jid: number) => void;
	onDeleteJournal: (jid: number) => void;
}

const JournalList: React.FC<JournalListProps> = ({
	journals,
	onViewJournal,
	onDeleteJournal,
}) => {
	return (
		<div className="space-y-4">
			{journals.length === 0 ? (
				<p className="text-center text-gray-500">No journal entries found.</p>
			) : (
				journals.map((journal) => (
					<JournalCard
						key={journal.Jid}
						journal={journal}
						onView={onViewJournal}
						onDelete={onDeleteJournal}
					/>
				))
			)}
		</div>
	);
};

export default JournalList;
