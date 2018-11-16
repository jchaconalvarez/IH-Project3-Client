import React, { Component } from 'react';
import styled from 'styled-components';
import NoteBox from './NoteBox';

const NoteRowStyle = styled.div`
  display: grid;
  width: 100%;
  align-items: center;
  grid-template-columns: repeat(auto-fill, 2.25rem);
  height: ${props => props.type === 'black' ? '1.75rem' : '2.03rem'};
  background: ${props => props.type === 'black' ? '#33333333' : 'none'};
  color: ${props => props.type === 'black' ? '#494849' : '#33333399'};
  font-weight: 700;
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

  render() {
    const { type, note, noteHistory, translateMidiToNote } = this.props;
    return (
      <NoteRowStyle type={type}>
        <span>{ translateMidiToNote(note) }</span>
        {/* <span>{ note }</span> */}
        {
          noteHistory
          && noteHistory.map((box, index) => {
            if (box.data[1] === note) {
              return <NoteBox key={index} margin={index} />;
            }
          })
        }
      </NoteRowStyle>
    );
  }
}

export default NoteRow;
