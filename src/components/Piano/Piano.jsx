import React, { Component } from 'react';
import styled from 'styled-components';
import song from '../../services/song-service';
import Board from './Board';
import MusicSheet from './MusicSheet';
import PianoForm from './PianoForm';
import MusicPentagram from './Vex';

const SheetContainer = styled.div`
  display: grid;
  grid-column: 2;
  grid-row: 2 / 4;
  grid-template-rows: 10px 10fr 1fr;
  align-content: center;
  margin: 0 5%;
`;

const PianoContainer = styled.div`
  display: grid;
  grid-column: 2 ;
  grid-row: 3;
  z-index: 1;
  align-content: end;
`;

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
class Piano extends Component {
  state = {
    songId: null,
    songName: null,
    songBPM: 60,
    midiInstrument: null,
    timeStamp: null,
    activeNotes: [],
    noteHistory: [],
    isRecording: false,
    isPlaying: false,
  }

  // Is called on component mount. Fetches song using id in URL if it already
  // exists.
  // Calls listenForMIDIAccess() to set up MIDI event listening/capture.
  componentDidMount() {
    const { params: songId } = this.props;
    if (songId) {
      song.getSong(songId)
        .then((response) => {
          const { songName, noteHistory } = response;
          this.setState({ songId, songName, noteHistory });
        });
    }
    this.listenForMIDIAccess();
  }

  // MIDI LOGIC

  // Converts MIDI note value to Hz for oscillator.
  // @params {number} noteData - MIDI note value.
  // @returns {number} - Frequency to be played by oscillator.
  convertNoteDataToFrequency = (noteData) => {
    const hertz = 440;
    const semitones = 12;
    return hertz * (2 ** ((noteData - 69) / semitones));
  }

  // Creates oscillator/gain nodes for new notes and adds them to
  // activeNotes/noteHistory arrays.
  // @param {object} midiData - MIDI event object with all note information.
  // @param {number} midiNote - MIDI note value.
  // @param {number} midiVelocity - MIDI note velocity value to be used by gain node.
  noteOn = (midiData, midiNote, midiVelocity) => {
    const {
      activeNotes,
      noteHistory,
      isRecording,
      isPlaying,
    } = this.state;

    // Create oscillator and gain nodes for synth.
    const oscillatorNode = context.createOscillator();
    const gainNode = context.createGain();

    // Variables used to create noteObject.
    const noteHz = this.convertNoteDataToFrequency(midiNote);
    const date = new Date();
    const timeStamp = date.getTime();
    // const note = Array.from(midiData);
    const noteObject = {};

    // Setup gain node.
    gainNode.connect(context.destination);
    gainNode.gain.value = midiVelocity / 127;

    // Set up and start oscillator node.
    oscillatorNode.type = 'triangle';
    oscillatorNode.frequency.value = noteHz;
    oscillatorNode.connect(gainNode);
    oscillatorNode.start();

    // Create note object to push to noteHistory if recording.
    noteObject.oscillator = oscillatorNode;
    noteObject.note = {
      data: midiData,
      timeStampOn: timeStamp,
      timeStampOff: null,
    };
    isRecording && noteHistory.push(noteObject.note);

    // Push notes to activeNotes and update state.
    activeNotes.push(noteObject);
    this.setState({ activeNotes, noteHistory });
  };

  // Kills note oscllators and removes notes from activeNotes array.
  // @param {object} midiData - MIDI event object with all note information.
  noteOff = (midiData) => {
    const { activeNotes, noteHistory } = this.state;
    const date = new Date();
    const timeStamp = date.getTime();

    // Finds index of note to kill.
    const indexOfNoteToKill = activeNotes.findIndex((noteObject) => {
      return noteObject.note.data[1] === midiData[1];
    });

    // Stops/disconnects oscillator and removes note from activeNotes array.
    activeNotes[indexOfNoteToKill].note.timeStampOff = timeStamp;
    activeNotes[indexOfNoteToKill].oscillator.stop();
    activeNotes[indexOfNoteToKill].oscillator.disconnect();
    activeNotes.splice(indexOfNoteToKill, 1);

    this.setState({ activeNotes, noteHistory });
  };

