import React, { useState, ChangeEvent, FormEvent } from "react";

interface CreateJournalProps {
	onSubmit: (data: FormData) => void;
}

const CreateJournal: React.FC<CreateJournalProps> = ({ onSubmit }) => {
	const [entryDate, setEntryDate] = useState<string>("");
	const [weather, setWeather] = useState<string>("");
	const [emotions, setEmotions] = useState<string>("");
	const [data, setData] = useState<string>("");
	const [goal, setGoal] = useState<string>("");
	const [affirmation, setAffirmation] = useState<string>("");
	const [rAnswer, setRAnswer] = useState<string>("");
	const [quoteText, setQuoteText] = useState<string>("");
	const [quoteAuthor, setQuoteAuthor] = useState<string>("");
	const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMediaFiles(e.target.files);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("EntryDate", entryDate);
		formData.append("Weather", weather);
		formData.append("Emotions", emotions);
		formData.append("Data", data);
		formData.append("Goal", goal);
		formData.append("Affirmation", affirmation);
		formData.append("R_Answer", rAnswer);
		formData.append("QuoteText", quoteText);
		formData.append("QuoteAuthor", quoteAuthor);
		// Append files if any
		if (mediaFiles) {
			Array.from(mediaFiles).forEach((file) => {
				formData.append("media", file);
			});
		}
		onSubmit(formData);
	};

	return (
		<div className="max-w-2xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Create Journal Entry</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="entryDate" className="block mb-1 font-semibold">
						Date
					</label>
					<input
						id="entryDate"
						type="date"
						className="w-full border p-2 rounded"
						value={entryDate}
						onChange={(e) => setEntryDate(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="weather" className="block mb-1 font-semibold">
						Weather
					</label>
					<input
						id="weather"
						type="text"
						className="w-full border p-2 rounded"
						value={weather}
						onChange={(e) => setWeather(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="emotions" className="block mb-1 font-semibold">
						Emotions
					</label>
					<input
						id="emotions"
						type="text"
						className="w-full border p-2 rounded"
						value={emotions}
						onChange={(e) => setEmotions(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="data" className="block mb-1 font-semibold">
						Journal Data
					</label>
					<textarea
						id="data"
						className="w-full border p-2 rounded"
						value={data}
						onChange={(e) => setData(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="goal" className="block mb-1 font-semibold">
						Goal
					</label>
					<textarea
						id="goal"
						className="w-full border p-2 rounded"
						value={goal}
						onChange={(e) => setGoal(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="affirmation" className="block mb-1 font-semibold">
						Affirmation
					</label>
					<textarea
						id="affirmation"
						className="w-full border p-2 rounded"
						value={affirmation}
						onChange={(e) => setAffirmation(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="rAnswer" className="block mb-1 font-semibold">
						Reflection Answer
					</label>
					<textarea
						id="rAnswer"
						className="w-full border p-2 rounded"
						value={rAnswer}
						onChange={(e) => setRAnswer(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="quoteText" className="block mb-1 font-semibold">
						Quote Text
					</label>
					<textarea
						id="quoteText"
						className="w-full border p-2 rounded"
						value={quoteText}
						onChange={(e) => setQuoteText(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="quoteAuthor" className="block mb-1 font-semibold">
						Quote Author
					</label>
					<input
						id="quoteAuthor"
						type="text"
						className="w-full border p-2 rounded"
						value={quoteAuthor}
						onChange={(e) => setQuoteAuthor(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="media" className="block mb-1 font-semibold">
						Upload Media (Images, Videos, Audio)
					</label>
					<input
						id="media"
						type="file"
						className="w-full"
						onChange={handleFileChange}
						multiple
						accept="image/*,video/*,audio/*"
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
				>
					Submit Journal
				</button>
			</form>
		</div>
	);
};

export default CreateJournal;
