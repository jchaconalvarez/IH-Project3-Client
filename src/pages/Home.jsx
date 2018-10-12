import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    HOME
    <Link to="/signup">Sign up</Link>
    <Link to="/login">Log in</Link>
  </div>
);

export default Home;
