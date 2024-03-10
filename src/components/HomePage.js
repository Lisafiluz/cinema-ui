import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';

const HomePage = () => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				// Replace with your actual API endpoint if different
				const response = await fetch('/movie/popular');
				if (!response.ok) {
					throw new Error('Something went wrong!');
				}
				const data = await response.json();
				setMovies(data.results); // Assuming the API returns an object with a 'results' array
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
								<div className="col-md-4 mb-3" key={movie.id}>
									<MovieCard movie={movie} />
								</div>
						))}
					</div>
				</div>
			</div>
	);
};

export default HomePage;