import { all, takeLatest, put } from 'redux-saga/effects';

import actionTypes from './actionTypes';
import * as actions from '../actions/actions';
import { emailAndPasswordSignIn } from '../../api/firebase';

function* signInSaga(data) {
  try {
    yield put(actions.loading(true));
    yield put(actions.authError(null));
    const userData = yield emailAndPasswordSignIn(data.payload);
    yield put(actions.signInSuccess(userData));
    alert('Login Successfully.');
  } catch (error) {
    yield put(actions.authError(error));
  }
  yield put(actions.loading(false));
}

export default function* authSaga() {
  yield all([takeLatest(actionTypes.SIGNIN_REQUEST, signInSaga)]);
}
