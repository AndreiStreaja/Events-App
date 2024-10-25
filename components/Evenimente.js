import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const events = [
    {
        id: 1,
        title: 'Concert Rock',
        date: '28 Octombrie 2024',
        location: 'Arena Națională, București',
        description: 'Un concert plin de energie cu trupa ta favorită de rock!',
        image: 'https://plus.unsplash.com/premium_photo-1661306437817-8ab34be91e0c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9jayUyMGNvbmNlcnR8ZW58MHx8MHx8fDA%3D',
    },
    {
        id: 2,
        title: 'Festival de Film',
        date: '5 Noiembrie 2024',
        location: 'Cinema City, Cluj-Napoca',
        description: 'Vino să vezi cele mai noi filme internaționale la acest festival de prestigiu.',
        image: 'https://media.istockphoto.com/id/1372681569/photo/hands-holding-a-film-slate-directing-a-movie-scene.webp?a=1&b=1&s=612x612&w=0&k=20&c=eXeEExPn1IDNabmjqAs7QuCD86LEUVJv7k96347etdE=',
    },
    {
        id: 3,
        title: 'Gala de Caritate',
        date: '15 Noiembrie 2024',
        location: 'Palatul Parlamentului, București',
        description: 'Un eveniment special dedicat strângerii de fonduri pentru cauze nobile.',
        image: 'https://media.istockphoto.com/id/1586911323/photo/close-up-of-african-woman-hands-holding-red-heart-in-solidarity.webp?a=1&b=1&s=612x612&w=0&k=20&c=IK7oNrF3xqpOTEcXwFCVne532TMM2bufwyNiqfnkx-E=',
    },
];

const EventsPage = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleReservation = async (eventId) => {
        const reservedEvent = events.find(event => event.id === eventId);
        
        if (!reservedEvent) {
            setMessage('Eroare: Evenimentul nu a fost găsit.');
            return;
        }

        const now = new Date();
        const Data_rezervarii = now.toISOString().split('T')[0]; 
        const Ora_rezervarii = now.toLocaleTimeString(); 


        try {
            const response = await fetch('http://localhost:3000/rezervari/all_reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Data_rezervarii,
                    Ora_rezervarii,
                    Eveniment_rezervat: reservedEvent.title,
                    email: localStorage.getItem('email') 
                }),
            });

            if (!response.ok) {
                throw new Error('Eroare la crearea rezervării.');
            }

            setMessage('Rezervare efectuată cu succes!');
            navigate('/home');
        } catch (error) {
            setMessage(`Eroare: ${error.message}`);
        }
    };
    return (
        <div className="container mt-5">
            <header className="text-center mb-5">
                <h1 className="display-4 text-primary">Evenimente Viitoare</h1>
                <p className="lead text-muted">Descoperă cele mai interesante evenimente din orașul tău și rezervă-ți locul!</p>
            </header>

            <main>
                <div className="row">
                    {events.map(event => (
                        <div key={event.id} className="col-md-4 mb-4">
                            <div className="card shadow-sm border-0 h-100">
                                <img src={event.image} className="card-img-top" alt={event.title} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-primary">{event.title}</h5>
                                    <p className="card-text">
                                        <strong>Data:</strong> {event.date}<br />
                                        <strong>Locație:</strong> {event.location}
                                    </p>
                                    <p className="card-text text-muted">{event.description}</p>
                                    <button
                                        className="btn btn-outline-primary mt-auto"
                                        onClick={() => handleReservation(event.id)}
                                    >
                                        Rezervă
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="text-center mt-5">
                <p className="text-muted">&copy; {new Date().getFullYear()} Compania Ta. Toate drepturile rezervate.</p>
            </footer>

            {message && <p className="text-center mt-3">{message}</p>}
        </div>
    );
};

export default EventsPage;
