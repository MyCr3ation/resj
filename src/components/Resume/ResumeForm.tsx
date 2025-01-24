import React, { useState } from "react";

interface Experience {
	company: string;
	position: string;
	startDate: string;
	endDate: string;
	description: string;
}

interface Education {
	institution: string;
	degree: string;
	startDate: string;
	endDate: string;
	description: string;
}

interface ResumeFormData {
	fullName: string;
	email: string;
	phone: string;
	address: string;
	summary: string;
	experiences: Experience[];
	education: Education[];
	skills: string[];
	templateId: number;
}

interface ResumeFormProps {
	onSubmit: (data: ResumeFormData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit }) => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [summary, setSummary] = useState("");
	const [experiences, setExperiences] = useState<Experience[]>([]);
	const [education, setEducation] = useState<Education[]>([]);
	const [skills, setSkills] = useState<string[]>([]);
	const [templateId, setTemplateId] = useState<number>(1);

	// For simplicity, this form does not include dynamic adding/removing of experiences/education/skills.
	// In a real implementation, you can add buttons to add or remove entries for these sections.

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const resumeData: ResumeFormData = {
			fullName,
			email,
			phone,
			address,
			summary,
			experiences,
			education,
			skills,
			templateId,
		};

		onSubmit(resumeData);
	};

	return (
		<div className="max-w-3xl mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4 text-center">Build Your Resume</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="fullName" className="block mb-1 font-semibold">
						Full Name
					</label>
					<input
						id="fullName"
						type="text"
						className="w-full border px-3 py-2 rounded"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="email" className="block mb-1 font-semibold">
						Email
					</label>
					<input
						id="email"
						type="email"
						className="w-full border px-3 py-2 rounded"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="phone" className="block mb-1 font-semibold">
						Phone Number
					</label>
					<input
						id="phone"
						type="text"
						className="w-full border px-3 py-2 rounded"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="address" className="block mb-1 font-semibold">
						Address
					</label>
					<input
						id="address"
						type="text"
						className="w-full border px-3 py-2 rounded"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="summary" className="block mb-1 font-semibold">
						Summary
					</label>
					<textarea
						id="summary"
						className="w-full border px-3 py-2 rounded"
						rows={3}
						value={summary}
						onChange={(e) => setSummary(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="skills" className="block mb-1 font-semibold">
						Skills (Comma-separated)
					</label>
					<input
						id="skills"
						type="text"
						className="w-full border px-3 py-2 rounded"
						value={skills.join(", ")}
						onChange={(e) =>
							setSkills(e.target.value.split(",").map((skill) => skill.trim()))
						}
						required
					/>
				</div>
				<div>
					<label htmlFor="templateId" className="block mb-1 font-semibold">
						Select Template
					</label>
					<select
						id="templateId"
						value={templateId}
						onChange={(e) => setTemplateId(Number(e.target.value))}
						className="w-full border px-3 py-2 rounded"
					>
						<option value={1}>Classic</option>
						<option value={2}>Modern</option>
					</select>
				</div>
				{/* For brevity, experiences and education sections are not implemented here. */}
				<button
					type="submit"
					className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
				>
					Generate Resume
				</button>
			</form>
		</div>
	);
};

export default ResumeForm;
