import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SongCardWrapper = styled.div`
  margin-bottom: 2rem;
  display: grid;
  background: #EEE;
  height: 10rem;
  width: 15rem;
  border-radius: 5px;
  place-self: stretch;
  
  &:hover {
    transform: scale(1.3);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
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

  &:focus {
    transform: translateY(2px);
    animation: none !important;
  }
`;

const SongCard = (props) => {
  const { songItem, handleDelete } = props;
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
        <p>{`${dayAndMonth}-${year}`}</p>
        <Button card type="button" onClick={() => { handleDelete(_id); }}>Delete</Button>
      </SongCardInfo>
    </SongCardWrapper>
  );
};

export default SongCard;
