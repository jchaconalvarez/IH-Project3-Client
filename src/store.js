import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AuthReducers from './modules/auth/AuthReducers';

import authSaga from './modules/auth/AuthSaga';

const sagaMiddleware = createSagaMiddleware();

/* eslint-disable no-underscore-dangle */
const store = createStore(
  AuthReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
);
/* eslint-enable */

sagaMiddleware.run(authSaga);

store.subscribe(() => {
  console.log('Store changed!', store.getState());
});

export default store;
