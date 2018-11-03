import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import song from '../services/song-service';
import NavBar from '../components/NavBar';
import LoadingAnimation from '../components/LoadingAnimation';

class Profile extends Component {
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
        <ul>
          {
            songList.map((songItem, index) => {
              return (
                <React.Fragment>
                  <Link to={`/song/${songItem._id}`}>
                    <li key={index}>
                      {index} - {songItem.songName} - {songItem.created_at}
                    </li>
                  </Link>
                  <button type="button" onClick={() => { this.handleDelete(songItem._id); }}>delete</button>
                </React.Fragment>
              );
            })
          }
        </ul>
      </React.Fragment>
    );
  }
}

export default Profile;
