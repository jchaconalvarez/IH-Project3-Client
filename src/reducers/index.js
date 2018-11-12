import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import UiReducers from './UiReducers';

const combidedReducers = combineReducers({
  session: AuthReducers,
  ui: UiReducers,
});

export default combidedReducers;
