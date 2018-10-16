const midi = (midiData) => {
  const audio_context = window.AudioContext || window.webkitAudioContext;
  const context = new audio_context();
  const oscillatorNode = context.createOscillator();
  const gainNode = context.createGain();
  oscillatorNode.connect(gainNode);
  gainNode.connect(context.destination);
  oscillatorNode.frequency.value = 0;
  oscillatorNode.start();


  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({ sysex: false })
      .then(onMIDISuccess)
      .catch(onMIDIFailure)
    console.log('This browser supports WebMIDI!');

    const onMIDISuccess = (midiAccess) => {
      listInputAndOutputs(midiAccess)
      midiAccess.inputs.forEach((message) => {
        message.onmidimessage = getMidiInput
      });
    }

    const listInputAndOutputs = (midiAccess) => {
      for (var entry of midiAccess.inputs) {
        var input = entry[1];
        console.log('input', input);
      }

      for (var entry of midiAccess.outputs) {
        var output = entry[1];
        console.log('output', output);
      }
    }

    const onMIDIFailure = (error) => {
      console.log('requestMIDIAccess fail', error);
    }


    const getMidiInput = (midiMessage) => {
      console.log(midiMessage)
      midiData = midiMessage.data
      const status = midiData[0];
      const noteData = midiData[1];
      const velocityData = midiData[2]

      switch (status) {
        case 144:
          noteOn(noteData, velocityData)
          break;
        case 124:
          noteOff(noteData, velocityData)
          break;
        default:
          noteOff(noteData, velocityData)
          break;
      }

      // if(status === 144) {
      //   // this.midiSounds.playChordNow(3, [noteData], 1);
      //   }
    }

    const noteOn = (noteData, velocityData) => {
      const noteFreq = convertNoteDataToFrequency(noteData);
      oscillatorNode.frequency.value = noteFreq;
      // oscillatorNode.type = 'square';
      gainNode.gain.value = velocityData / 127;
      // oscillatorNode crea la onda sine
      //gainNode amplifica la onda en función de la velocidad
    }

    const noteOff = (noteData, velocityData) => {
      //velocityData es 0 no se está pulsando nada
      oscillatorNode.frequency.value = velocityData;
    }

    const convertNoteDataToFrequency = (noteData) => {
      const hertz = 400; // hercios
      const semitones = 12; // semitonos
      //69 gives the number of semitones above the C five octaves below middle C
      return hertz * Math.pow(2, (noteData - 69) / semitones);
    }

    navigator.requestMIDIAccess()
      .then(onMIDISuccess, onMIDIFailure)
  }
}

export default midi;
