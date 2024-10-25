import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AuthPage.css';


const AuthPage = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const email = loginEmail;
        const parola = loginPassword;
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, parola }),
            });

            const data = await response.json();
            if (response.ok) {
            
                localStorage.setItem('userId', data.userId); 
                localStorage.setItem('token', data.token);
                localStorage.setItem('email', data.email);

                setMessage(data.message || 'Autentificare reușită!');
                navigate('/home');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Eroare la autentificare.');
        }
    };


    return (
        <div className="container mt-5 position-relative">
            <video autoPlay loop muted className="video-background">
                <source src="/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="row justify-content-center">
                <div className="col-md-6 position-relative">
                    <h1 className="text-center mb-4">Autentificare</h1>
                    <form id="loginForm" onSubmit={handleLoginSubmit} className="shadow p-4 rounded bg-light">
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="loginEmail"
                                placeholder="Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="loginPassword"
                                placeholder="Parolă"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Autentifică-te</button>
                    </form>

                    <div className="text-center mt-3">
    <p>Nu ai cont? <Link to="/register">Click aici pentru înregistrare</Link></p>
</div>

                    {message && <div className="alert alert-info mt-3">{message}</div>}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
