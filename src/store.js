import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import combinedReducers from './reducers';

const session = {
  user: null,
  isLogged: false,
  status: 'loading',
};

const ui = {
  showLogin: false,
};

const midi = {
  isPlaying: false,
  activeNotes: [],
  noteHistory: [],
};

/* eslint-disable no-underscore-dangle */
const store = createStore(
  combinedReducers,
  { session, ui, midi },
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
);
/* eslint-enable */

store.subscribe(() => {
  console.log('Store changed!', store.getState());
});

export default store;
