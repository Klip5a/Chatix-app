import { takeLatest, call, put, all, take } from 'redux-saga/effects';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import userTypes from '../actions/types';
import * as actions from '../actions/actions';

function* signInUserSaga() {
  const data = yield take(actions.signInUser);
  console.log(data);
}

export default function* userSagas() {
  yield all([signInUserSaga]);
  // yield all([watchSignInUserSaga]);
}
