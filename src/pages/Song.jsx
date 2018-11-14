import React, { Component } from 'react';
import styled from 'styled-components';
import song from '../services/song-service';
import NavBar from '../components/NavBar';
import Piano from '../components/Piano/Piano';
import Loading from '../components/Loading';

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100vh;
  grid-template-columns: 1fr 10fr;
  grid-template-rows: auto 1fr 6fr;
  background: #DADADA;
`;

class Song extends Component {
  state = {
    songId: null,
    songName: null,
    noteHistory: [],
    isEditing: false,
    status: 'loading',
  }

  componentWillMount() {
    const { id: songId } = this.props.match.params;
    song.getSong(songId)
      .then((response) => {
        const { songName, noteHistory } = response;
        console.log(response);
        let isEditing = false;
        if (noteHistory.length > 0) { isEditing = true; }
        this.setState({
          songId,
          songName,
          noteHistory,
          isEditing,
          status: 'loaded',
        });
      });
  }

  render() {
    const {
      noteHistory,
      isEditing,
      songName,
      status } = this.state;
    const { id } = this.props.match.params;
    return (
      <Container>
        <NavBar />
        {
          status === 'loading'
            ? <Loading />
            : <Piano songId={id} noteHistory={noteHistory} isEditing={isEditing} songName={songName} />
        }
      </Container>
    );
  }
}

export default Song;
