import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Piano from '../components/Piano/Piano';

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: 1fr 10fr;
  grid-template-rows: auto 1fr 6fr;
  background: #DADADA;
`;

class Song extends Component {
  render() {
    return (
      <Container>
        <NavBar />
        <Piano params={this.props.match.params.id}/>
      </Container>
    );
  }
}

export default Song;
