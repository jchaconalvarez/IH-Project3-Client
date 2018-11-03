import React, { Component } from 'react';
import styled from 'styled-components';
import song from '../../services/song-service';
import Controls from './Controls';
import Board from './Board';
import PianoForm from './PianoForm';
import CanvasHere from './CanvasHere';

const PianoWrapper = styled.div`
  display: grid;
  grid-column: 1;
  grid-row: 3;
  place-items: start end;
  align-self: start;
  margin: 0 0 2rem 2rem;
`;

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
export default class Piano extends Component {
  state = {
    songId: '',
    songName: '',
    midiInstrument: '',
    activeNotes: [],
    noteHistory: [],
    isRecording: false,
  }

  componentDidMount() {
    const { songName, noteHistory } = this.state;
    if (noteHistory.length === 0) {
      console.log('NEWPOTATO');
      song.newSong({ songName, noteHistory })
        .then((newSong) => {
          console.log('NEWPOTATO: ', newSong);
          this.setState({ songId: newSong._id });
        });
    }
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
    const { activeNotes, noteHistory, isRecording  } = this.state;
    const note = Array.from(midiData);
    const noteObject = {};

    oscillatorNode.connect(gainNode);
    oscillatorNode.type = 'square';
    gainNode.connect(context.destination);
    oscillatorNode.frequency.value = noteFrequency;
    gainNode.gain.value = velocityData / 127;
    oscillatorNode.start();
    noteObject.oscillator = oscillatorNode;
    noteObject.note = {
      data: note,
      timeStampOn: midiStamp,
      timeStampOff: null,
    };
    // console.log(noteObject);
    isRecording && noteHistory.push(noteObject.note);
    // console.log(noteHistory);
    activeNotes.push(noteObject);
    // console.log('ON: ', activeNotes);
    this.setState({ activeNotes, noteHistory });
  };

  noteOff = (midiData, midiStamp) => {
    const { activeNotes, noteHistory } = this.state;
    const indexOfNoteToKill = activeNotes.findIndex((noteObject) => {
      noteObject.note.timeStampOff = midiStamp;
      return noteObject.note.data[1] === midiData[1];
    });
    activeNotes[indexOfNoteToKill].oscillator.stop();
    activeNotes.splice(indexOfNoteToKill, 1);
    this.setState({ activeNotes, noteHistory });
    // console.log(indexOfNoteToKill);
    // console.log('OFF: ', activeNotes);
  };

  getMidiInput = (midiMessage) => {
    const midiInstrumentManufacturer = midiMessage.currentTarget.manufacturer;
    const midiInstrumentModel = midiMessage.currentTarget.name;
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

    const { midiInstrument } = this.state;
    this.setState({
      midiInstrument: `${midiInstrumentManufacturer} ${midiInstrumentModel}`,
    });
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

  handleRecording = () => {
    const { songId, songName, noteHistory, isRecording } = this.state;
    if (!isRecording) {
      console.log('RECORDING');
      this.setState({ isRecording: true });
    } else {
      // console.log(noteHistory);
      song.editSong(songId, { songName, noteHistory });
      console.log('SAVED SONG');
      this.setState({ isRecording: false });
    }
  }

  translateMidiToNote = (midiNote) => {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return `${noteNames[midiNote % 12]} ${(Math.trunc(midiNote / 12) - 1)}`;
  }

  showNotes = () => {
    const { activeNotes, noteHistory, isRecording } = this.state;
    return (
      noteHistory.map((input, index) => {
        return (
          <span key={index}>{this.translateMidiToNote(input.data[1])}</span>
        );
      })
    );
  }

  changeName = (songName) => {
    console.log('name changed');
    this.setState({ songName });
  }

  clearHistory = () => {
    this.setState({ noteHistory: [] });
  }

  render() {
    const { activeNotes, isRecording, midiInstrument } = this.state;
    return (
      <React.Fragment>
        <Controls
          activeNotes={activeNotes}
          isRecording={isRecording}
          onRecording={this.handleRecording}
          midiInstrument={midiInstrument}
          clearHistory={this.clearHistory}
        >
          <PianoForm changeName={this.changeName} />
          {/* <button type="button" onClick={this.clearHistory}>Clear</button> */}
        </Controls>
        <PianoWrapper>
          <Board activeNotes={activeNotes} />
        </PianoWrapper>
        <CanvasHere>{ this.showNotes() }</CanvasHere>
      </React.Fragment>
    );
  }
}
