import React, { useEffect, useState } from 'react';
import UserProfile from './UserProfile';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from the server
    fetch('http://localhost:4000/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(userData => {
        setUser(userData);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    // Call the server endpoint to delete the user
    fetch('http://localhost:4000/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId }),
    })
      .then(response => response.json())
      .then(result => {
        console.log(result); // Handle success
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      {user && <UserProfile user={user} onDelete={handleDeleteUser} />}
    </div>
  );
};

export default ProfilePage;
