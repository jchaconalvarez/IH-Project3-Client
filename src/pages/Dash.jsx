import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import song from '../services/song-service';
import NavBar from '../components/NavBar';
import SongCard from '../components/SongCard';

const Container = styled.div`
  background: linear-gradient(to top, #313131 0%, #383838 100%);
  height: 100%;
`;

const SongGrid = styled.div`
  display: grid;
  grid-gap: 0.8rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  padding: 10%;
  grid-auto-flow: row;
`;

const ClipPath = styled.div`
  background: #FFF;
  height: 10rem;
  width: 9rem;
  -webkit-clip-path: polygon(30% 45%, 45% 45%, 45% 30%, 55% 30%, 55% 45%, 70% 45%, 70% 55%, 55% 55%, 55% 70%, 45% 70%, 45% 55%, 30% 55%);
  clip-path: polygon(30% 45%, 45% 45%, 45% 30%, 55% 30%, 55% 45%, 70% 45%, 70% 55%, 55% 55%, 55% 70%, 45% 70%, 45% 55%, 30% 55%);
`;

const NewSongCard = styled.div`
  background: #0F8FAB;
  border-radius: 5px;
  height: 10rem;
  width: 15rem;

  &:hover {
    transform: rotate(180deg)
  }
`;

class Dash extends Component {
  state = {
    songList: [],
  }

  componentDidMount() {
    console.log('DASH DID MOUNT');
    this.getUserSongs();
  }

  componentWillUnmount() {
    console.log('DASH WILL UNMOUNT');
  }

  getUserSongs = () => {
    song.getUserSongs()
      .then((songs) => {
        this.setState({ songList: songs });
      });
  }

  handleDelete = (songId) => {
    song.deleteSong(songId);
    this.getUserSongs();
  }

  render() {
    const { songList } = this.state;
    return (
      <Container>
        <NavBar />
        <SongGrid>
          <Link to="/newsong">
            <NewSongCard>
              <ClipPath />
            </NewSongCard>
          </Link>
          {
            songList.map((songItem, index) => {
              return (
                <SongCard
                  key={songItem.created_at}
                  index={index}
                  songItem={songItem}
                  handleDelete={this.handleDelete}
                />
              );
            })
          }
        </SongGrid>
      </Container>
    );
  }
}

export default Dash;
