import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <React.Fragment>
      <Link to="/play">Play</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/logout">Log out</Link>
    </React.Fragment>
  );
};

export default NavBar;
