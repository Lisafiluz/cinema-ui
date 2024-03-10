import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App = () => {
    return (
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {/* Define other routes here */}
                </Routes>
            </Router>
    );
};

export default App;