import { all, put, takeEvery } from 'redux-saga/effects';
import auth from './services/auth-service';

function* signUp(action) {
  const user = yield auth.signup(action.payload);
  try {
    yield put({ type: 'SIGN_UP_SUCCEEDED', user });
  } catch (error) {
    yield put({ type: 'SIGN_UP_FAILED', message: error.message });
  }
}

function* watchSignUp() {
  yield takeEvery('SIGN_UP_REQUESTED', signUp);
}

function* logIn(action) {
  const user = yield auth.login(action.payload);
  try {
    yield put({ type: 'LOG_IN_SUCCEEDED', user });
  } catch (error) {
    yield put({ type: 'LOG_IN_FAILED', message: error.message });
  }
}

function* watchLogIn() {
  yield takeEvery('LOG_IN_REQUESTED', logIn);
}

export default function* authSaga() {
  yield all([
    watchSignUp(),
    watchLogIn(),
  ]);
}
