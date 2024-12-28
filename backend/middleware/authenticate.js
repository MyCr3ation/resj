// backend/middleware/authenticate.js

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const { JWT_SECRET } = process.env;

// Authentication Middleware
const authenticate = (req, res, next) => {
	const authHeader = req.headers.authorization;

	// Check if authorization header is present
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res
			.status(401)
			.json({ message: "❌ Unauthorized: No token provided" });
	}

	const token = authHeader.split(" ")[1];

	try {
		// Verify JWT token
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded; // Attach decoded token to request object
		next(); // Proceed to the next middleware or route handler
	} catch (error) {
		return res.status(401).json({ message: "❌ Unauthorized: Invalid token" });
	}
};

module.exports = authenticate;
