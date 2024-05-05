import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {SERVER_HOST} from '../config';
import Navbar from './Navbar';

function MovieDetailsPage() {
	const {movieId} = useParams();
	const [movieDetails, setMovieDetails] = useState(null);

	useEffect(() => {
		fetch(`${SERVER_HOST}/screen/get-by-movie?movieId=${movieId}`)
				.then(response => response.json())
				.then(data => {
					if (data.success) {
						setMovieDetails(data.entities);
					} else {
						console.error(data.message);
					}
				})
				.catch(error => console.error('Error fetching movie details:', error));
	}, [movieId]);

	if (!movieDetails) {
		return <div>Loading...</div>;
	}
	var details;
	var screens;
	if (movieDetails.length === 0) {
		details = <div style={{fontSize: '30px', textAlign: 'center', margin: 'auto'}}>Comming soon...</div>
		screens = <div></div>
	} else {
		details = (<>
			<h2>{movieDetails[0].movie.title}</h2>
			<img src={movieDetails[0].movie.picUrl} alt={movieDetails[0].movie.title}/>
			<p>Description: {movieDetails[0].movie.description}</p>
			<p>Genre: {movieDetails[0].movie.genre}</p>
			<p>Release Date: {new Date(movieDetails[0].movie.releaseDate).toDateString()}</p>
		</>)


		screens =
				<>
					<h3>Screens:</h3>
					<div className="container mt-4">
						<div className="row">
							{movieDetails.map(screen => (
									<div className='col-md-4 mb-3' style={{margin: '10px', width: '300px'}}>
										<div className='card'>
											<Link key={screen.screenId} to={`/screen/${screen.screenId}`} className="link">
												<div key={screen.screenId} className='card-body'>
													<p className="card-text screen-card-text">Hall: {screen.hall.name}</p>
													<p className="card-text screen-card-text">Date: {new Date(screen.date).toDateString()}</p>
												</div>
											</Link>
										</div>
									</div>
							))}
						</div>
					</div>
				</>
	}
	return (
			<div>
				<Navbar/>
				{details}
				{screens}
			</div>

	);
}

export default MovieDetailsPage