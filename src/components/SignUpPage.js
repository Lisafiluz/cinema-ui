import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/Signin.css';
import {SERVER_HOST} from '../config';
import Navbar from "./Navbar";

function SignUpPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSignUp = () => {
		fetch(`${SERVER_HOST}/api/auth/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		})
				.then(response => response.json())
				.then(data => {
					if (data.success) {
						sessionStorage.setItem('jwt', data.entities[0].jwt);
						window.location.href = '/signin';
					} else {
						console.error(data.message);
						alert(data.message);
					}
				})
				.catch(error => {
					console.error('Error signing in:', error);
					alert('Login failed. Please try again later.');
				});
	};

	return (

			<div>
				<Navbar/>
				<div className='sign-in-container'>
					<h2 style={{textAlign: 'center'}}>Sign Up</h2>
					<div>
						<label htmlFor="username">Username:</label>
						<input
								className='form-control'
								type="text"
								id="username"
								value={username}
								onChange={e => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password">Password:</label>
						<input
								className='form-control'
								type="password"
								id="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div className='login-container'>
						<button className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
					</div>
				</div>
			</div>
	);
}

export default SignUpPage;