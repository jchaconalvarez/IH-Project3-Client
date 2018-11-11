import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import Button from './Button';

const SongCardWrapper = styled.div`
  display: grid;
  background: #EEE;
  height: 10rem;
  width: 15rem;
  border-radius: 5px;
  place-self: stretch;
`;

const SongCardImg = styled.img`
  background: #0F8FAB;
`;

const SongCardInfo = styled.div`
  text-align: center;
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

const SongCard = (props) => {
  const { index, songItem, handleDelete } = props;
  const { _id, songName, created_at } = songItem;
  const dayAndMonth = created_at.slice(5, 10);
  const year = created_at.slice(0, 4);
  return (
    <SongCardWrapper>
      <SongCardImg />
      <SongCardInfo>
        <Link to={`/song/${_id}`}>
          <h3>{songName}</h3>
        </Link>
        <p>Created at: {`${dayAndMonth}-${year}`}</p>
        {/* <Button card type="button" onClick={() => { handleDelete(_id); }}>Delete</Button> */}
        <Button card type="button" onClick={() => { handleDelete(_id); }}>Delete</Button>
      </SongCardInfo>
    </SongCardWrapper>
  );
};

export default SongCard;
