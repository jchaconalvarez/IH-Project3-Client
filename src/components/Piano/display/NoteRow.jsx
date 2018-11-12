import React, { Component } from 'react';
import styled from 'styled-components';
import NoteBox from './NoteBox';

const NoteRowStyle = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, 2rem);
  height: ${props => props.type === 'black' ? '1.75rem' : '2.03rem'};
  background: ${props => props.type === 'black' ? '#33333333' : 'none'};
`;
class NoteRow extends Component {

  checkRow = () => {
    const { note, noteHistory } = this.props;
    if (noteHistory) {
      return noteHistory.some((noteData) => {
        return noteData.data[1] === note;
      });
    }
    return false;
  }

  // renderNoteBox = () => {
  //   const { note, noteHistory } = this.props;
  //   noteHistory
  //   && noteHistory.map((box, index) => {
  //     if (box.data[1] === note) {
  //       console.log('hello!', box);
  //       return <NoteBox key={index} />;
  //     }
  //   });
  // }

  render() {
    const { type, note, noteHistory } = this.props;
    return (
      <NoteRowStyle type={type}>
        {
          noteHistory
          && noteHistory.map((box, index) => {
            if (box.data[1] === note) {
              return <NoteBox key={index} />;
            }
          })
        }
      </NoteRowStyle>
    );
  }
}

export default NoteRow;
