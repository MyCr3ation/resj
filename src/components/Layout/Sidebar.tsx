import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
	return (
		<aside className="w-64 bg-gray-100 min-h-screen p-4">
			<nav>
				<ul>
					<li className="mb-4">
						<Link
							to="/dashboard"
							className="text-lg font-semibold text-gray-700"
						>
							Dashboard
						</Link>
					</li>
					<li className="mb-2">
						<Link
							to="/diary/create"
							className="text-gray-600 hover:text-gray-800"
						>
							Create Journal
						</Link>
					</li>
					<li className="mb-2">
						<Link
							to="/diary/view"
							className="text-gray-600 hover:text-gray-800"
						>
							View Journals
						</Link>
					</li>
					<li className="mb-2">
						<Link to="/resume" className="text-gray-600 hover:text-gray-800">
							Resume
						</Link>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
