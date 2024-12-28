// backend/utils/pdfGenerator.js

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

/**
 * Generates a PDF resume based on the provided data and template.
 *
 * @param {Object} resumeData - The data to populate the resume.
 * @param {String} templateId - The ID of the template to use.
 * @param {String} outputPath - The file path where the PDF will be saved.
 * @returns {Promise} - Resolves when the PDF is successfully created.
 */
const generateResumePDF = (resumeData, templateId, outputPath) => {
	return new Promise((resolve, reject) => {
		try {
			// Initialize a new PDF document
			const doc = new PDFDocument({ margin: 50 });

			// Create a write stream to the specified output path
			const writeStream = fs.createWriteStream(outputPath);
			doc.pipe(writeStream);

			// Example Template Handling
			// You can expand this section to handle multiple templates
			switch (templateId) {
				case "1":
					applyClassicTemplate(doc, resumeData);
					break;
				case "2":
					applyModernTemplate(doc, resumeData);
					break;
				default:
					applyClassicTemplate(doc, resumeData);
					break;
			}

			// Finalize the PDF and end the stream
			doc.end();

			// Handle stream events
			writeStream.on("finish", () => {
				resolve();
			});

			writeStream.on("error", (error) => {
				reject(error);
			});
		} catch (error) {
			reject(error);
		}
	});
};

/**
 * Applies the classic resume template to the PDF document.
 *
 * @param {PDFDocument} doc - The PDFDocument instance.
 * @param {Object} data - The resume data.
 */
const applyClassicTemplate = (doc, data) => {
	// Header
	doc
		.fontSize(20)
		.font("Helvetica-Bold")
		.text(data.fullName, { align: "center" })
		.moveDown();

	// Contact Information
	doc
		.fontSize(10)
		.font("Helvetica")
		.text(
			`Email: ${data.email} | Phone: ${data.phone} | Address: ${data.address}`,
			{
				align: "center",
			}
		)
		.moveDown();

	// Summary
	doc.fontSize(12).font("Helvetica-Bold").text("Summary").moveDown(0.5);
	doc.fontSize(10).font("Helvetica").text(data.summary).moveDown();

	// Experience
	doc.fontSize(12).font("Helvetica-Bold").text("Experience").moveDown(0.5);

	data.experiences.forEach((exp) => {
		doc
			.fontSize(10)
			.font("Helvetica-Bold")
			.text(`${exp.position} at ${exp.company}`, { continued: true })
			.font("Helvetica")
			.text(` (${exp.startDate} - ${exp.endDate})`)
			.moveDown(0.2);
		doc.fontSize(10).font("Helvetica").text(exp.description).moveDown();
	});

	// Education
	doc.fontSize(12).font("Helvetica-Bold").text("Education").moveDown(0.5);

	data.education.forEach((edu) => {
		doc
			.fontSize(10)
			.font("Helvetica-Bold")
			.text(`${edu.degree} from ${edu.institution}`, { continued: true })
			.font("Helvetica")
			.text(` (${edu.startDate} - ${edu.endDate})`)
			.moveDown(0.2);
		doc.fontSize(10).font("Helvetica").text(edu.description).moveDown();
	});

	// Skills
	doc.fontSize(12).font("Helvetica-Bold").text("Skills").moveDown(0.5);
	doc.fontSize(10).font("Helvetica").list(data.skills).moveDown();
};

/**
 * Applies the modern resume template to the PDF document.
 *
 * @param {PDFDocument} doc - The PDFDocument instance.
 * @param {Object} data - The resume data.
 */
const applyModernTemplate = (doc, data) => {
	// Header with Line Below
	doc
		.fontSize(22)
		.font("Helvetica-Bold")
		.text(data.fullName, { align: "left" })
		.moveDown(0.1);
	doc
		.strokeColor("#000000")
		.lineWidth(1)
		.moveTo(50, doc.y)
		.lineTo(550, doc.y)
		.stroke()
		.moveDown(0.5);

	// Contact Information on the Right
	doc
		.fontSize(10)
		.font("Helvetica")
		.text(`Email: ${data.email}`, 400, doc.y, { align: "right" })
		.text(`Phone: ${data.phone}`, { align: "right" })
		.text(`Address: ${data.address}`, { align: "right" })
		.moveDown();

	// Summary
	doc.fontSize(12).font("Helvetica-Bold").text("Summary").moveDown(0.3);
	doc.fontSize(10).font("Helvetica").text(data.summary).moveDown();

	// Experience
	doc.fontSize(12).font("Helvetica-Bold").text("Experience").moveDown(0.3);

	data.experiences.forEach((exp) => {
		doc
			.fontSize(10)
			.font("Helvetica-Bold")
			.text(`${exp.position} at ${exp.company}`, { continued: true })
			.font("Helvetica")
			.text(` (${exp.startDate} - ${exp.endDate})`)
			.moveDown(0.2);
		doc.fontSize(10).font("Helvetica").text(exp.description).moveDown();
	});

	// Education
	doc.fontSize(12).font("Helvetica-Bold").text("Education").moveDown(0.3);

	data.education.forEach((edu) => {
		doc
			.fontSize(10)
			.font("Helvetica-Bold")
			.text(`${edu.degree} from ${edu.institution}`, { continued: true })
			.font("Helvetica")
			.text(` (${edu.startDate} - ${edu.endDate})`)
			.moveDown(0.2);
		doc.fontSize(10).font("Helvetica").text(edu.description).moveDown();
	});

	// Skills
	doc.fontSize(12).font("Helvetica-Bold").text("Skills").moveDown(0.3);
	doc
		.fontSize(10)
		.font("Helvetica")
		.list(data.skills, { columns: 2 })
		.moveDown();
};

module.exports = {
	generateResumePDF,
};
