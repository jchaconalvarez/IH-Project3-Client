import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';

const combidedReducers = combineReducers({ session: AuthReducers });

export default combidedReducers;
