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

const Wrapper = styled.div`
  display: grid;
  place-items: center center;
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  background: red;
`;

const NewSong = (props) => {
  return (
    <React.Fragment>
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
                <Field type="text" name="songName" placeholder="New Song Name" />
                <button type="submit">Create Song</button>
              </Form>
            );
          }}
        />
      </Wrapper>
    </React.Fragment>
  );
};

export default NewSong;
