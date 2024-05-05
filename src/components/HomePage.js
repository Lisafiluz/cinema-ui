import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import Card from './MovieCard';
import {SERVER_HOST} from '../config';

const HomePage = () => {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const response = await fetch(`${SERVER_HOST}/movie/popular`);
				if (!response.ok) {
					throw new Error('Something went wrong!');
				}
				const data = await response.json();
				if (data.success) {
					setMovies(data.entities);
					setIsLoading(false);
				} else {
					console.error(data.message);
				}
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
				<Navbar/>
				<div className="container">
					<div className="row">
						{movies.map((movie) => (
								<div class="col-sm-6 col-md-4" key={movie.movieId}>
									<div class="thumbnail">
										<Card movie={movie}/>
									</div>
								</div>
						))}
					</div>
				</div>
			</div>
	);
};

export default HomePage;