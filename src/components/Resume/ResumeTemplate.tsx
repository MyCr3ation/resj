import React from "react";
import { ResumeFormData } from "../../types";

interface ResumePreviewProps {
	data: ResumeFormData;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
	return (
		<div className="border p-4 rounded">
			<h2 className="text-2xl font-bold mb-2">{data.fullName}</h2>
			<p className="text-sm text-gray-600 mb-4">
				{data.email} | {data.phone} | {data.address}
			</p>
			<h3 className="font-semibold">Summary</h3>
			<p className="mb-4">{data.summary}</p>
			<h3 className="font-semibold">Skills</h3>
			<p className="mb-4">{data.skills.join(", ")}</p>
			{/* For simplicity, experiences and education are not rendered here yet.
          They can be added later as needed. */}
		</div>
	);
};

export default ResumePreview;
