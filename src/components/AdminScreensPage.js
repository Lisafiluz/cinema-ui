import React, {useEffect, useState} from 'react';
import {SERVER_HOST} from '../config';
import Navbar from './Navbar';
import "../styles/Modal.css"
import "../App.css"
import ConfirmationComponent from "./ConfirmationComponent";

function AdminScreensPage() {
	const [showConfirmation, setConfirmation] = useState(false);
	const [screens, setMScreens] = useState(null);
	const jwt = sessionStorage.getItem('jwt');
	const [showAddScreen, setShowAddScreen] = useState(false);

	const [movieId, setMovieId] = useState('');
	const [hallId, setHallId] = useState('');
	const [date, setDate] = useState('');

	const [movies, setMovies] = useState([]);
	const [halls, setHalls] = useState([]);

	const [showMovies, setShowMovies] = useState(false);
	const [showHalls, setShowHalls] = useState(false);

	function fetchData() {
		fetch(`${SERVER_HOST}/admin/screens`,
				{
					headers: {
						'Authorization': `Bearer ${jwt}`
					}
				})
				.then(response => response.json())
				.then(data => {
					if (data.success) {
						data.entities.sort((a, b) => a.screenId > b.screenId ? 1 : -1)
						setMScreens(data.entities);
					} else {
						console.error(data.message);
						if (data.status === 401) {
							alert(data.message)
							window.location.href = '/';
						}
					}
				})
				.catch(error => console.error('Error fetching screens:', error));
	}

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetch(`${SERVER_HOST}/admin/movies`,
				{
					headers: {
						'Authorization': `Bearer ${jwt}`
					}
				})
				.then(response => response.json())
				.then(data => {
					if (data.success) {
						data.entities.sort((a, b) => a.movieId > b.movieId ? 1 : -1)
						setMovies(data.entities);
					} else {
						console.error(data.message);
						if (data.status === 401) {
							alert(data.message)
							window.location.href = '/';
						}
					}
				})
				.catch(error => console.error('Error fetching movies:', error));
	}, []);

	useEffect(() => {
		fetch(`${SERVER_HOST}/admin/halls`,
				{
					headers: {
						'Authorization': `Bearer ${jwt}`
					}
				})
				.then(response => response.json())
				.then(data => {
					if (data.success) {
						data.entities.sort((a, b) => a.hallId > b.hallId ? 1 : -1)
						setHalls(data.entities);
					} else {
						console.error(data.message);
						if (data.status === 401) {
							alert(data.message)
							window.location.href = '/';
						}
					}
				})
				.catch(error => console.error('Error fetching movies:', error));
	}, []);

	if (!screens) {
		return <div>Loading...</div>;
	}

	function formatDate(date) {
		date = new Date(date)
		const year = date.getUTCFullYear();
		const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const day = String(date.getUTCDate()).padStart(2, '0');
		const hours = String(date.getUTCHours()).padStart(2, '0');
		const minutes = String(date.getUTCMinutes()).padStart(2, '0');
		return `${year}-${month}-${day}T${hours}:${minutes}`;
	}

	function handleSubmit() {
		fetch(`${SERVER_HOST}/screen/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwt}`
			},
			body: JSON.stringify({
				movieId,
				hallId,
				date
			})
		})
				.then(response => {
					if (!response.ok) {
						response.json().then(data => alert(data.message))
					}
					setShowAddScreen(false)
					setConfirmation(true)
					fetchData()
				})
				.catch(error => {
					console.error('Error in add screen:', error);
				});
	}

	function getCapacity(screen) {
		const bookedSeatsCount = screen.seats.filter(seat => seat.status === 'BOOKED').length;
		const numberOfSeats = screen.hall.rows * screen.hall.cols;
		return bookedSeatsCount / numberOfSeats;
	}

	function handleAddScreen() {
		setShowAddScreen(true)
	}

	function handleShowMovies() {
		setShowMovies(true)
	}

	function handleShowHalls() {
		setShowHalls(true)
	}




	function showMoviesModal() {
		return <>
			<div className="modal">
				<div className="modal-content">
					<span className="close" onClick={() => setShowMovies(false)}>&times;</span>
					<h2>Movies List</h2>
					<table className="table modal-table">
						<thead>
						<tr>
							<th>Movie ID</th>
							<th>Title</th>
							<th>Is Popular</th>
							<th>Review</th>
						</tr>
						</thead>
						<tbody>
						{movies.map(movie => (
								<tr key={movie.movieId}>
									<td>{movie.movieId}</td>
									<td>{movie.title}</td>
									<td>{movie.isPopular.toString()}</td>
									<td>{movie.review}</td>
								</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>
		</>;
	}

	function showHallsModal() {
		return <>
			<div className="modal">
				<div className="modal-content">
					<span className="close" onClick={() => setShowHalls(false)}>&times;</span>
					<h2>Halls List</h2>
					<table className="table modal-table">
						<thead>
						<tr>
							<th>Hall ID</th>
							<th>Hall Name</th>
							<th>Number Of Rows</th>
							<th>Seats In Row</th>
						</tr>
						</thead>
						<tbody>
						{halls.map(hall => (
								<tr key={hall.hallId}>
									<td>{hall.hallId}</td>
									<td>{hall.name}</td>
									<td>{hall.rows}</td>
									<td>{hall.cols}</td>
								</tr>
						))}
						</tbody>
					</table>
				</div>
			</div>
		</>;
	}

	return (
			<div>
				<Navbar/>
				<div className="btn-group" style={{width: "100%"}} role="group" aria-label="...">
					<button type="button" className="btn btn-warning btn-sm" style={{fontSize: "inherit"}}
					        onClick={() => handleAddScreen()}>Add Screen
					</button>
					{/*<button type="button" className="btn btn-danger btn-sm"*/}
					{/*        onClick={() => handleCancelOrder(movie.movieId)}>Cancel*/}
					{/*</button>*/}
				</div>
				<div style={{overflowX: "auto"}}>
					<table className="table table-striped">
						<thead>
						<tr>
							<th>#</th>
							<th>Screen ID</th>
							<th>Movie Name</th>
							<th>Screen Date</th>
							<th>Hall Name</th>
							<th>Capacity</th>
						</tr>
						</thead>
						<tbody>
						{screens.map((screen, index) => (
								<tr key={screen.screenId}>
									<td>{index + 1}</td>
									<td>{screen.screenId}</td>
									<td>{screen.movie.title}</td>
									<td>{formatDate(screen.date)}</td>
									<td>{screen.hall.name}</td>
									<td>{(getCapacity(screen) * 100).toFixed(2)}%</td>
								</tr>
						))}
						</tbody>
					</table>
				</div>
				{showAddScreen && (
						<div className="modal">
							<div className="modal-content">
								<span className="close" onClick={() => setShowAddScreen(false)}>&times;</span>
								<h2>Add Screen</h2>

								<div>
									<label htmlFor="movieId">Movie Id:</label>
									<input
											className='form-control'
											type="text"
											id="movieId"
											value={movieId}
											onChange={e => setMovieId(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="hallId">Hall Id:</label>
									<input
											className='form-control'
											type="text"
											id="hallId"
											value={hallId}
											onChange={e => setHallId(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="date">Screen Date:</label>
									<input
											className='form-control'
											id="date"
											type={"datetime-local"}
											value={date}
											onChange={e => setDate(e.target.value)}
									/>
								</div>
								<div style={{display: "flex", justifyContent: "center"}}>
									<div className='login-container'>
										<button className="btn btn-warning" onClick={handleShowMovies}>Show Movies</button>
									</div>
									<div className='login-container'>
										<button className="btn btn-warning" onClick={handleShowHalls}>Show Halls</button>
									</div>
								</div>
								<div className='login-container'>
									<button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
								</div>
							</div>
						</div>
				)}
				{showMovies && showMoviesModal()}
				{showHalls && showHallsModal()}


				{showConfirmation && <ConfirmationComponent/>}
			</div>

	);
}

export default AdminScreensPage