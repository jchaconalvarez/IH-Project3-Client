import React, { Component } from 'react';
import styled from 'styled-components';
import DisplayWrapper from './DisplayWrapper';
import NoteRow from './NoteRow';
import NoteBox from './NoteBox';

const CanvasWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  background-color: #6B6A6A;
  grid-column: 2;
  margin: 0 2rem 2rem 0;
  padding-top: 0.13rem;
  overflow-x: scroll;
`;

export default class Display extends Component {
  state = {
    numberOfKeys: 24,
  };

  createRows = () => {
    const { numberOfKeys } = this.state;
    const array = [];
    for (let i = 0; i < numberOfKeys; i++) {
      array[i] = i + 48;

    }
    return array;
  };

  checkNoteType = (noteNumber) => {
    const blackKeys = [49, 51, 54, 56, 58, 61, 63, 66, 68, 70];
    return blackKeys.some((key) => {
      return key === noteNumber;
    });
  };

  render() {
    const { noteHistory, originalRecTimeStamp } = this.props;
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
                    originalRecTimeStamp={originalRecTimeStamp}
                  />
                )
                : (
                  <NoteRow
                    key={note}
                    note={note}
                    noteHistory={noteHistory}
                    originalRecTimeStamp={originalRecTimeStamp}
                  />
                )
            );
          })
        }
      </CanvasWrapper>
    );
  }
}
