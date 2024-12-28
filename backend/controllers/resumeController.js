// backend/controllers/resumeController.js

const { generateResumePDF } = require("../utils/pdfGenerator"); // PDF generation utility
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

/**
 * Controller to generate a PDF resume based on user-provided data and selected template.
 * Endpoint: POST /api/resume/generate
 */
exports.generateResume = async (req, res) => {
	const Uid = req.user.Uid; // Retrieved from authentication middleware
	const {
		fullName,
		email,
		phone,
		address,
		summary,
		experiences, // Array of { company, position, startDate, endDate, description }
		education, // Array of { institution, degree, startDate, endDate, description }
		skills, // Array of skill strings
		templateId, // ID of the selected template
	} = req.body;

	try {
		// Validate required fields (basic validation)
		if (
			!fullName ||
			!email ||
			!phone ||
			!address ||
			!summary ||
			!experiences ||
			!education ||
			!skills ||
			!templateId
		) {
			return res.status(400).json({ message: "⚠️ All fields are required." });
		}

		// Define resume data structure
		const resumeData = {
			fullName,
			email,
			phone,
			address,
			summary,
			experiences,
			education,
			skills,
		};

		// Generate a unique filename for the resume
		const filename = `resume_${Uid}_${uuidv4()}.pdf`;
		const outputPath = path.join(__dirname, "../uploads/resumes/", filename);

		// Ensure the resumes directory exists
		fs.mkdirSync(path.dirname(outputPath), { recursive: true });

		// Generate the PDF resume
		await generateResumePDF(resumeData, templateId, outputPath);

		// Construct the resume URL (assuming static serving of uploads directory)
		const resumeURL = `/uploads/resumes/${filename}`;

		res.status(200).json({
			message: "✅ Resume generated successfully.",
			resumeURL,
		});
	} catch (error) {
		console.error("❌ Error generating resume:", error.message);
		res
			.status(500)
			.json({ message: "🔥 Internal Server Error", error: error.message });
	}
};
