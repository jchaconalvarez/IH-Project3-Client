const MidiReducers = (state = {}, action) => {
  switch (action.type) {
    case 'IS_PLAYING_TRUE': {
      return {
        ...state,
        isPlaying: true,
      };
    }
    case 'IS_PLAYING_FALSE': {
      return {
        ...state,
        isPlaying: false,
      };
    }
    case 'NOTE_ACTIVATED': {
      console.log('NOTE_ACTIVATED');
      const { activeNotes } = state;
      const { noteHistory } = state;
      activeNotes.push(action.note);
      noteHistory.push(action.note);
      return {
        ...state,
        activeNotes,
        noteHistory,
      };
    }
    case 'NOTE_DEACTIVATED': {
      console.log('NOTE_DEACTIVATED');
      const { activeNotes } = state;
      const indexOfNoteToKill = activeNotes.findIndex((noteObject) => {
        return noteObject.note.data[1] === action.note;
      });
      activeNotes[indexOfNoteToKill].oscillator.stop();
      activeNotes.splice(indexOfNoteToKill, 1);
      return {
        ...state,
        activeNotes,
      };
    }
    case 'NOTE_ADDED_TO_HISTORY': {
      const { noteHistory } = state;
      noteHistory.push(action.note);
      return {
        ...state,
        noteHistory,
      };
    }
    default: {
      return state;
    }
  }
};

export default MidiReducers;
