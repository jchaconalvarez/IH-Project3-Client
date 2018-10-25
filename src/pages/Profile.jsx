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
    console.log('Profile RENDER: ', songList);
    return (
      <React.Fragment>
        <NavBar />
        <ul>
          {
            songList.map((song, index) => {
              return (
                <li>
                  {index} - {song.name} - {song.noteHistory} - {song.createdAt}
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
