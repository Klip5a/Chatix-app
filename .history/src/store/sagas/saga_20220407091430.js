import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import userTypes from '../actions/actionTypes';
import * as actions from '../actions/actions';

export default function* authSaga() {
  yield all([]);
}
