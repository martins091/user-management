import React, { useState } from 'react';

const UserProfile = ({ user, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(user.id);
  };

  return (
    <div>
      <h2>User Profile</h2>
      <ul>
        <li>ID: {user.id}</li>
        <li>Username: {user.username}</li>
        {/* Add additional user information here */}
      </ul>
      <button onClick={handleDeleteClick}>Delete User</button>
    </div>
  );
};

export default UserProfile;
