import React, { Component } from 'react';
import styled from 'styled-components';
import song from '../../services/song-service';
import Controls from './Controls';
import Board from './Board';
import PianoForm from './PianoForm';
import Display from './Display';

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
class Piano extends Component {
  state = {
    songId: null,
    songName: null,
    midiInstrument: null,
    recStartTimeStamp: 0,
    recStopTimeStamp: 0,
    offset: null,
    activeNotes: [],
    noteHistory: [],
    isRecording: false,
    isPlaying: true,
    isEditing: false,
    playback: {
      interval: null,
      timeStamp: 0,
      noteIndex: 0,
    },
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
  noteOn = (midiData, midiNote, midiVelocity, isEditing) => {
    const {
      recStartTimeStamp,
      recStopTimeStamp,
      activeNotes,
      noteHistory,
      isRecording,
    } = this.state;

    // Create oscillator and gain nodes for synth.
    const oscillatorNode = context.createOscillator();
    const gainNode = context.createGain();

    // Variables used to create noteObject.
    const noteHz = this.convertNoteDataToFrequency(midiNote);

    let noteTimeStamp = new Date().getTime();
    const localOffset = recStartTimeStamp - recStopTimeStamp;
    let goalTs = 0;
    if (isEditing) {
      goalTs = recStartTimeStamp - localOffset;
      noteTimeStamp -= goalTs;
    } else {
      noteTimeStamp -= recStartTimeStamp;
    }

    const noteObject = {};

    // Setup gain node.
    gainNode.connect(context.destination);
    gainNode.gain.value = midiVelocity / 127;

    // Set up and start oscillator node.
    oscillatorNode.type = 'square';
    oscillatorNode.frequency.value = noteHz;
    oscillatorNode.connect(gainNode);
    oscillatorNode.start();

    // Create note object to push to noteHistory if recording.
    noteObject.oscillator = oscillatorNode;
    noteObject.note = {
      data: midiData,
      timeStampOn: noteTimeStamp,
      timeStampOff: null,
    };
    isRecording && noteHistory.push(noteObject.note);

    // Push notes to activeNotes and update state.
    activeNotes.push(noteObject);
    this.setState(prevState => ({
      recStartTimestamp: prevState.recStartTimestamp - localOffset,
      offset: goalTs,
      activeNotes,
      noteHistory,
    }));
  };

  // Kills note oscllators and removes notes from activeNotes array.
  // @param {object} midiData - MIDI event object with all note information.
  noteOff = (midiData) => {
    const {
      recStartTimeStamp,
      offset,
      activeNotes,
      noteHistory,
      isEditing,
    } = this.state;

    // Finds index of note to kill.
    const indexOfNoteToKill = activeNotes.findIndex((noteObject) => {
      return noteObject.note.data[1] === midiData[1];
    });

    // Updates timeStampOff depending on if editing or not.
    let noteTimeStamp = new Date().getTime();
    if (isEditing) {
      noteTimeStamp -= offset;
    } else {
      noteTimeStamp -= recStartTimeStamp;
    }

    // Sets note timeStampOff, stops oscillator, and removes note from
    // activeNote array.
    activeNotes[indexOfNoteToKill].note.timeStampOff = noteTimeStamp;
    activeNotes[indexOfNoteToKill].oscillator.stop();
    activeNotes[indexOfNoteToKill].oscillator.disconnect();
    activeNotes.splice(indexOfNoteToKill, 1);

    this.setState({ activeNotes, noteHistory });
  };

  // Calls noteOn() or noteOff methods according to MIDI status value.
  // Sets midiInstrument value.
  // @params {object} midiMessage - MIDI event object.
  getMidiInput = (midiMessage) => {
    const { isEditing } = this.state;
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
        this.noteOn(midiData, midiNote, midiVelocity, isEditing);
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
    const recStartTimeStamp = new Date().getTime();
    if (!isRecording) {
      if (!songId) {
        song.newSong({ songName, noteHistory })
          .then((newSong) => {
            this.setState({ songId: newSong._id, recStartTimeStamp, isRecording: true });
          });
      } else {
        this.setState({ recStartTimeStamp, isRecording: true, isEditing: true });
      }
    } else {
      const recStopTimeStamp = new Date().getTime();
      song.editSong(songId, { songName, noteHistory });
      this.setState({ recStopTimeStamp, isRecording: false, isEditing: true });
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
  // @returns {DOM Element}
  showNotes = () => {
    const { noteHistory } = this.state;
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
      noteHistory,
      isEditing,
      playback,
    } = this.state;

    let localTimeStamp = playback.timeStamp;
    let { noteIndex } = playback;

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

      this.noteOn(midiData, midiNote, midiVelocity, isEditing);
      await delay(noteDuration);
      this.noteOff(midiData);
    };

    // Calls playNote on appropriate notes
    // Clears playback interval once end of noteHistory array is reached.
    const playbackSong = () => {
      if (noteHistory[noteIndex].timeStampOn <= localTimeStamp) {
        playNote(noteHistory[noteIndex]);
        noteIndex++;
      }
      if (noteIndex === noteHistory.length) {
        clearInterval(playback.interval);
        this.setState({
          playback: {
            ...playback,
            interval: 0,
            timeStamp: 0,
            noteIndex: 0,
          },
        });
      } else {
        localTimeStamp += 10;
        this.setState({
          playback: {
            ...playback,
            timeStamp: localTimeStamp,
            noteIndex,
          },
        });
      }
    };

    playbackSong();
  }

  // Starts/stops interval that calls playSong() to start/stop
  // playback of song.
  startPlayback = () => {
    const { playback } = this.state;
    if (!playback.interval) {
      const playbackInterval = setInterval(this.playSong, 10);
      this.setState({
        playback: {
          ...playback,
          interval: playbackInterval,
        },
      });
    } else {
      clearInterval(playback.interval);
      this.setState({
        playback: {
          ...playback,
          interval: null,
        },
      });
    }
  }

  render() {
    const {
      activeNotes,
      isRecording,
      isPlaying,
      midiInstrument,
    } = this.state;
    return (
      <React.Fragment>
        <Controls
          activeNotes={activeNotes}
          isRecording={isRecording}
          isPlaying={isPlaying}
          midiInstrument={midiInstrument}
          onRecording={this.handleRecording}
          clearHistory={this.clearHistory}
          playSong={this.startPlayback}
        >
          <PianoForm changeName={this.changeName} />
          {/* <button type="button" onClick={this.clearHistory}>Clear</button> */}
        </Controls>
        <PianoWrapper>
          <Board activeNotes={activeNotes} />
        </PianoWrapper>
        <Display activeNotes={activeNotes}>
          { this.showNotes() }
        </Display>
      </React.Fragment>
    );
  }
}

export default Piano;
