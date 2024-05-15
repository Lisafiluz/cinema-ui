import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {MOVIES_PIC_DIR, SERVER_HOST} from '../config';
import Navbar from './Navbar';

function MovieDetailsPage() {
	const {movieId} = useParams();
	const [movieDetails, setMovieDetails] = useState(null);
	const [showTrailer, setShowTrailer] = useState(false);


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

	function handleTrailerClick() {
		setShowTrailer(true);

	}
	var details;
	var screens;
	if (movieDetails.length === 0) {
		details = <div style={{fontSize: '30px', textAlign: 'center', margin: 'auto'}}>Comming soon...</div>
		screens = <div></div>
	} else {
		details = (<>
			<div className="movie-description">
				<div className="movie-title">
					<h3><u>{movieDetails[0].movie.title}</u></h3>
					<div>
						<button className="btn btn-outline-primary" onClick={handleTrailerClick}>Trailer</button>
					</div>
				</div>
				<div className="movie-info">
					<div><u>Description</u>: {movieDetails[0].movie.description}</div>
					<div><u>Genre</u>: {movieDetails[0].movie.genre}</div>
					<div><u>Release Date</u>: {new Date(movieDetails[0].movie.releaseDate).toDateString()}</div>
					<div><u>Review</u>: {movieDetails[0].movie.review}</div>
					<div><u>Duration</u>: {movieDetails[0].movie.duration} minutes</div>
				</div>
				<div className="img-container">
					<img src={MOVIES_PIC_DIR+movieDetails[0].movie.picUrl} alt={movieDetails[0].movie.title} style={{maxHeight: '200px'}}/>
				</div>
			</div>
		</>)


		screens =
				<>
					<div className="container mt-4">
						<h4 style={{textAlign:"center"}}>Choose screen</h4>
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
				{showTrailer && <div className="modal">
					<div className="modal-content">
						<span className="close" onClick={() => setShowTrailer(false)}>&times;</span>
						<iframe width='inherit' height='300px' src={movieDetails[0].movie.trailerUrl} title="YouTube video player"
						        frameBorder="0"
						        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
					</div>
				</div>}
			</div>

	);
}

export default MovieDetailsPage