import React from 'react';

const MovieCard = ({ movie }) => {
	// Construct the image URL (you may need to prepend a base URL for images)
	const imageUrl = `https://image.tmdb.org/t/p/w500${movie.picUrl}`;

	return (
			<div className="card" style={{ width: '18rem' }}>
				<img src={imageUrl} className="card-img-top" alt={movie.title} />
				<div className="card-body">
					<h5 className="card-title">{movie.title}</h5>
					<p className="card-text">{movie.description}</p>
					<p className="card-text">Rating: {movie.review}</p>
					<p className="card-text">Genre: {movie.genre}</p>
					<p className="card-text">Release Date: {new Date(movie.releaseDate).getFullYear()}</p>
					{/* Add more movie details as needed */}
				</div>
			</div>
	);
};

export default MovieCard;