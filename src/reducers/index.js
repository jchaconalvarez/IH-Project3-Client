import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import UiReducers from './UiReducers';
import MidiReducers from './MidiReducers';

const combidedReducers = combineReducers({ session: AuthReducers, ui: UiReducers, midi: MidiReducers });

export default combidedReducers;
