import React, {useState, useEffect} from 'react';
import Navbar from './Navbar';

const ConfirmationPage = () => {
	return (
			<div>
				<Navbar/>
				<div class="alert alert-success" role="alert">Your request has been confirmed!! Go to
					<a href="/orders" class="alert-link"> your orders </a>
					to see them
				</div>
			</div>
	);
};

export default ConfirmationPage;