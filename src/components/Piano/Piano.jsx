import React, { Component } from 'react';
import styled from 'styled-components';
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
const context = new AudioContext;
export default class Piano extends Component {
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
    const hertz = 440;
    const semitones = 12;
    return hertz * (2 ** ((noteData - 69) / semitones));
  }

  noteOn = (midiData, midiStamp, noteData, velocityData) => {
    const oscillatorNode = context.createOscillator();
    const gainNode = context.createGain();
    const noteFrequency = this.convertNoteDataToFrequency(noteData);
    const { activeNotes } = this.state;
    const { noteHistory } = this.state;
    const note = Array.from(midiData);
    const noteObject = {};

    oscillatorNode.connect(gainNode);
    gainNode.connect(context.destination);
    oscillatorNode.frequency.value = noteFrequency;
    gainNode.gain.value = velocityData / 127;
    oscillatorNode.start();
    noteObject.oscillator = oscillatorNode;
    noteHistory.push(note);
    this.setState({ noteHistory });
    noteObject.note = {
      data: Array.from(midiData),
      timeStampOn: midiStamp,
    };
    activeNotes.push(noteObject);
    console.log('ON: ', activeNotes);
    this.setState({ activeNotes });
  };

  noteOff = (midiData, midiStamp) => {
    const { activeNotes } = this.state;
    const indexOfNoteToKill = activeNotes.findIndex((noteObject) => {
      return noteObject.note.data[1] === midiData[1];
    });
    activeNotes[indexOfNoteToKill].oscillator.stop();
    activeNotes.splice(indexOfNoteToKill, 1);
    this.setState({ activeNotes });
    // velocityData es 0 no se está pulsando nada
    // oscillatorNode.frequency.value = 0;
    // console.log(indexOfNoteToKill);
    console.log('OFF: ', activeNotes);
  };

  getMidiInput = (midiMessage) => {
    // const midiInstrumentManufacturer = midiMessage.currentTarget.manufacturer;
    // const midiInstrumentModel = midiMessage.currentTarget.name;
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

  // handleKeyboard = () => {
  //   if (midiController.updateNoteArrays().length > 0) {
  //     console.log(midiController.updateNoteArrays());
  //     // this.setState({ isPlaying: true });
  //   } else {
  //     // this.setState({ isPlaying: false });
  //   }
  // }

  // handleNotes = () => {
  //   console.log('buena suerte');
  //   this.setState({ activeNotes: midiController.updateNoteArrays() });
  // }

  render() {
    const { isPlaying, activeNotes } = this.state;
    return (
      <React.Fragment>
        <button onClick={this.handleClick}>Play music</button>
        <button onClick={this.handleRec}>Rec</button>
        <MusicSheet>
          {
            activeNotes.map((input) => {
              return (
                <p>{input.note.data[1]}</p>
              );
            })
          }
        </MusicSheet>
        <Wrapper>
          <Board />
        </Wrapper>
      </React.Fragment>
    );
  }
}
