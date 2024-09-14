import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Event Management App</h1>
      <Link to="/create-user">Create User</Link><br></br>
      <a href="/login">Login</a><br></br>
      <a href="/events">View Events</a><br></br>
    </div>
  );
};

export default Home;
