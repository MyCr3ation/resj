// backend/routes/resumeRoutes.js

const express = require("express");
const router = express.Router();

// Import Controllers
const { generateResume } = require("../controllers/resumeController");

// Import Authentication Middleware
const authenticate = require("../middleware/authenticate");

// (Optional) Import Validation Middleware
// const { validateResumeGeneration } = require('../middleware/validate');

// Define Routes

/**
 * @route   POST /api/resume/generate
 * @desc    Generate a PDF resume based on user data and selected template
 * @access  Private
 */
router.post(
	"/generate",
	authenticate,
	/* validateResumeGeneration, */ generateResume
);

// Export the router
module.exports = router;
