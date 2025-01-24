import React, { useState } from "react";
import { supabase } from "../../supabaseClient.ts";

const Signup: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const handleSignup = async (event: React.FormEvent) => {
		event.preventDefault();
		setErrorMsg(null);

		if (password !== confirmPassword) {
			setErrorMsg("Passwords do not match.");
			return;
		}

		// Traditional email/password signup using Supabase v2 API
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { username } },
		});

		if (error) {
			setErrorMsg(error.message);
		} else if (data.user) {
			// Handle successful signup here (e.g., redirect or update auth context)
			console.log("Signed up user:", data.user);
		} else {
			setErrorMsg("Unexpected response from signup.");
		}
	};

	const handleGoogleSignUp = async () => {
		// OAuth signup with Google using Supabase v2 API.
		// Typically, OAuth sign-in for signup and login is handled similarly by the provider.
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
		});
		if (error) {
			setErrorMsg(error.message);
		} else {
			console.log("Google OAuth initiated:", data);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto p-4">
			<h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
			{errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
			<form onSubmit={handleSignup} className="space-y-4">
				<div>
					<label htmlFor="username" className="block mb-1 font-semibold">
						Username
					</label>
					<input
						id="username"
						type="text"
						className="w-full border px-3 py-2 rounded"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="email" className="block mb-1 font-semibold">
						Email
					</label>
					<input
						id="email"
						type="email"
						className="w-full border px-3 py-2 rounded"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="password" className="block mb-1 font-semibold">
						Password
					</label>
					<input
						id="password"
						type="password"
						className="w-full border px-3 py-2 rounded"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="confirmPassword" className="block mb-1 font-semibold">
						Confirm Password
					</label>
					<input
						id="confirmPassword"
						type="password"
						className="w-full border px-3 py-2 rounded"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
				>
					Sign Up
				</button>
			</form>
			<div className="mt-4">
				<button
					onClick={handleGoogleSignUp}
					className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
				>
					Sign Up with Google
				</button>
			</div>
		</div>
	);
};

export default Signup;
