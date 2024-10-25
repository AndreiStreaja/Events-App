import React, { useState } from 'react';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onPasswordChange = async (oldPassword, newPassword) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await response.json();
      setMessage(data.message || 'Parola a fost actualizată cu succes!');
    } catch (error) {
      setMessage('Eroare la schimbarea parolei.');
    }
  };

  const onDelete = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete('http://localhost:3000/auth/delete-account', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(response.data.message || 'Contul a fost șters cu succes!');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage('Eroare la ștergerea contului.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Gestionați profilul</h2>
      <div className="row">
        <div className="col-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center text-primary">Schimbați Parola</h5>
              <ChangePassword onPasswordChange={onPasswordChange} />
            </div>
          </div>
        </div>
        <div className="col-12 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center text-danger">Ștergeți Contul</h5>
              <DeleteAccount onDelete={onDelete} />
            </div>
          </div>
        </div>
      </div>
      {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
    </div>
  );
};

export default ProfilePage;
