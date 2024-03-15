import React from 'react';
import "./Screens.css";

import { useNavigate } from 'react-router-dom';

import NavBar from '../NavBar';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {

    e.preventDefault();
    // Perform logout actions here (e.g., clearing user session, redirecting to login page)
    console.log("Logout clicked");
    navigate('/user/login')

  };

  return (
    <>
    <NavBar />
    </>
  );
};

export default Home;
