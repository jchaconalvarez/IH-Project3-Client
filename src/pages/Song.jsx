import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Piano from '../components/Piano/Piano';
import song from '../services/song-service';

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
  }

  componentWillMount() {
    const { id: songId } = this.props.match.params;

    console.log('SONG WILL MOUNT');

    if (songId) {
      song.getSong(songId)
        .then((response) => {
          const { songName, noteHistory } = response;
          let isEditing = false;
          if (noteHistory.length > 0) { isEditing = true; }
          this.setState({
            songId,
            songName,
            noteHistory,
            isEditing,
          });
        });
    }
  }

  componentWillUnmount() {
    console.log('SONG WILL UNMOUNT');
  }

  render() {
    const { noteHistory, isEditing } = this.state;
    const { id } = this.props.match.params;
    return (
      <Container>
        <NavBar />
        <Piano songId={id} noteHistory={noteHistory} isEditing={isEditing} />
      </Container>
    );
  }
}

export default Song;
