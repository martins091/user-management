import React, { useEffect, useState } from 'react';

const IndexPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data from the server
    fetch('http://localhost:4000/profile', {
      method: 'GET',
      credentials: 'include',  // Include credentials for cookie authentication
    })
      .then(response => response.json())
      .then(user => {
        setUsers([user]);  // Assuming you want to display a single user
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  return (
    <>
      {users.length > 0 && (
        <div>
          <h2>User Profile</h2>
          <ul>
            <li>ID: {users[0].id}</li>
            <li>Username: {users[0].username}</li>
            {/* Add additional user information here */}
          </ul>
        </div>
      )}
    </>
  );
};

export default IndexPage;
