import React from "react";

interface ResumeTemplateProps {
	templateId: number;
	onSelect: (id: number) => void;
	selected: boolean;
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({
	templateId,
	onSelect,
	selected,
}) => {
	// Placeholder template preview logic; you might eventually show an image or preview of the template
	const templateName = templateId === 1 ? "Classic" : "Modern";

	return (
		<div
			className={`border p-4 rounded cursor-pointer ${
				selected ? "border-blue-500" : "border-gray-300"
			}`}
			onClick={() => onSelect(templateId)}
		>
			<h3 className="text-lg font-bold">{templateName}</h3>
			<p className="text-sm text-gray-600">
				A {templateName.toLowerCase()} resume template.
			</p>
		</div>
	);
};

export default ResumeTemplate;
