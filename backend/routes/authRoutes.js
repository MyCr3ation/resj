// backend/routes/authRoutes.js

const express = require("express");
const router = express.Router();

// Import Controllers
const { signup, login, oauthSignIn } = require("../controllers/authController");

// (Optional) Import Validation Middleware
// const { validateSignup, validateLogin } = require('../middleware/validate');

// Define Routes

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post("/signup", /* validateSignup, */ signup);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user and get token
 * @access  Public
 */
router.post("/login", /* validateLogin, */ login);

/**
 * @route   POST /api/auth/oauth
 * @desc    Authenticate user via OAuth (e.g., Google)
 * @access  Public
 */
router.post("/oauth", oauthSignIn);

// Export the router
module.exports = router;