  // Calls noteOn() or noteOff methods according to MIDI status value.
  // Sets midiInstrument value.
  // @params {object} midiMessage - MIDI event object.
  getMidiInput = (midiMessage) => {
    const {
      manufacturer: midiManufacturer,
      name: midiModel,
    } = midiMessage.currentTarget;
    const midiData = Array.from(midiMessage.data);
    const midiStatus = midiData[0];
    const midiNote = midiData[1];
    const midiVelocity = midiData[2];

    switch (midiStatus) {
      case 144:
        this.noteOn(midiData, midiNote, midiVelocity);
        break;
      case 128:
        this.noteOff(midiData, midiNote, midiVelocity);
        break;
      default:
        console.log('Soy un default :D');
        break;
    }

    const { midiInstrument } = this.state;
    this.setState({
      midiInstrument: `${midiManufacturer} ${midiModel}`,
    });
  };

  // Loops through and calls getMidiInput on MIDI messages.
  onMIDISuccess = (midiAccess) => {
    midiAccess.inputs.forEach((message) => {
      message.onmidimessage = this.getMidiInput;
    });
  };

  onMIDIFailure = (error) => {
    console.log('requestMIDIAccess fail', error);
  };

  // Listens for MIDI access (events).
  listenForMIDIAccess = () => {
    navigator.requestMIDIAccess({ sysex: false })
      .then(this.onMIDISuccess)
      .catch(this.onMIDIFailure);
  }

  // Starts/stops recording of songs into noteHistory array.
  // Makes song-service API calls to create/update songs.
  handleRecording = () => {
    const { songId, songName, noteHistory, isRecording } = this.state;
    if (!isRecording) {
      const date = new Date();
      const timeStamp = date.getTime();
      if (!songId) {
        song.newSong({ songName, noteHistory })
          .then((newSong) => {
            this.setState({ songId: newSong._id, timeStamp, isRecording: true });
          });
      }
    } else {
      song.editSong(songId, { songName, noteHistory });
      this.setState({ isRecording: false });
    }
  }

  // Translates midi note value to actual musical notation.
  // @params {number} midiNote - Midi note value.
  // @returns {string}
  translateMidiToNote = (midiNote) => {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return `${noteNames[midiNote % 12]} ${(Math.trunc(midiNote / 12) - 1)}`;
  }

  // Shows notes from noteHistory on the music sheet.
  showNotes = () => {
    const { noteHistory, isRecording } = this.state;
    return (
      noteHistory.map((input, index) => {
        return (
          <span key={index}>{this.translateMidiToNote(input.data[1])}</span>
        );
      })
    );
  }

  // Changes the current name of the song by changing the state.
  // @param {string} songName - New name of the song from form.
  changeName = (songName) => {
    console.log('name changed');
    this.setState({ songName });
  }

  // Clears current noteHistory array by changing state.
  clearHistory = () => {
    this.setState({ noteHistory: [] });
  }

  // Plays back song (noteHistory array).
  playSong = () => {
    const {
      timeStamp,
      noteHistory,
    } = this.state;
    let songTimeStamp = timeStamp;
    let noteIndex = 0;

    // Delays execution of next line for the duration of a note.
    // @param {number} miliseconds - Time to wait in miliseconds.
    const delay = (miliseconds) => new Promise(resolve => setTimeout(resolve, miliseconds));

    // Plays and kills notes at appropriate times.
    // @param {object} note - Note object from noteHistory array.
    const playNote = async (note) => {
      const midiData = Array.from(note.data);
      const midiNote = note.data[1];
      const midiVelocity = note.data[2];
      const noteDuration = note.timeStampOff - note.timeStampOn;

      this.noteOn(midiData, midiNote, midiVelocity);
      await delay(noteDuration);
      this.noteOff(midiData);
    };

    // Starts playback interval and checks notes in noteHistory one by one
    // for a matching (<=) start time. Kills interval when it reaches the end of
    // the noteHistory array.
    const playbackInterval = setInterval(() => {
      if (noteHistory[noteIndex].timeStampOn <= songTimeStamp) {
        playNote(noteHistory[noteIndex]);
        noteIndex++;
      }
      if (noteIndex === noteHistory.length) {
        clearInterval(playbackInterval);
      }
      songTimeStamp += +10;
    }, 10);
  }

  render() {
    const { activeNotes, isRecording, midiInstrument } = this.state;
    return (
      <React.Fragment>
        <PianoForm changeName={this.changeName} />
        <button type="button" onClick={this.clearHistory}>Clear</button>
        <button type="button" onClick={this.playSong}>Play</button>
        <SheetContainer>
          <MusicSheet>
            <MusicPentagram />
            { this.showNotes() }
          </MusicSheet>
        </SheetContainer>
        <PianoContainer>
          <Board
            activeNotes={activeNotes}
            isRecording={isRecording}
            onRecording={this.handleRecording}
          >{ midiInstrument }</Board>
        </PianoContainer>
      </React.Fragment>
    );
  }
}

export default Piano;
