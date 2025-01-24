import React from "react";
import { supabase } from "../../supabaseClient.ts";

const OAuthSignIn: React.FC = () => {
	const handleGoogleSignIn = async () => {
		// Supabase v2: use signInWithOAuth instead of signIn
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
		});

		if (error) {
			console.error("Error with Google sign-in:", error.message);
		} else {
			// Supabase will redirect automatically for OAuth
			console.log("OAuth sign-in initiated:", data);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto mt-4">
			<button
				onClick={handleGoogleSignIn}
				className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
			>
				Sign In with Google
			</button>
		</div>
	);
};

export default OAuthSignIn;
