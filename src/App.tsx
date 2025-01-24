// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Login from "./components/Auth/Login.tsx";
import Signup from "./components/Auth/Signup.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import JournalDetail from "./pages/JournalDetail.tsx";
import Resume from "./pages/Resume.tsx";

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				{/* Define your routes */}
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/journals/:id" element={<JournalDetail />} />
				<Route path="/resume" element={<Resume />} />
			</Routes>
		</Router>
	);
};

export default App;
