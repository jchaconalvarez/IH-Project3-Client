import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import song from '../services/song-service';
import NavBar from '../components/NavBar';
import SongCard from '../components/SongCard';

const SongGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  padding: 10%;
`;

const ClipPath = styled.div`
  background: #FFF;
  height: 15rem;
  width: 14rem;
  -webkit-clip-path: polygon(30% 45%, 45% 45%, 45% 30%, 55% 30%, 55% 45%, 70% 45%, 70% 55%, 55% 55%, 55% 70%, 45% 70%, 45% 55%, 30% 55%);
  clip-path: polygon(30% 45%, 45% 45%, 45% 30%, 55% 30%, 55% 45%, 70% 45%, 70% 55%, 55% 55%, 55% 70%, 45% 70%, 45% 55%, 30% 55%);
`;

const NewSongCard = styled.div`
  background: #EEE;
  border-radius: 5px;
`;

class Dash extends Component {
  state = {
    songList: [],
  }

  componentDidMount() {
    this.getUserSongs();
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
      <React.Fragment>
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
                <React.Fragment>
                  <SongCard
                    key={songItem.created_at}
                    index={index}
                    songItem={songItem}
                    handleDelete={this.handleDelete}
                  />
                </React.Fragment>
              );
            })
          }
        </SongGrid>
      </React.Fragment>
    );
  }
}

export default Dash;
