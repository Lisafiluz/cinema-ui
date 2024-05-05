import React from 'react';
import '../styles/Card.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Card = ({movie}) => {
	return (
			<>
				<div className="card caption card-cont">
					<div className="movie-card-desc">
						<h5 className="">{movie.title}</h5>
						<div className="">{movie.description}</div>
						<div className="">Rating: {movie.review}</div>
						<div className="">Genre: {movie.genre}</div>
						<div className="">Release Date: {new Date(movie.releaseDate).getFullYear()}</div>
						<div>
							<a href={`/movie/${movie.movieId}`} className="btn btn-outline-primary" role="button">Order</a>
							{/* <a href="#" class="btn btn-default" role="button">Button</a> */}
						</div>
					</div>
					<div>
						<img src={movie.picUrl} className="" alt={movie.title}/>
					</div>
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