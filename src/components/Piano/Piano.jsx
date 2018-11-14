import React, { Component } from 'react';
import styled from 'styled-components';
import song from '../../services/song-service';
import Controls from './Controls';
import Board from './Board';
import Display from './display/Display';

const PianoWrapper = styled.div`
  display: grid;
  grid-column: 1;
  grid-row: 3;
  place-items: start start;
  align-self: start;
  justify-self: end;
  margin: 0 0 2rem rem;
`;

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
class Piano extends Component {
  state = {
    midiAccess: null,
    midiInstrument: null,
    originalRecTimeStamp: 0,
    recStartTimeStamp: 0,
    recStopTimeStamp: 0,
    goalTimeStamp: 0,
    offset: null,
    activeNotes: [],
    noteHistory: [],
    isRecording: false,
    isEditing: false,
    isPlayingBack: false,
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
<<<<<<< HEAD
    const { noteHistory } = this.props;
=======
    const { noteHistory } = this.state;
    const { previousHistory } = this.props;
>>>>>>> dev
    this.listenForMIDIAccess();
  }

  // Is called on component unmount. Clears playback interval if not already clear.
  componentWillUnmount() {
    const { playback, midiAccess } = this.state;
    clearInterval(playback.interval);
    midiAccess.inputs.forEach((message) => {
      message.onmidimessage = null;
    });
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
  // @param {boolean} isEditing - false on first record, true from then on.
  noteOn = (midiData, midiNote, midiVelocity, isEditing) => {
    const {
      recStartTimeStamp,
      recStopTimeStamp,
      goalTimeStamp,
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
      noteTimeStamp -= localOffset;
    };

    const noteObject = {};

    // Setup gain node.
    gainNode.connect(context.destination);
    gainNode.gain.value = midiVelocity / 127;

    // Set up and start oscillator node.
    oscillatorNode.type = 'sine';
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
      offset: localOffset,
      activeNotes,
      noteHistory,
    }));
  };

  // Kills note oscllators and removes notes from activeNotes array.
  // @param {object} midiData - MIDI event object with all note information.
  noteOff = (midiData) => {
    const {
      offset,
      activeNotes,
      noteHistory,
      isEditing,
    } = this.state;

    // Finds index of note to kill.
    const indexOfNoteToKill = activeNotes.findIndex(
      noteObject => noteObject.note.data[1] === midiData[1],
    );

    // Updates timeStampOff depending on if editing or not.
    let noteTimeStamp = new Date().getTime();
    if (isEditing) {
      noteTimeStamp -= offset;
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
        this.noteOff(midiData);
        break;
      default:
        console.log('Soy un default :D');
        break;
    }

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
    window.navigator.requestMIDIAccess({ sysex: false })
      .then((midiAccess) => {
        this.onMIDISuccess(midiAccess);
        this.setState({ midiAccess });
      })
      .catch(this.onMIDIFailure);
  }

  // Starts/stops recording of songs into noteHistory array.
  // Makes song-service API calls to create/update songs.
  handleRecording = () => {
    const {
      noteHistory,
      isRecording,
      recStopTimeStamp,
      goalTimeStamp,
    } = this.state;
    const { songId, songName, noteHistory: previousHistory } = this.props;

    const recStartTimeStamp = new Date().getTime();
    if (!isRecording) {
      if (previousHistory.length === 0) {
        this.setState({
          originalRecTimeStamp: recStartTimeStamp,
          recStartTimeStamp,
          isRecording: true,
          isEditing: false,
        });
      } else {
        this.setState(prevState => ({
          recStartTimeStamp,
          goalTimeStamp: prevState.goalTimeStamp + (recStartTimeStamp - recStopTimeStamp),
          isRecording: true,
          isEditing: true,
        }));
      }
    } else {
      const recStopTimeStamp = new Date().getTime();
      song.editSong(songId, { songName, noteHistory });
      this.setState({ recStopTimeStamp, isRecording: false });
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
      noteHistory.map((input, index) => (
          <span key={index}>{this.translateMidiToNote(input.data[1])}</span>
      ))
    );
  }

  // Changes the current name of the song by changing the state.
  // @param {string} songName - New name of the song from form.
  changeName = (songName) => {
    this.setState({ songName });
  }

  // Clears current noteHistory array by changing state.
  clearHistory = () => {
    this.setState({ noteHistory: [] });
  }

  // Plays back song (noteHistory array).
  playSong = () => {
    const {
      originalRecTimeStamp,
      noteHistory,
      isEditing,
      playback,
    } = this.state;

    let localTimeStamp = playback.timeStamp;
    if (localTimeStamp === 0) {
      localTimeStamp = originalRecTimeStamp;
    }

    let { noteIndex } = playback;

    // Delays execution of next line for the duration of a note.
    // @param {number} miliseconds - Time to wait in miliseconds.
    const delay = miliseconds => new Promise(resolve => setTimeout(resolve, miliseconds));

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
          isPlayingBack: false,
          playback: {
            ...playback,
            interval: null,
            timeStamp: 0,
            noteIndex: 0,
          },
        });
      } else {
        this.setState({
          playback: {
            ...playback,
            timeStamp: localTimeStamp,
            noteIndex,
          },
        });
      }
    };

    localTimeStamp += 50;
    playbackSong();
  }

  // Starts/stops interval that calls playSong() to start/stop
  // playback of song.
  startPlayback = () => {
    const { playback } = this.state;
    if (!playback.interval) {
      const playbackInterval = setInterval(this.playSong, 50);
      this.setState({
        isPlayingBack: true,
        playback: {
          ...playback,
          interval: playbackInterval,
        },
      });
    } else {
      clearInterval(playback.interval);
      this.setState({
        isPlayingBack: false,
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
      noteHistory,
      isRecording,
      midiInstrument,
<<<<<<< HEAD
      isPlayingBack,
=======
      originalRecTimeStamp,
>>>>>>> dev
    } = this.state;
    return (
      <React.Fragment>
        <Controls
          activeNotes={activeNotes}
          midiInstrument={midiInstrument}
          isRecording={isRecording}
          isPlayingBack={isPlayingBack}
          onRecording={this.handleRecording}
          startPlayback={this.startPlayback}
          clearHistory={this.clearHistory}
          changeName={this.changeName}
          translateMidiToNote={this.translateMidiToNote}
        />
        <PianoWrapper>
          <Board activeNotes={activeNotes} />
        </PianoWrapper>
        <Display noteHistory={noteHistory} originalRecTimeStamp={originalRecTimeStamp} />
      </React.Fragment>
    );
  }
}

export default Piano;
