import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';

const API_BASE_URL = 'http://localhost:8080';
const HomePage = () => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				// Replace with your actual API endpoint if different
				const response = await fetch(`${API_BASE_URL}/movie/popular`);
				if (!response.ok) {
					throw new Error('Something went wrong!');
				}
				const data = await response.json();
				console.log(data)
				setMovies(data.entities);
				setIsLoading(false);
			} catch (err) {
				setError(err.message);
				setIsLoading(false);
			}
		};

		fetchMovies();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
			<div>
				<Navbar />
				<div className="container mt-4">
					<div className="row">
						{movies.map((movie) => (
								<div className="col-md-4 mb-3" key={movie.movieId}>
									<MovieCard movie={movie} />
								</div>
						))}
					</div>
				</div>
			</div>
	);
};

export default HomePage;