import React, { useState } from 'react';

const ChangePassword = ({ onPasswordChange }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPasswordChange(oldPassword, newPassword); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Parola veche"
        required
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="form-control mb-3"
      />
      <input
        type="password"
        placeholder="Parola nouă"
        required
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="form-control mb-3"
      />
      <button type="submit" className="btn btn-primary w-100">Schimbă parola</button>
    </form>
  );
};

export default ChangePassword;
