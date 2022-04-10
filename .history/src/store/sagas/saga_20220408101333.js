import { all, takeLatest, put, call } from 'redux-saga/effects';

import actionTypes from '../actions/actionTypes';
import * as actions from '../actions/actions';
import {
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  socialSignIn
} from '../../api/firebase';

function* signInSaga(data) {
  try {
    yield put(actions.loading(true));
    yield put(actions.authError(null));
    const userData = yield logInWithEmailAndPassword(data.payload);
    yield put(actions.signInSuccess(userData));
    alert('Login Successfully.');
  } catch (error) {
    yield put(actions.authError(error));
  }
  yield put(actions.loading(false));
}

function* logOutSaga() {
  try {
    yield logout();
    yield put(actions.logOutSuccess());
    alert('Logout Sucessfully');
  } catch (err) {
    yield put(actions.authError(err.message));
  }
}

function* registerLocalSaga({ payload }) {
  try {
    yield put(actions.loading(true));
    yield put(actions.authError(null));
    let response = yield call(registerWithEmailAndPassword, payload.data);
    yield put(actions.signInSuccess({ user: response }));
    alert('Account Created successfully!');
    if (payload.callback) {
      payload.callback();
    }
  } catch (err) {
    yield put(actions.authError(err));
  }
  yield put(actions.loading(false));
}

function* loginSocial({ payload }) {
  try {
    yield put(actions.loading(true));
    yield put(actions.authError(null));
    let response = yield call(socialSignIn, payload);

    yield put(actions.signInSuccess({ user: response }));
    alert('Login  successfully!');
  } catch (err) {
    alert('Unable to Login Please Try Again !');
    yield put(actions.authError('Unable to Login Please Try Again !'));
  }
  yield put(actions.loading(false));
}

export default function* authSaga() {
  yield all([takeLatest(actionTypes.SIGNIN_REQUEST, signInSaga)]);
  yield all([takeLatest(actionTypes.LOGOUT, logOutSaga)]);
  yield all([takeLatest(actionTypes.REGISTER_LOCAL, registerLocalSaga)]);
  yield all([takeLatest(actionTypes.SOCIAL_LOGIN, loginSocial)]);
}
