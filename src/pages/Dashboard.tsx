import React from "react";
import Sidebar from "../components/Layout/Sidebar.tsx";
import Header from "../components/Layout/Header.tsx";

const Dashboard: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<div className="flex flex-1">
				<Sidebar />
				<main className="flex-1 p-6">
					<h2 className="text-2xl font-bold mb-4">Dashboard</h2>
					<p>
						Welcome to your dashboard! Here you can manage your journal entries
						and resume.
					</p>
				</main>
			</div>
		</div>
	);
};

export default Dashboard;
