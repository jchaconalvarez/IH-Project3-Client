import React, { Component } from 'react';
import song from '../services/song-service';
import NavBar from '../components/NavBar';
import LoadingAnimation from '../components/LoadingAnimation';

<<<<<<< HEAD
const Profile = () => {
  return (
    <div>
      <NavBar />
      <h1>Profile</h1>
      <LoadingAnimation />
    </div>
  );
};
=======
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
>>>>>>> e0ff7236f02a7faa4f9d39c71954d29058a0996f

export default Profile;
