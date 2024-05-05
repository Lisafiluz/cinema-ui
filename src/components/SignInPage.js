import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../styles/Signin.css';
import {SERVER_HOST} from '../config';

function SignInPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = () => {
		fetch(`${SERVER_HOST}/api/auth/signin`, {
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
						const previousPath = sessionStorage.getItem('previousPath');
						window.location.href = previousPath || '/';
					} else {
						console.error(data.message);
						alert('Login failed. Please check your username and password.');
					}
				})
				.catch(error => {
					console.error('Error signing in:', error);
					alert('Login failed. Please try again later.');
				});
	};

	return (
			// <Form>
			//   <Form.Group className="mb-3" controlId="formBasicEmail">
			//     <Form.Label>Username</Form.Label>
			//     <Form.Control placeholder="Enter username" id='username' value={username} onChange={e => setUsername(e.target.value)} />
			//     {/* <Form.Text className="text-muted">

			//     </Form.Text> */}
			//   </Form.Group>

			//   <Form.Group className="mb-3" controlId="formBasicPassword">
			//     <Form.Label>Password</Form.Label>
			//     <Form.Control type="password" placeholder="Password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
			//   </Form.Group>
			//   <Button variant="primary" type="submit" onClick={handleLogin}>
			//     Login
			//   </Button>
			// </Form>


			/* <form class="form-horizontal">
			  <div class="form-group">
				<label for="username" class="col-sm-2 control-label">Username</label>
				<div class="col-sm-10">
				  <input type="text"
						id="username"
						class="form-control"
						placeholder="Username"
						value={username}
						onChange={e => setUsername(e.target.value)}/>
				</div>
			  </div>
			  <div class="form-group">
				<label for="password" class="col-sm-2 control-label">Password</label>
				<div class="col-sm-10">
				  <input type="password"
						class="form-control"
						placeholder="Password"
						id="password"
						value={password}
						onChange={e => setPassword(e.target.value)}/>
				</div>
			  </div>
			  <div class="form-group">
				<div class="col-sm-offset-2 col-sm-10">
				  <button class="btn btn-default" onClick={handleLogin}>Sign in</button>
				</div>
			  </div>
			</form> */


			<div className='sign-in-container'>
				<h2 style={{textAlign: 'center'}}>Sign In</h2>
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
					<button className="btn btn-primary" onClick={handleLogin}>Sign In</button>
				</div>
			</div>
	);
}

export default SignInPage;