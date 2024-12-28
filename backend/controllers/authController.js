// backend/controllers/authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/User"); // Sequelize User model
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const { JWT_SECRET } = process.env;

// User Signup Controller
exports.signup = async (req, res) => {
	const { name, email, password } = req.body;

	try {
		// Check if user already exists
		const existingUser = await User.findOne({ where: { Email: email } });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "⚠️ User already exists with this email." });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create new user
		const newUser = await User.create({
			Name: name,
			Email: email,
			Password: hashedPassword,
		});

		// Generate JWT Token
		const token = jwt.sign(
			{ Uid: newUser.Uid, Email: newUser.Email },
			JWT_SECRET,
			{ expiresIn: "1h" }
		);

		res.status(201).json({
			message: "✅ User created successfully.",
			token,
			user: {
				Uid: newUser.Uid,
				Name: newUser.Name,
				Email: newUser.Email,
			},
		});
	} catch (error) {
		console.error("❌ Error during user signup:", error);
		res
			.status(500)
			.json({ message: "🔥 Internal Server Error", error: error.message });
	}
};

// User Login Controller
exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Find user by email
		const user = await User.findOne({ where: { Email: email } });
		if (!user) {
			return res
				.status(400)
				.json({ message: "⚠️ No user found with this email." });
		}

		// Compare passwords
		const isMatch = await bcrypt.compare(password, user.Password);
		if (!isMatch) {
			return res.status(400).json({ message: "⚠️ Incorrect password." });
		}

		// Generate JWT Token
		const token = jwt.sign({ Uid: user.Uid, Email: user.Email }, JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(200).json({
			message: "✅ Logged in successfully.",
			token,
			user: {
				Uid: user.Uid,
				Name: user.Name,
				Email: user.Email,
			},
		});
	} catch (error) {
		console.error("❌ Error during user login:", error);
		res
			.status(500)
			.json({ message: "🔥 Internal Server Error", error: error.message });
	}
};

// OAuth Sign-In Controller (Placeholder)
exports.oauthSignIn = async (req, res) => {
	// Implement OAuth logic here (e.g., Google OAuth)
	// This is a placeholder and needs to be implemented based on your OAuth provider
	res.status(501).json({ message: "🚧 OAuth Sign-In not implemented yet." });
};
