import React, {useEffect, useState} from 'react';
import {SERVER_HOST} from '../config';
import "../styles/Admin.css"
import Navbar from './Navbar';
import {Link} from "react-router-dom";

function AdminPage() {
	const [, setIsAdmin] = useState(false);
	const jwt = sessionStorage.getItem('jwt');


	useEffect(() => {
		fetch(`${SERVER_HOST}/admin/is-admin`, {
			method: "GET",
			headers: {
				'Authorization': `Bearer ${jwt}`
			}
		})
				.then(response => response.json())
				.then(data => {
					if (!data || data.status === 403) {
						window.location.href = '/';
						console.error('Not an admin:', data)
					}
					setIsAdmin(data);
				})
				.catch(error => console.error('Error fetching admin details:', error));
	}, []);


	function handleComingSoon() {
		alert("NOT IMPLEMENTED YET")
	}

	return (
			<div>
				<Navbar/>
				<div className="admin-menu-container">
					<div className="admin-card" key="Movies">
						<Link className='nav-link' to={{ pathname: "/admin/movies" }}>Movies</Link>
					</div>
					<div className="admin-card" key="Halls" onClick={() => {handleComingSoon()}}>Halls</div>
					<div className="admin-card" key="Screens" onClick={() => {handleComingSoon()}}>Screens</div>
					<div className="admin-card" key="Orders">
						<Link className='nav-link' to={{ pathname: "/orders", search: "?key=admin" }}>Orders</Link>
					</div>
					<div className="admin-card" key="Users" onClick={() => {handleComingSoon()}}>Users</div>
				</div>
			</div>
	);
}

export default AdminPage;