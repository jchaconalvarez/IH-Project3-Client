import * as actions from './actionTypes';

const isPlaying = () => {
  return {
    type: actions.IS_PLAYING_TRUE,
  };
};

const isNotPlaying = () => {
  return {
    type: actions.IS_PLAYING_FALSE,
  };
};

// export const checkIfPlaying = (dispatch, activeNotes) => {
//   activeNotes.length > 0 ? dispatch(isPlaying()) : dispatch(isNotPlaying());
// };

export const noteActivated = (note) => {
  console.log(actions.NOTE_ACTIVATED);
  return {
    type: actions.NOTE_ACTIVATED,
    note,
  };
};

export const noteDeactivated = (note) => {
  return {
    type: actions.NOTE_DEACTIVATED,
    note,
  };
};
