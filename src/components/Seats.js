import React, {useState} from 'react';
import '../styles/Seats.css';

const Seats = () => {
	// Define the initial state of seats (assuming a 5x5 grid)
	const [seats, setSeats] = useState(Array(5).fill(Array(5).fill(false)));

	// Function to toggle the state of a seat when clicked
	const toggleSeat = (rowIndex, seatIndex) => {
		setSeats(prevSeats => {
			const newSeats = [...prevSeats];
			newSeats[rowIndex][seatIndex] = !newSeats[rowIndex][seatIndex];
			return newSeats;
		});
	};

	return (

			<div className="seats">
				{seats.map((row, rowIndex) => (
						<div key={rowIndex} className="row">
							{row.map((seat, seatIndex) => (
									<div
											key={seatIndex}
											className={`seat ${seat ? 'selected' : ''}`}
											onClick={() => toggleSeat(rowIndex, seatIndex)}
									>
										{/* You can display seat numbers or other info here */}
									</div>
							))}
						</div>
				))}
			</div>

	);
};

export default Seats;