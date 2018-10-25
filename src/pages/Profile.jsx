import React from 'react';
import NavBar from '../components/NavBar';
import LoadingAnimation from '../components/LoadingAnimation';

const Profile = () => {
  return (
    <div>
      <NavBar />
      <h1>Profile</h1>
      <LoadingAnimation />
    </div>
  );
};

export default Profile;
