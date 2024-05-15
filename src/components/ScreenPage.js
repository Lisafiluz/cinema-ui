import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {MOVIES_PIC_DIR, SERVER_HOST} from '../config';
import "../styles/Seats.css"
import "../styles/Card.css"
import Navbar from './Navbar';
import ConfirmationComponent from "./ConfirmationComponent";

function ScreenPage() {
	const {screenId} = useParams();
	const [screenDetails, setScreenDetails] = useState(null);
	const [selectedSeats, setSelectedSeats] = useState([]);
	const [formattedDate, setFormattedDate] = useState('');
	const [showTrailer, setShowTrailer] = useState(false);
	const [showConfirmation, setConfirmation] = useState(false);
	const jwt = sessionStorage.getItem('jwt');


	function fetchData() {
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
	}

	useEffect(() => {
		fetchData();
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
						if (response.status === 401) {
							alert("Unauthorized!")
						} else {
							alert("Please try again")
						}
					} else {
						setSelectedSeats([])
						setConfirmation(true)
						fetchData()
					}
				})
				.catch(error => {
					console.error('Error placing order:', error);
				});
	};

	function handleTrailerClick() {
		setShowTrailer(true);

	}

	return (
			<>
				<Navbar/>
				<div className="movie-description">
					<div className="movie-title">
						<h3><u>{movie.title}</u></h3>
						<div className="screen-description">
							<div><u>Hall</u>: {hall.name}</div>
							<div><u>Date</u>: {formattedDate}</div>
						</div>
						<div>
							<button className="btn btn-outline-primary" onClick={handleTrailerClick}>Trailer</button>
						</div>
					</div>
					<div className="movie-info">
						<div><u>Description</u>: {movie.description}</div>
						<div><u>Genre</u>: {movie.genre}</div>
						<div><u>Release Date</u>: {new Date(movie.releaseDate).toDateString()}</div>
						<div><u>Review</u>: {movie.review}</div>
						<div><u>Duration</u>: {movie.duration} minutes</div>
					</div>
					<div className="img-container">
						<img src={MOVIES_PIC_DIR + movie.picUrl} alt={movie.title} style={{maxHeight: '200px'}}/>
					</div>
				</div>
				<div className="seating-area">
					<div className="screen">Screen</div>
					<div className="seats-grid">{seatGrid}</div>
					<div class="order-container">
						<button className="order-button" onClick={handleOrderClick}>Order</button>
					</div>
				</div>
				{showTrailer && <div className="modal">
					<div className="modal-content">
						<span className="close" onClick={() => setShowTrailer(false)}>&times;</span>
						<iframe width='inherit' height='300px' src={movie.trailerUrl} title="YouTube video player"
						        frameBorder="0"
						        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>
					</div>
				</div>}

				{showConfirmation && <ConfirmationComponent />}
			</>
	);
}

export default ScreenPage;