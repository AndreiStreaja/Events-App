import React from 'react';

const DeleteAccount = ({ onDelete }) => {
  return (
    <form onSubmit={onDelete}>
      <button type="submit" className="btn btn-danger w-100">Șterge contul</button>
    </form>
  );
};

export default DeleteAccount;
