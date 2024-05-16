import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import MovieDetailsPage from './components/MovieDetailsPage'
import ScreenPage from './components/ScreenPage'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import SignInPage from './components/SignInPage';
import MyOrdersPage from './components/MyOrdersPage';
import SignUpPage from "./components/SignUpPage";
import AdminPage from "./components/AdminPage";
import AdminMoviesPage from "./components/AdminMoviesPage";
import AdminScreensPage from "./components/AdminScreensPage";

const App = () => {
	return (
			<Router>
				<Routes>
					<Route path="/" element={<HomePage/>}/>
					<Route path="/signin" element={<SignInPage/>}/>
					<Route path="/signup" element={<SignUpPage/>}/>
					<Route path="/orders" element={<MyOrdersPage key={"user"}/>}/>
					<Route path="/movie/:movieId" element={<MovieDetailsPage/>}/>
					<Route path="/screen/:screenId" element={<ScreenPage/>}/>
					{/*<Route path="/confirmation" element={<ConfirmationComponent/>}/>*/}
					<Route path="/admin" element={<AdminPage/>}/>
					<Route path="/admin/orders" element={<MyOrdersPage/>}/>
					<Route path="/admin/movies" element={<AdminMoviesPage/>}/>
					<Route path="/admin/screens" element={<AdminScreensPage/>}/>
					{/* Define other routes here */}
				</Routes>
			</Router>
	);
};

export default App;