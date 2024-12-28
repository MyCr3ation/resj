// backend/controllers/journalController.js

const { Journal } = require("../models/Journal"); // Sequelize Journal model
const { Media } = require("../models/Media"); // Sequelize Media model
const { uploadMedia, deleteMedia } = require("../utils/storage"); // Supabase storage utilities
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Configure Multer storage (in memory)
const storage = multer.memoryStorage();

// File filter to accept only specific media types
const fileFilter = (req, file, cb) => {
	const allowedTypes = /jpeg|jpg|png|gif|mp4|mp3|wav/;
	const extname = allowedTypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = allowedTypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		cb(new Error("Error: Only images, videos, and audio files are allowed!"));
	}
};

// Initialize multer with storage and file filter
const upload = multer({
	storage,
	fileFilter,
	limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

// Middleware to handle multiple file uploads (up to 10 files)
const uploadMiddleware = upload.array("media", 10);

/**
 * Controller to create a new journal entry with optional media uploads.
 * Endpoint: POST /api/journals/create
 */
exports.createJournal = [
	uploadMiddleware, // Handle media uploads
	async (req, res) => {
		const {
			Rid,
			Tid,
			EntryDate,
			Weather,
			Emotions,
			Data,
			Goal,
			Affirmation,
			R_Answer,
			QuoteText,
			QuoteAuthor,
		} = req.body;

		const Uid = req.user.Uid; // Retrieved from authentication middleware

		try {
			// Create new journal entry
			const newJournal = await Journal.create({
				Uid,
				Rid,
				Tid,
				EntryDate,
				Weather,
				Emotions,
				Data,
				Goal,
				Affirmation,
				R_Answer,
				QuoteText,
				QuoteAuthor,
			});

			// Handle media uploads if any
			if (req.files && req.files.length > 0) {
				const mediaPromises = req.files.map(async (file) => {
					// Define folder path based on journal ID
					const folderPath = `journals/${newJournal.Jid}/`;

					// Upload media to Supabase Storage
					const { publicURL } = await uploadMedia(
						file.buffer,
						file.originalname,
						folderPath
					);

					// Create Media record in the database
					const mediaRecord = await Media.create({
						Jid: newJournal.Jid,
						MediaURL: publicURL,
						MediaType: file.mimetype.split("/")[0], // e.g., image, video, audio
					});

					return mediaRecord;
				});

				// Wait for all media uploads to complete
				await Promise.all(mediaPromises);
			}

			res.status(201).json({
				message: "✅ Journal entry created successfully.",
				journal: newJournal,
			});
		} catch (error) {
			console.error("❌ Error creating journal entry:", error.message);
			res
				.status(500)
				.json({ message: "🔥 Internal Server Error", error: error.message });
		}
	},
];

/**
 * Controller to retrieve all journal entries for the authenticated user.
 * Endpoint: GET /api/journals/view
 */
exports.getJournals = async (req, res) => {
	const Uid = req.user.Uid; // Retrieved from authentication middleware

	try {
		const journals = await Journal.findAll({
			where: { Uid },
			include: [{ model: Media, as: "media" }],
			order: [["EntryDate", "DESC"]],
		});

		res.status(200).json({
			message: "✅ Retrieved all journal entries.",
			journals,
		});
	} catch (error) {
		console.error("❌ Error retrieving journals:", error.message);
		res
			.status(500)
			.json({ message: "🔥 Internal Server Error", error: error.message });
	}
};

/**
 * Controller to retrieve a specific journal entry by its ID.
 * Endpoint: GET /api/journals/:id
 */
exports.getJournalById = async (req, res) => {
	const Uid = req.user.Uid; // Retrieved from authentication middleware
	const Jid = req.params.id;

	try {
		const journal = await Journal.findOne({
			where: { Jid, Uid },
			include: [{ model: Media, as: "media" }],
		});

		if (!journal) {
			return res.status(404).json({ message: "⚠️ Journal entry not found." });
		}

		res.status(200).json({
			message: "✅ Retrieved journal entry.",
			journal,
		});
	} catch (error) {
		console.error("❌ Error retrieving journal:", error.message);
		res
			.status(500)
			.json({ message: "🔥 Internal Server Error", error: error.message });
	}
};

/**
 * Controller to delete a journal entry by its ID, including associated media.
 * Endpoint: DELETE /api/journals/delete/:id
 */
exports.deleteJournal = async (req, res) => {
	const Uid = req.user.Uid; // Retrieved from authentication middleware
	const Jid = req.params.id;

	try {
		const journal = await Journal.findOne({ where: { Jid, Uid } });

		if (!journal) {
			return res.status(404).json({ message: "⚠️ Journal entry not found." });
		}

		// Retrieve all associated media
		const mediaFiles = await Media.findAll({ where: { Jid } });

		// Delete each media file from Supabase Storage and the database
		const deletePromises = mediaFiles.map(async (media) => {
			// Extract file path from MediaURL
			const filePath = media.MediaURL.split(".supabase.co/")[1]; // Adjust if your Supabase URL structure differs

			// Delete media from Supabase Storage
			await deleteMedia(filePath);

			// Delete media record from the database
			await media.destroy();
		});

		// Wait for all deletions to complete
		await Promise.all(deletePromises);

		// Delete the journal entry from the database
		await journal.destroy();

		res
			.status(200)
			.json({
				message: "✅ Journal entry and associated media deleted successfully.",
			});
	} catch (error) {
		console.error("❌ Error deleting journal entry:", error.message);
		res
			.status(500)
			.json({ message: "🔥 Internal Server Error", error: error.message });
	}
};
