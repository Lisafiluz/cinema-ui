import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';

const ConfirmationComponent = () => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		// Set a timeout to hide the component after 5 seconds
		const timeoutId = setTimeout(() => {
			setVisible(false);
		}, 5000);

		// Clear the timeout when the component unmounts to prevent memory leaks
		return () => clearTimeout(timeoutId);
	}, []); // Empty dependency array ensures the effect runs only once

	useEffect(() => {
		// Reset visibility when the component receives new props
		setVisible(true);
	}, []); // Empty dependency array ensures the effect runs only once when the component mounts

	// Render the component if visible is true
	return visible ? (
			<div>
				<div className="alert alert-success" style={{position:"fixed", top:0, left:"50%", transform:"translateX(-50%)", margin: "20px", paddingRight: "40px"}} role="alert">Your request has been confirmed!!
				<span className="close" onClick={() => setVisible(false)}>&times;</span>
				</div>
			</div>
	) : null; // Return null if visible is false
};



export default ConfirmationComponent;