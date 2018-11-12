import React from 'react';
import styled from 'styled-components';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import song from '../services/song-service';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import backgroundPattern from '../assets/img/pattern-waves.png';

const Container = styled.div`
  background-color: #383838;
  background-image: url(${backgroundPattern});
  background-repeat: repeat;
  background-size: 25%;
  height: 100vh;
`;

const Wrapper = styled.div`
  background-color: #DADADA;
  display: grid;
  place-items: center center;
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const CardInput = styled(Field)`
  padding: 0.3rem 0;
  width: 100%;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-bottom: 1px solid #C2C2C2;
  transition: border-bottom-color .25s ease-in;
  background: none;
  font-size: 1.5rem;
  font-weight: 300;
  color: #0F8FAB;
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #F0F0F0 inset;
    -webkit-text-fill-color: #0F8FAB !important;
  }
  &:focus {
    border-bottom-color: #0F8FAB;
    outline: 0;
  }
  &::placeholder {
    color: #C2C2C2;
  }
  &:focus::placeholder {
    transform: translateX(80px);
    opacity: 0;
    transition: all .5s ease;
  }
`;

const NewSong = (props) => {
  return (
    <Container>
      <NavBar />
      <Wrapper>
        <Formik
          initialValues={{ songName: '' }}
          onSubmit={(values) => {
            const { songName } = values;
            song.newSong({ songName, noteHistory: [] })
              .then((newSong) => {
                props.history.push(`/song/${newSong._id}`);
              });
          }}
          render={() => {
            return (
              <Form>
                <CardInput type="text" name="songName" placeholder="New song name" />
                <Button type="submit">Create song</Button>
              </Form>
            );
          }}
        />
      </Wrapper>
    </Container>
  );
};

export default NewSong;
