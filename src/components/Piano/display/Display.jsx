import React, { Component } from 'react';
import styled from 'styled-components';
import DisplayWrapper from './DisplayWrapper';
import NoteRow from './NoteRow';

const CanvasWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  background-color: #6B6A6A;
  grid-column: 2;
  margin: 0 2rem 2rem 0;
  overflow-x: scroll;
`;

export default class Display extends Component {
  state = {
    numberOfKeys: 26,
  };

  createRows = () => {
    const { numberOfKeys } = this.state;
    const array = [];
    for (let i = 0; i < numberOfKeys; i++) {
      array[i] = 85 - i;
    }
    return array;
  };

  checkNoteType = (noteNumber) => {
    const blackKeys = [
      85, 82, 80, 78, 75, 73,
      70, 68, 66, 63, 61,
    ];
    return blackKeys.some((key) => {
      return key === noteNumber;
    });
  };

  render() {
    const { noteHistory, translateMidiToNote } = this.props;
    return (
      <CanvasWrapper>
        {
          this.createRows().map((note) => {
            return (
              this.checkNoteType(note)
                ? (
                  <NoteRow
                    type="black"
                    key={note}
                    note={note}
                    noteHistory={noteHistory}
                    translateMidiToNote={translateMidiToNote}
                  />
                )
                : (
                  <NoteRow
                    key={note}
                    note={note}
                    noteHistory={noteHistory}
                    translateMidiToNote={translateMidiToNote}
                  />
                )
            );
          })
        }
      </CanvasWrapper>
    );
  }
}
