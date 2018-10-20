import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { checkIfPlaying, noteActivated, noteDeactivated } from '../../actions/midi';
import Board from './Board';
import MusicSheet from './MusicSheet';
import midiController from '../../services/midi-service';

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  position: fixed;
  margin-bottom: 8px;
  bottom: 0;
  width: 100%;
`;

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
class Piano extends Component {
  state = {
    isPlaying: false,
    activeNotes: [],
    noteHistory: [],
  }

  componentDidMount() {
    this.listenForMIDIAccess();
  }

  // MIDI LOGIC
  convertNoteDataToFrequency = (noteData) => {
    const hertz = 441;
    const semitones = 12;
    return hertz * (2 ** ((noteData - 69) / semitones));
  }

  noteOn = (midiData, midiStamp, noteData, velocityData) => {
    const oscillatorNode = context.createOscillator();
    const gainNode = context.createGain();
    const noteFrequency = this.convertNoteDataToFrequency(noteData);
    const note = Array.from(midiData);
    const noteObject = {};

    oscillatorNode.connect(gainNode);
    gainNode.connect(context.destination);
    oscillatorNode.frequency.value = noteFrequency;
    gainNode.gain.value = velocityData / 127;
    oscillatorNode.start();
    noteObject.oscillator = oscillatorNode;
    noteObject.note = {
      data: note,
      timeStampOn: midiStamp,
    };
    noteActivated(noteObject);
  };

  noteOff = (midiData, midiStamp) => {
    noteDeactivated(midiData[1]);
  };

  getMidiInput = (midiMessage) => {
    const midiData = midiMessage.data;
    const midiStamp = midiMessage.timeStamp;
    const status = midiData[0];
    const noteData = midiData[1];
    const velocityData = midiData[2];

    switch (status) {
      case 144:
        this.noteOn(midiData, midiStamp, noteData, velocityData);
        break;
      case 128:
        this.noteOff(midiData, midiStamp, velocityData);
        break;
      default:
        console.log('Soy un default :D');
        break;
    }
  };

  onMIDISuccess = (midiAccess) => {
    midiAccess.inputs.forEach((message) => {
      message.onmidimessage = this.getMidiInput;
    });
  };

  onMIDIFailure = (error) => {
    console.log('requestMIDIAccess fail', error);
  };

  listenForMIDIAccess = () => {
    navigator.requestMIDIAccess({ sysex: false })
      .then(this.onMIDISuccess)
      .catch(this.onMIDIFailure);
  }

  handleKeyboard = () => {
    if (midiController.updateNoteArrays().length > 0) {
      console.log(midiController.updateNoteArrays());
      // this.setState({ isPlaying: true });
    } else {
      // this.setState({ isPlaying: false });
    }
  }

  handleNotes = () => {
    console.log('buena suerte');
    this.setState({ activeNotes: midiController.updateNoteArrays() });
  }

  render() {
    const { isPlaying, activeNotes } = this.state;
    return (
      <React.Fragment>
        <button onClick={this.handleClick}>Play</button>
        <button onClick={this.handleRec}>Rec</button>
        <MusicSheet>
          {
            activeNotes.map((note) => {
              return (
                <h3>{note.data[1]}</h3>
              );
            })
          }
        </MusicSheet>
        <Wrapper>
          <Board />
        </Wrapper>
      </React.Fragment>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    isPlaying: state.midi.isPlaying,
    activeNotes: state.midi.activeNotes,
    noteHistory: state.midi.noteHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    noteActivated: ({ oscillator, note }) => dispatch(noteActivated({ oscillator, note })),
    noteDeactivated: (note) => dispatch(noteDeactivated(note)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Piano);
