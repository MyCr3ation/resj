const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Destructure environment variables for Supabase connection
const { SUPABASE_URL, SUPABASE_KEY } = process.env;

// Validate Supabase environment variables
if (!SUPABASE_URL || !SUPABASE_KEY) {
	console.error(
		"❌ Supabase URL and Key are not defined in the environment variables."
	);
	process.exit(1); // Exit process with failure
}

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Export the Supabase client for use in other parts of the application
module.exports = supabase;
