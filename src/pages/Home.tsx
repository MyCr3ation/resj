import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md p-6 bg-white rounded shadow">
				<h1 className="text-3xl font-bold text-center mb-6">Welcome to ResJ</h1>
				<div className="flex flex-col space-y-4">
					<Link
						to="/login"
						className="w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
					>
						Login
					</Link>
					<Link
						to="/signup"
						className="w-full text-center bg-green-500 text-white py-2 rounded hover:bg-green-600"
					>
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
