import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import song from '../services/song-service';
import user from '../services/profile-service';
import NavBar from '../components/NavBar';

const Container = styled.div`
  background: linear-gradient(to top, #313131 0%, #383838 100%);
  height: 100vh;
`;

const Wrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  padding: 10%;
`;

const UserWrapper = styled.div`
  grid-row: 1;
  background: #EEE;
  border-radius: 5px;
  height: 10rem;
  margin: 0 2%;
`;

const UserCard = styled.div`
  margin: 2% 2%;
`;

const SongsWrapper = styled.div`
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-auto-flow: row;
  text-align: center;
  row-gap: 1rem;
`;

const Item = styled.div`
  font-weight: bold;
  background: #EEE;
  border-radius: 5px;
`;

const ItemCard = styled.div`
  background: #EEE;
  padding: 2%;
  /* margin: 2% 2%; */
  height: 7rem;
  width: 80%;
  border-radius: 5px;
  margin: 0 8%;
  place-self: stretch;
`;

const Button = styled.button`
  width: 70%;
  padding: 0.5rem 0;
  margin-top: 0rem;
  border-radius: 5px;
  border: 2px solid #0F8FAB;
  background: transparent;
  font-size: 1rem;
  font-weight: 700;
  color: #0F8FAB;

  &:focus{
    transform: translateY(2px);
    animation: none !important;
  }
`;

class Profile extends Component {
  state = {
    songList: [],
    userData: {},
  }

  componentDidMount() {
    this.getUserSongs();
    this.getUserInfo();
    // this.formatData();
  }

  getUserSongs = () => {
    song.getUserSongs()
      .then((data) => {
        this.setState({ songList: data });
      });
  }

  getUserInfo = () => {
    user.getProfile()
      .then((data) => {
        this.setState({ userData: data });
      });
  }

  formatData = () => {
    const { userData } = this.state;
    const data = userData.created_at;
    const dayAndMonth = data.created_at.slice(5, 10);
    const year = data.created_at.slice(0, 4);
    return `${dayAndMonth}-${year}`;
  }

  handleDelete = (songId) => {
    song.deleteSong(songId);
    this.getUserSongs();
  }

  render() {
    const { songList, userData } = this.state;
    return (
      <Container>
        <NavBar />
        <Wrapper>
          <UserWrapper>
            <UserCard>
              <p>email: {userData.email}</p>
              <p>playing songs with us since: {userData.created_at} </p>
            </UserCard>
          </UserWrapper>
          <SongsWrapper>
            {
              songList.map((songItem) => {
                return (
                  <React.Fragment>
                    <ItemCard>
                      <Link to={`/song/${songItem._id}`}>
                        <Item key={songItem._id}>
                          <p>{songItem.songName}</p>
                        </Item>
                      </Link>
                        <Button type="button" onClick={() => { this.handleDelete(songItem._id); }}>Delete</Button>
                    </ItemCard>
                  </React.Fragment>
                );
              })
            }
          </SongsWrapper>

        </Wrapper>
      </Container>
    );
  }
}

export default Profile;
