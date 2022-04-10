import { takeLatest, call, put, all, take } from 'redux-saga/effects';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import * as types from '../actions/types';
import * as actions from '../actions/actions';

function* signInUserSaga() {
  const data = yield take(types.SIGNIN_USER);
  console.log(data);
}

export default function* userSagas() {
  yield all([signInUserSaga]);
  // yield all([watchSignInUserSaga]);
}
