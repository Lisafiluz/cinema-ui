import React from 'react';

const MovieCard = ({ movie }) => {
	// Construct the image URL (you may need to prepend a base URL for images)
	const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

	return (
			<div className="card" style={{ width: '18rem' }}>
				<img src={imageUrl} className="card-img-top" alt={movie.title} />
				<div className="card-body">
					<h5 className="card-title">{movie.title}</h5>
					<p className="card-text">{movie.overview}</p>
					<p className="card-text">Rating: {movie.vote_average}</p>
					{/* Add more movie details as needed */}
				</div>
			</div>
	);
};

export default MovieCard;