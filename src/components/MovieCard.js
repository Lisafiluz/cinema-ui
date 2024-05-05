import React from 'react';
import '../styles/Card.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Card = ({movie}) => {
	// Construct the image URL (you may need to prepend a base URL for images)
	const imageUrl = `https://image.tmdb.org/t/p/w500${movie.picUrl}`;

	return (
			<>
				<img src={imageUrl} className="" alt={movie.title}/>
				<div className="caption">
					<h5 className="">{movie.title}</h5>
					<p className="">{movie.description}</p>
					<p className="">Rating: {movie.review}</p>
					<p className="">Genre: {movie.genre}</p>
					<p className="">Release Date: {new Date(movie.releaseDate).getFullYear()}</p>
					<p>
						<a href={`/movie/${movie.movieId}`} className="btn btn-primary" role="button">Order</a>
						{/* <a href="#" class="btn btn-default" role="button">Button</a> */}
					</p>
				</div>
				{/* <div className="card" style={{ width: '18rem' }}>
				<Link key={movie.movieId} to={`/movie/${movie.movieId}`} className="link">
				<img src={imageUrl} className="card-img-top" alt={movie.title} />
				<div className="card-body">
					<h5 className="card-title">{movie.title}</h5>
					<p className="card-text">{movie.description}</p>
					<p className="card-text">Rating: {movie.review}</p>
					<p className="card-text">Genre: {movie.genre}</p>
					<p className="card-text">Release Date: {new Date(movie.releaseDate).getFullYear()}</p>
				</div>
			</Link>
		</div> */}
			</>
	);
};

export default Card;