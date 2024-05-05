import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {SERVER_HOST} from '../config';
import "../styles/Seats.css"
import Navbar from './Navbar';

function ScreenPage() {
	const {screenId} = useParams();
	const [screenDetails, setScreenDetails] = useState(null);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [formattedDate, setFormattedDate] = useState('');
	const jwt = sessionStorage.getItem('jwt');


	useEffect(() => {
		fetch(`${SERVER_HOST}/screen/${screenId}`)
				.then(response => response.json())
				.then(data => {
					if (data.success) {
						setScreenDetails(data.entities[0]);
						const rawDate = new Date(data.entities[0].date);
						const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
						setFormattedDate(rawDate.toLocaleDateString('en-US', options));
					} else {
						console.error(data.message);
					}
				})
				.catch(error => console.error('Error fetching screen details:', error));
	}, [screenId]);

	if (!screenDetails) {
		return <div>Loading...</div>;
	}

	const {movie, hall, seats} = screenDetails;
	const {rows, cols} = hall;

	const handleSeatClick = (row, col) => {
		const updatedSelectedSeats = [...selectedSeats];
		const index = updatedSelectedSeats.findIndex(seat => seat.row === row && seat.col === col);

		if (index !== -1) {
			// If seat is already selected, deselect it
			updatedSelectedSeats.splice(index, 1);
		} else {
			// If seat is not selected, add it to selected seats
			updatedSelectedSeats.push({row, col});
		}

		setSelectedSeats(updatedSelectedSeats);
	};
	const seatGrid = [];
	for (let i = 0; i < rows; i++) {
		const row = [];
		for (let j = 0; j < cols; j++) {
			const seat = seats.find(s => s.row === i && s.seatNumber === j);
			const seatStatus = seat ? seat.status : 'available';
			const isSelected = selectedSeats.some(s => s.row === i && s.col === j);
			const seatClassName = `seat ${seatStatus} ${isSelected ? 'selected' : ''}`;
			const booked = seatStatus === "BOOKED"
			row.push(
					<div
							key={`${i}-${j}`}
							className={seatClassName}
							onClick={!booked ? () => handleSeatClick(i, j) : null}
					/>
			);
		}
		seatGrid.push(
				<div className='screen-row'>
					<div className='row-number'>{i + 1}</div>
					<div key={i} className="seat-row">{row}</div>
				</div>
		);
	}

	const handleOrderClick = () => {
		if (selectedSeats.length === 0) {
			alert('Please select at least one seat.');
			return;
		}

		fetch(`${SERVER_HOST}/order/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${jwt}`
			},
			body: JSON.stringify({
				screenId,
				seats: selectedSeats
			})
		})
				.then(response => {
					if (!response.ok) {
						throw new Error('Failed to place order');
					}
					window.location.href = '/confirmation';
				})
				.catch(error => {
					console.error('Error placing order:', error);
					alert('Failed to place order. Please try again.');
				});
	};

	return (
			<div>
				<Navbar/>
				<h2>{movie.title}</h2>
				<img src={movie.picUrl} alt={movie.title}/>
				<p>Description: {movie.description}</p>
				<p>Genre: {movie.genre}</p>
				<p>Release Date: {new Date(movie.releaseDate).toDateString()}</p>

				<h3>Hall: {hall.name}</h3>
				<h4>Date: {formattedDate}</h4>
				<div className="seating-area">
					<div className="screen">Screen</div>
					<div className="seats-grid">{seatGrid}</div>
					<div class="order-container">
						<button className="order-button" onClick={handleOrderClick}>Order</button>
					</div>
				</div>

			</div>
	);
}

export default ScreenPage;