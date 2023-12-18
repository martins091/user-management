import React, { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(event) {
    event.preventDefault();

     const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
    });
    if (response.status !== 200) {
      alert('registration failed')
    } else {
      alert('registration successful')
    }
  }

  return (
    <form
      onSubmit={register}
      className="max-w-lg mx-auto bg-white p-10 border border-gray-300 rounded-md shadow-md"
    >
         <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <div className="mb-6">
        <label htmlFor="email" className="text-gray-800 block mb-2">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="border w-full p-3 text-gray-800 rounded-md focus:outline-none focus:ring focus:border-red-500 transition duration-300 ease-in-out hover:shadow-lg"
          placeholder="Enter your username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="text-gray-800 block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="border w-full p-3 text-gray-800 rounded-md focus:outline-none focus:ring focus:border-red-500 transition duration-300 ease-in-out hover:shadow-lg"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="text-gray-800 block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="border w-full p-3 text-gray-800 rounded-md focus:outline-none focus:ring focus:border-red-500 transition duration-300 ease-in-out hover:shadow-lg"
          placeholder="confirm password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 text-white border rounded-md p-3 transition duration-300 ease-in-out hover:shadow-lg"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterPage;
