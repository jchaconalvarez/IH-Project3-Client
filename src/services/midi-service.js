// const Midi = () => {
  const notes = [];

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const context = new AudioContext();
  const oscillatorNode = context.createOscillator();
  const gainNode = context.createGain();
  oscillatorNode.connect(gainNode);
  gainNode.connect(context.destination);
  oscillatorNode.frequency.value = 0;
  oscillatorNode.start();

  // if (navigator.requestMIDIAccess) {
    export const onMIDISuccess = (midiAccess) => {
      
      midiAccess.inputs.forEach((message) => {
        message.onmidimessage = getMidiInput;
      });
    };

    export const onMIDIFailure = (error) => {
      console.log('requestMIDIAccess fail', error);
    };

    const convertNoteDataToFrequency = (noteData) => {
      const hertz = 400; // hercios
      const semitones = 12; // semitonos
      // 69 gives the number of semitones above the C five octaves below middle C
      return hertz * Math.pow(2, (noteData - 69) / semitones);
    };

    const noteOn = (midiData, midiStamp, noteData, velocityData) => {
      const noteFreq = convertNoteDataToFrequency(noteData);
      oscillatorNode.frequency.value = noteFreq;
      // oscillatorNode crea la onda sine
      // oscillatorNode.type = 'square';
      gainNode.gain.value = velocityData / 127;
      // gainNode amplifica la onda en función de la velocidad
      const timeStampON = midiStamp;
      const midiDataArray = Array.from(midiData);
      notes.push({ midiDataArray, timeStampON });
      console.log('ARRAY DE NOTAS', notes);
    };

    const noteOff = (midiStamp) => {
      // velocityData es 0 no se está pulsando nada
      oscillatorNode.frequency.value = 0;
      const timeStampOFF = midiStamp;
    };

    const getMidiInput = (midiMessage) => {
      const midiInstrumentManufacturer = midiMessage.currentTarget.manufacturer;
      const midiInstrumentModel = midiMessage.currentTarget.name;
      const midiData = midiMessage.data;
      const midiStamp = midiMessage.timeStamp;
      const status = midiData[0];
      const noteData = midiData[1];
      const velocityData = midiData[2];

      switch (status) {
        case 144:
          noteOn(midiData, midiStamp, noteData, velocityData);
          break;
        case 128:
          noteOff(midiStamp, velocityData);
          break;
        default:
          console.log('Soy un default :D');
          break;
      }
    };
  // }
// };
