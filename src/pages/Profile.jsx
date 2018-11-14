import React, { Component } from 'react';
import styled from 'styled-components';
import user from '../services/profile-service';
import NavBar from '../components/NavBar';
import EditProfile from '../components/EditProfile';
import backgroundPattern from '../assets/img/pattern-waves.png';

const Container = styled.div`
  background-color: #383838;
  background-image: url(${backgroundPattern});
  background-repeat: repeat;
  background-size: 25%;
  height: 100vh;
`;

const Wrapper = styled.div`
  background-color: #DADADA;
  display: grid;
  place-items: center center;
  position: absolute;
  left: 25%;
  right: 25%;
  top: 22%;
  bottom: 22%;
  margin: auto;
  padding: 2% 5% 2%;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Title = styled.h3`
  font-size: 2rem;
  color: #383838;
`;


class Profile extends Component {
  state = {
    userData: {},
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    user.getProfile()
      .then((data) => {
        this.setState({ userData: data });
      });
  }

  render() {
    return (
      <Container>
        <NavBar />
        <Wrapper>
          <Title>Your profile</Title>
          <EditProfile editProfile={user.editProfile} {...this.state} />
        </Wrapper>
      </Container>
    );
  }
}

export default Profile;
