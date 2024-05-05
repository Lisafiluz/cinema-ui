import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
	function handleLogOutClick() {
		if (sessionStorage.getItem('jwt') !== null) {
			sessionStorage.removeItem('jwt');
			window.location.href = "/"
		}
	}

	return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">My Movie App</Link>
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							{sessionStorage.getItem('username') !== null && <li>
								<div className="nav-link" style={{color:'#0d6efd'}}>Hello {sessionStorage.getItem('username')}</div>
							</li>}
							<li className="nav-item">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							<li>
								<Link className='nav-link' to="/orders">My Orders</Link>
							</li>
							{sessionStorage.getItem('jwt') === null && <li>
								<Link className='nav-link' to="/signin">Sign-In</Link>
							</li>}
							{sessionStorage.getItem('jwt') === null && <li>
								<Link className='nav-link' to="/signup">Sign-Up</Link>
							</li>}
							{sessionStorage.getItem('jwt') !== null && <li>
								<Link className='nav-link' to="/" onClick={() => handleLogOutClick()}>Log-Out</Link>
							</li>}
						</ul>
					</div>
				</div>
			</nav>
	);
};

export default Navbar;