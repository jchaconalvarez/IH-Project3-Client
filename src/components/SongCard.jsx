import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SongCardWrapper = styled.div`
  display: grid;
  background: #EEE;
  height: 15rem;
  width: 15rem;
  border-radius: 5px;
`;

const SongCardImg = styled.img`
  background: #DDD;
`;

const SongCardInfo = styled.div`
  /* background: purple; */
`;

const SongCard = (props) => {
  const { index, songItem, handleDelete } = props;
  const { _id, songName, created_at } = songItem;
  return (
    <SongCardWrapper>
      <SongCardImg />
      <SongCardInfo>
        <Link to={`/song/${_id}`}>
          <h3>{songName}</h3>
        </Link>
        <p>Created at: {created_at}</p>
        <button type="button" onClick={() => { handleDelete(_id); }}>Delete</button>
      </SongCardInfo>
    </SongCardWrapper>
  );
};

export default SongCard;
