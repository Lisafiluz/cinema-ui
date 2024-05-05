import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import MovieDetailsPage from './components/MovieDetailsPage'
import ScreenPage from './components/ScreenPage'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import SignInPage from './components/SignInPage';
import ConfirmationPage from './components/ConfirmationPage';
import MyOrdersPage from './components/MyOrdersPage';

const App = () => {
	return (
			<Router>
				<Routes>
					<Route path="/" element={<HomePage/>}/>
					<Route path="/signin" element={<SignInPage/>}/>
					<Route path="/orders" element={<MyOrdersPage/>}/>
					<Route path="/movie/:movieId" element={<MovieDetailsPage/>}/>
					<Route path="/screen/:screenId" element={<ScreenPage/>}/>
					<Route path="/confirmation" element={<ConfirmationPage/>}/>
					{/* Define other routes here */}
				</Routes>
			</Router>
	);
};

export default App;