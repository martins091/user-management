import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
       setUserInfo(userInfo)
      });
    });
  }, []);

  function logout(){
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null)
  }

const username = userInfo?.username;

  return (
    <header className="flex justify-between mb-6">
      <Link to="/" className="logo font-bold">
        Mar-Tinz-Blog
      </Link>
      <nav className="flex space-x-4">
        {username && (
          <>
            <a
             className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded-md transition duration-300 ease-in-out hover:shadow-lg" 
            onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link
              to="/logIn"
              className="bg-red-500 text-white px-4 py-1 rounded-md transition duration-300 ease-in-out hover:shadow-lg"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="bg-red-500 text-white px-4 py-1 rounded-md transition duration-300 ease-in-out hover:shadow-lg"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
