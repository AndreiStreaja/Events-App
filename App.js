import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import AuthPage from './components/Autentificare';
import ProfilePage from './components/ProfilePage';
import Inregistrare from './components/Inregistrare'
import Evenimente from './components/Evenimente'
import Rezervari from './components/Rezervari'
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} /> 
                <Route path="/register" element={<Inregistrare />} />
                <Route path="/events" element={<Evenimente  />} />
                <Route path="/rezervations" element={<Rezervari />} />
            </Routes>
        </Router>

    );
};

export default App;

