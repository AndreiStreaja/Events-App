import React, { useEffect, useState } from 'react';


const MyReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('email'); 

        const fetchReservations = async () => {
            try {
                const response = await fetch(`http://localhost:3000/rezervari/utilizator/${email}`);

                const data = await response.json();

                if (response.ok) {
                    setReservations(data);
                } else {
                    setError(data.message || 'Eroare la încărcarea rezervărilor.');
                }
            } catch (err) {
                setError('Eroare la conexiune.');
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (loading) {
        return <div>Se încarcă...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Rezervările mele</h1>
            {reservations.length > 0 ? (
                <ul className="list-group">
                    {reservations.map((reservation) => (
                        <li key={reservation.id} className="list-group-item">
                            <h5>{reservation.Eveniment_rezervat}</h5>
                            <p>
                                <strong>Data rezervării:</strong> {reservation.Data_rezervarii}<br />
                                <strong>Ora rezervării:</strong> {reservation.Ora_rezervarii}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nu ai rezervări active.</p>
            )}
        </div>
    );
};

export default MyReservations;
