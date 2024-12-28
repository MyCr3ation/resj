// backend/routes/journalRoutes.js

const express = require("express");
const router = express.Router();

// Import Controllers
const {
	createJournal,
	getJournals,
	getJournalById,
	deleteJournal,
} = require("../controllers/journalController");

// Import Authentication Middleware
const authenticate = require("../middleware/authenticate");

// (Optional) Import Validation Middleware
// const { validateJournalCreation } = require('../middleware/validate');

// Define Routes

/**
 * @route   POST /api/journals/create
 * @desc    Create a new journal entry
 * @access  Private
 */
router.post(
	"/create",
	authenticate,
	/* validateJournalCreation, */ createJournal
);

/**
 * @route   GET /api/journals/view
 * @desc    Get all journal entries for the authenticated user
 * @access  Private
 */
router.get("/view", authenticate, getJournals);

/**
 * @route   GET /api/journals/:id
 * @desc    Get a specific journal entry by ID
 * @access  Private
 */
router.get("/:id", authenticate, getJournalById);

/**
 * @route   DELETE /api/journals/delete/:id
 * @desc    Delete a journal entry by ID
 * @access  Private
 */
router.delete("/delete/:id", authenticate, deleteJournal);

// Export the router
module.exports = router;
