// backend/server.js

// ==========================
// Import Dependencies
// ==========================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

// Load environment variables from .env file
dotenv.config();

// Import configurations
const sequelize = require("./config/db");
const supabase = require("./config/supabase");

// Import routes
const authRoutes = require("./routes/authRoutes");
const journalRoutes = require("./routes/journalRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

// Import models and initialize associations
const models = require("./models");
models.initModels();

// Initialize Express app
const app = express();

// ==========================
// Apply Middleware
// ==========================

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));

// ==========================
// Mount Routes
// ==========================

// Ensure that route files export a router
app.use("/api/auth", authRoutes);
app.use("/api/journals", journalRoutes);
app.use("/api/resume", resumeRoutes);

// ==========================
// Root Route
// ==========================

app.get("/", (req, res) => {
	res.send("🚀 Welcome to the ResJ Backend API!");
});

// ==========================
// Error Handling Middleware
// ==========================

// 404 Not Found Handler
app.use((req, res, next) => {
	res.status(404).json({ message: "🚫 Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
	console.error("🔥 Internal Server Error:", err);
	res
		.status(500)
		.json({ message: "🔥 Internal Server Error", error: err.message });
});

// ==========================
// Database Connection and Server Start
// ==========================

const PORT = process.env.PORT || 5500;

const startServer = async () => {
	try {
		// Test database connection
		await sequelize.authenticate();
		console.log("✅ Database connection established successfully.");

		// Sync models with the database
		await sequelize.sync({ alter: true });
		console.log("✅ All models were synchronized successfully.");

		// Start the server
		app.listen(PORT, () => {
			console.log(`🚀 Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.error("❌ Unable to connect to the database:", error);
		process.exit(1); // Exit with failure
	}
};

// Invoke the function to start the server
startServer();
