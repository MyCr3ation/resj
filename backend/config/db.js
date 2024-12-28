const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Destructure environment variables for database connection
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Initialize Sequelize instance
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: "postgres",
	logging: false, // Disable logging; enable if you need to debug
	pool: {
		max: 5, // Maximum number of connection in pool
		min: 0, // Minimum number of connection in pool
		acquire: 30000, // The maximum time, in milliseconds, that pool will try to get connection before throwing error
		idle: 10000, // The maximum time, in milliseconds, that a connection can be idle before being released
	},
});

// Function to test database connection
const testDBConnection = async () => {
	try {
		await sequelize.authenticate();
		console.log("✅ Database connection has been established successfully.");
	} catch (error) {
		console.error("❌ Unable to connect to the database:", error);
		process.exit(1); // Exit process with failure
	}
};

// Invoke the test function
testDBConnection();

// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize;
