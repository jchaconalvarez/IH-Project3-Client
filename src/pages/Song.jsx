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
  /* background: linear-gradient(#F9D423,#EF4957); */
  background-color: #353535;
}
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
