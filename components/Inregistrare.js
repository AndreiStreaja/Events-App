import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/AuthPage.css'; // Asigură-te că ai creat acest fișier CSS
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const email = registerEmail;
        const parola = registerPassword;

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, parola }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage(data.message || 'Înregistrare reușită!');
                navigate('/');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Eroare la înregistrare.');
        }
    };

    return (
        <div className="container mt-5 position-relative">
            <video autoPlay loop muted className="video-background">
                <source src="path_to_your_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="row justify-content-center">
                <div className="col-md-6 position-relative">
                <h1 className="text-center mt-5 mb-4">Înregistrare</h1>
                    <form id="registerForm" onSubmit={handleRegisterSubmit} className="shadow p-4 rounded bg-light">
                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="registerEmail"
                                placeholder="Email"
                                required
                                value={registerEmail}
                                onChange={(e) => setRegisterEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="registerPassword"
                                placeholder="Parolă"
                                required
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100">Înregistrează-te</button>
                    </form>

                    {message && <div className="alert alert-info mt-3">{message}</div>}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
