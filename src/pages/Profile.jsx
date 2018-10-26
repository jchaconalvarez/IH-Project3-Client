import React, { Component } from 'react';
import song from '../services/song-service';
import NavBar from '../components/NavBar';

class Profile extends Component {
  state = {
    songList: [],
  }

  componentDidMount() {
    song.getUserSongs()
      .then((songs) => {
        this.setState({ songList: songs });
      });
  }

  render() {
    const { songList } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <ul>
          {
            songList.map((songO, index) => {
              console.log(songO);
              return (
                <li key={index}>
                  {index} - {songO.songName} - {songO.created_at}
                </li>
              );
            })
          }
        </ul>
      </React.Fragment>
    );
  }
}

export default Profile;
