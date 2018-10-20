class MidiController {
  constructor() {
    this.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new this.AudioContext();
    this.noteHistory = [];
    this.activeNotes = [];
  }

  convertNoteDataToFrequency = (noteData) => {
    const hertz = 440;
    const semitones = 12;
    return hertz * (2 ** ((noteData - 69) / semitones));
  }

  noteOn = (midiData, midiStamp, noteData, velocityData) => {
    const oscillatorNode = this.context.createOscillator();
    const gainNode = this.context.createGain();
    const noteFrequency = this.convertNoteDataToFrequency(noteData);
    const note = Array.from(midiData);
    const noteObject = {};

    oscillatorNode.connect(gainNode);
    gainNode.connect(this.context.destination);
    oscillatorNode.frequency.value = noteFrequency;
    gainNode.gain.value = velocityData / 127;
    oscillatorNode.start();
    noteObject.oscillator = oscillatorNode;
    this.noteHistory.push(note);
    noteObject.note = {
      data: Array.from(midiData),
      timeStampOn: midiStamp,
    };
    this.activeNotes.push(noteObject);
    // console.log('ON: ', this.activeNotes);
    // console.log(notes);
  };

  noteOff = (midiData, midiStamp) => {
    const indexOfNoteToKill = this.activeNotes.findIndex((noteObject) => {
      return noteObject.note.data[1] === midiData[1];
    });
    this.activeNotes[indexOfNoteToKill].oscillator.stop();
    this.activeNotes.splice(indexOfNoteToKill, 1);
    // velocityData es 0 no se está pulsando nada
    // oscillatorNode.frequency.value = 0;
    // console.log(indexOfNoteToKill);
    // console.log('OFF: ', activeNotes);
  };

  getMidiInput = (midiMessage) => {
    // const midiInstrumentManufacturer = midiMessage.currentTarget.manufacturer;
    // const midiInstrumentModel = midiMessage.currentTarget.name;
    console.log(midiMessage);
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

  updateNoteArrays = () => {
    console.log('updatenotearrays');
    return this.activeNotes;
  }
}

const midiController = new MidiController();

export default midiController;
