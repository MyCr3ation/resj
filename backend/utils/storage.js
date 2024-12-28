// backend/utils/storage.js

const { v4: uuidv4 } = require("uuid");
const path = require("path");
const supabase = require("../config/supabase");

/**
 * Uploads a media file to Supabase Storage.
 *
 * @param {Buffer} fileBuffer - The buffer of the file to upload.
 * @param {String} originalName - The original name of the file.
 * @param {String} folderPath - The folder path within the storage bucket.
 * @returns {Promise<Object>} - Resolves with the public URL of the uploaded file.
 */
const uploadMedia = async (fileBuffer, originalName, folderPath) => {
	try {
		// Extract the file extension
		const fileExtension = path.extname(originalName);
		// Generate a unique filename
		const filename = `${uuidv4()}${fileExtension}`;
		// Define the full path within the bucket
		const filePath = path.join(folderPath, filename).replace(/\\/g, "/"); // Replace backslashes on Windows

		// Upload the file to Supabase Storage
		const { data, error } = await supabase.storage
			.from("media") // Ensure you have a 'media' bucket in Supabase
			.upload(filePath, fileBuffer, {
				contentType: getContentType(fileExtension),
				upsert: false, // Do not overwrite existing files
			});

		if (error) {
			throw error;
		}

		// Get the public URL of the uploaded file
		const { publicURL, error: publicUrlError } = supabase.storage
			.from("media")
			.getPublicUrl(filePath);

		if (publicUrlError) {
			throw publicUrlError;
		}

		return { publicURL };
	} catch (error) {
		console.error("❌ Error uploading media:", error);
		throw error;
	}
};

/**
 * Deletes a media file from Supabase Storage.
 *
 * @param {String} filePath - The path of the file within the storage bucket.
 * @returns {Promise<void>}
 */
const deleteMedia = async (filePath) => {
	try {
		const { error } = await supabase.storage.from("media").remove([filePath]);

		if (error) {
			throw error;
		}
	} catch (error) {
		console.error("❌ Error deleting media:", error);
		throw error;
	}
};

/**
 * Determines the MIME type based on the file extension.
 *
 * @param {String} fileExtension - The extension of the file.
 * @returns {String} - The corresponding MIME type.
 */
const getContentType = (fileExtension) => {
	switch (fileExtension.toLowerCase()) {
		case ".jpg":
		case ".jpeg":
			return "image/jpeg";
		case ".png":
			return "image/png";
		case ".gif":
			return "image/gif";
		case ".mp4":
			return "video/mp4";
		case ".mp3":
			return "audio/mpeg";
		case ".wav":
			return "audio/wav";
		default:
			return "application/octet-stream";
	}
};

module.exports = {
	uploadMedia,
	deleteMedia,
};
