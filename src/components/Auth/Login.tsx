import React, { useState } from "react";
import { supabase } from "../../supabaseClient.ts";

const Login: React.FC = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [errorMsg, setErrorMsg] = useState<string | null>(null);

	const handleLogin = async (event: React.FormEvent) => {
		event.preventDefault();
		setErrorMsg(null);

		// Traditional email/password login using Supabase v2 API
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setErrorMsg(error.message);
		} else if (data.session && data.user) {
			// Handle successful login here (e.g., redirect or update auth context)
			console.log("Logged in user:", data.user);
		} else {
			setErrorMsg("Unexpected response from login.");
		}
	};

	const handleGoogleSignIn = async () => {
		// OAuth login for Google using Supabase v2 API
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: "google",
		});
		if (error) {
			setErrorMsg(error.message);
		} else {
			// Supabase typically handles the redirection automatically for OAuth providers.
			console.log("Google OAuth initiated:", data);
		}
	};

	return (
		<div className="w-full max-w-md mx-auto p-4">
			<h2 className="text-xl font-bold mb-4 text-center">Login</h2>
			{errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
			<form onSubmit={handleLogin} className="space-y-4">
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
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
				>
					Login
				</button>
			</form>
			<div className="mt-4">
				<button
					onClick={handleGoogleSignIn}
					className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
				>
					Sign in with Google
				</button>
			</div>
		</div>
	);
};

export default Login;
