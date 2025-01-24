import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
	return (
		<header className="bg-white shadow p-4 flex justify-between items-center">
			<h1 className="text-2xl font-bold text-gray-800">ResJ</h1>
			<nav>
				<ul className="flex space-x-4">
					<li>
						<Link to="/dashboard" className="text-gray-600 hover:text-gray-800">
							Dashboard
						</Link>
					</li>
					<li>
						<Link to="/profile" className="text-gray-600 hover:text-gray-800">
							Profile
						</Link>
					</li>
					<li>
						<Link to="/logout" className="text-gray-600 hover:text-gray-800">
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
