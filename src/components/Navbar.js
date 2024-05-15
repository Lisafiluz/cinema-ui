import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {SERVER_HOST} from "../config";

const Navbar = () => {

	const [isAdmin, setIsAdmin] = useState(false)

	function handleLogOutClick() {
		if (sessionStorage.getItem('jwt') !== null) {
			sessionStorage.removeItem('jwt');
			sessionStorage.removeItem('username')
			window.location.href = "/"
		}
	}

	useEffect( () => {
		fetch(`${SERVER_HOST}/admin/is-admin`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
			}
		})
				.then(response => response.json())
				.then(data => {
					setIsAdmin(data === true ? data : false)
				})
				.catch(error => console.error('Error fetching admin details:', error));
	}, [])

	return (
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">My Movie App</Link>
					<div className="collapse navbar-collapse">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							{sessionStorage.getItem('username') !== null && <li>
								<div className="nav-link" style={{color: '#0d6efd'}}>Hello {sessionStorage.getItem('username')}</div>
							</li>}
							<li className="nav-item">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							<li>
								<Link className='nav-link' to={{pathname: "/orders", search: "?key=user"}}>My Orders</Link>
							</li>
							{isAdmin && <li>
								<Link className='nav-link' to="/admin">Admin Workspace</Link>
							</li>}
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