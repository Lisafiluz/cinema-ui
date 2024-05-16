import React, {useEffect, useState} from 'react';
import {SERVER_HOST} from '../config';
import Navbar from './Navbar';
import "../styles/Modal.css"
import "../App.css"
import ConfirmationComponent from "./ConfirmationComponent";

function AdminMoviesPage() {
	const [showConfirmation, setConfirmation] = useState(false);
	const [movies, setMMovies] = useState(null);
	const jwt = sessionStorage.getItem('jwt');
	const [showMovieDetails, setShowMovieDetails] = useState(false);
	const [movieId, setSelectedMovie] = useState('');

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [releaseDate, setReleaseDate] = useState('');
	const [genre, setGenre] = useState('');
	const [picUrl, setPicUrl] = useState('');
	const [trailerUrl, setTrailerUrl] = useState('');
	const [duration, setDuration] = useState('');
	const [isPopular, setIsPopular] = useState('');
	const [review, setReview] = useState('');

	function fetchData() {
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
						setMMovies(data.entities);
					} else {
						console.error(data.message);
						if (data.status === 401) {
							alert(data.message)
							window.location.href = '/';
						}
					}
				})
				.catch(error => console.error('Error fetching movies:', error));
	}

	useEffect(() => {
		fetchData();
	}, []);

	if (!movies) {
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

	const handleEditMovie = (movie) => {
		setTitle(movie.title)
		setDescription(movie.description)
		setReleaseDate(formatDate(movie.releaseDate))
		setGenre(movie.genre)
		setPicUrl(movie.picUrl)
		setTrailerUrl(movie.trailerUrl)
		setDuration(movie.duration)
		setIsPopular(movie.isPopular)
		setReview(movie.review)

		setSelectedMovie(movie.movieId);
		setShowMovieDetails(true);
	}

	function handleSubmit() {
		fetch(`${SERVER_HOST}/movie`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwt}`
			},
			body: JSON.stringify({
				movieId,
				title,
				description,
				releaseDate,
				genre,
				picUrl,
				trailerUrl,
				duration,
				isPopular,
				review
			})
		})
				.then(response => {
					if (!response.ok) {
						response.json().then(data => alert(data.message))
					}
					setShowMovieDetails(false)
					setConfirmation(true)
					fetchData()
				})
				.catch(error => {
					console.error('Error in edit movie:', error);
				});
	}

	return (
			<div>
				<Navbar/>
				<div style={{overflowX: "auto"}}>
					<table className="table table-striped">
						<thead>
						<tr>
							<th>Movie ID</th>
							<th>Title</th>
							<th>Description</th>
							<th>Released Date</th>
							<th>Genre</th>
							<th>Picture URL</th>
							<th>Trailer URL</th>
							<th>Duration</th>
							<th>Is Popular</th>
							<th>Review</th>
							<th>Actions</th>
						</tr>
						</thead>
						<tbody>
						{movies.map(movie => (
								<tr key={movie.movieId}>
									<td>{movie.movieId}</td>
									<td>{movie.title}</td>
									<td>{movie.description}</td>
									<td>{formatDate(movie.releaseDate)}</td>
									<td>{movie.genre}</td>
									<td>{movie.picUrl}</td>
									<td style={{maxWidth:"120px"}}>{movie.trailerUrl}</td>
									<td>{movie.duration}</td>
									<td>{movie.isPopular.toString()}</td>
									<td>{movie.review}</td>
									<td>
										<div className="btn-group" role="group" aria-label="...">
											<button type="button" className="btn btn-warning btn-sm" style={{fontSize: "inherit"}}
											        onClick={() => handleEditMovie(movie)}>Edit
											</button>
											{/*<button type="button" className="btn btn-danger btn-sm"*/}
											{/*        onClick={() => handleCancelOrder(movie.movieId)}>Cancel*/}
											{/*</button>*/}
										</div>
									</td>
								</tr>
						))}
						</tbody>
					</table>
				</div>
				{showMovieDetails && (
						<div className="modal">
							<div className="modal-content">
								<span className="close" onClick={() => setShowMovieDetails(false)}>&times;</span>
								<h2>Movie Update</h2>
								<div>
									<label htmlFor="title">Title:</label>
									<input
											className='form-control'
											type="text"
											id="title"
											value={title}
											onChange={e => setTitle(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="description">Description:</label>
									<input
											className='form-control'
											id="description"
											value={description}
											onChange={e => setDescription(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="releaseDate">Release Date:</label>
									<input
											className='form-control'
											id="releaseDate"
											type={"datetime-local"}
											value={releaseDate}
											onChange={e => setReleaseDate(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="genre">Genre:</label>
									<input
											className='form-control'
											id="genre"
											value={genre}
											onChange={e => setGenre(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="picUrl">Picture URL:</label>
									<input
											className='form-control'
											id="picUrl"
											value={picUrl}
											onChange={e => setPicUrl(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="trailerUrl">Trailer URL:</label>
									<input
											className='form-control'
											id="trailerUrl"
											value={trailerUrl}
											onChange={e => setTrailerUrl(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="duration">Duration:</label>
									<input
											className='form-control'
											id="duration"
											type={"number"}
											value={duration}
											onChange={e => setDuration(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="trailerUrl">Is Popular:</label>
									<input
											className='form-control'
											id="isPopular"
											value={isPopular}
											onChange={e => setIsPopular(e.target.value)}
									/>
								</div>
								<div>
									<label htmlFor="trailerUrl">Review:</label>
									<input
											className='form-control'
											id="review"
											type={"number"}
											value={review}
											onChange={e => setReview(e.target.value)}
									/>
								</div>
								<div className='login-container'>
									<button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
								</div>
							</div>
						</div>
				)}

				{showConfirmation && <ConfirmationComponent/>}
			</div>

	);
}

export default AdminMoviesPage