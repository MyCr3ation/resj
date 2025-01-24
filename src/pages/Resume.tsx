import React, { useState } from "react";
import ResumeForm from "../components/Resume/ResumeForm.tsx";
import ResumePreview from "../components/Resume/ResumePreview.tsx";
import { ResumeFormData } from "../types";

const Resume: React.FC = () => {
	const [resumeData, setResumeData] = useState<ResumeFormData | null>(null);

	const handleSubmit = (data: ResumeFormData) => {
		setResumeData(data);
		// You might also call an API endpoint here to generate & download the resume PDF.
	};

	return (
		<div className="max-w-3xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4 text-center">Build Your Resume</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<ResumeForm onSubmit={handleSubmit} />
				</div>
				<div>
					{resumeData ? (
						<ResumePreview data={resumeData} />
					) : (
						<p className="text-gray-500 text-center">
							Your resume preview will appear here.
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Resume;
