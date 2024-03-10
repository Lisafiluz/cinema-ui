import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">My Movie App</Link>
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							{/* Add your links here */}
							<li className="nav-item">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							{/* Add more links as needed */}
						</ul>
					</div>
				</div>
			</nav>
	);
};

export default Navbar;