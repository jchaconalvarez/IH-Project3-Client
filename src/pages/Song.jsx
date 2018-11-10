import React, { Component } from 'react';
import styled from 'styled-components';
import song from '../services/song-service';
import NavBar from '../components/NavBar';
import Piano from '../components/Piano/Piano';

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: 1fr 10fr;
  grid-template-rows: auto 1fr 6fr;
  background: #DADADA;
  /* background: #4c4c4c;
  background-image: linear-gradient(#353535 12px, transparent 12px), linear-gradient(90deg, #353535 12px, transparent 12px);
  background-size: 20px 20px; */
`;

class Play extends Component {

  // componentDidMount() {
  //   const { id } = this.props.match.params;
  //   if (id) {
  //     song.getSong(id).
  //   }
  // }

  render() {
    return (
      <Container>
        <NavBar />
        <Piano params={this.props.match.params.id}/>
      </Container>
    );
  }
}

export default Play;
