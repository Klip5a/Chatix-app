import { all, takeLatest, put, call } from 'redux-saga/effects';

import actionTypes from '../actions/actionTypes';
import * as actions from '../actions/actions';
import AuthRepository from '../../repository/AuthRepositry';

function* signInSaga(data) {
  try {
    yield put(actions.loading(true));
    yield put(actions.authError(null));
    const userData = yield AuthRepository.logInWithEmailAndPassword(
      data.payload
    );
    yield put(actions.signInSuccess(userData));
    alert('Login Successfully.');
  } catch (error) {
    yield put(actions.authError(error));
  }
  yield put(actions.loading(false));
}

function* logOutSaga() {
  try {
    yield AuthRepository.logout();
    yield put(logOutSuccess());
    alert('Logout Sucessfully');
  } catch (err) {
    yield put(authError(err.message));
  }
}

function* registerLocalSaga({ payload }) {
  try {
    yield put(loading(true));
    yield put(authError(null));
    let response = yield call(
      AuthRepository.registerWithEmailAndPassword,
      payload.data
    );
    yield put(loginSuccess({ user: response }));
    alert('Account Created successfully!');
    if (payload.callback) {
      payload.callback();
    }
  } catch (err) {
    yield put(authError(err));
  }
  yield put(loading(false));
}

function* loginSocial({ payload }) {
  try {
    yield put(loading(true));
    yield put(authError(null));
    let response = yield call(AuthRepository.socialSignIn, payload);

    yield put(loginSuccess({ user: response }));
    alert('Login  successfully!');
  } catch (err) {
    alert('Unable to Login Please Try Again !');
    yield put(authError('Unable to Login Please Try Again !'));
  }
  yield put(loading(false));
}

function* phoneSignIn({ payload }) {
  try {
    yield put(loading(true));
    yield put(authError(null));
    let response = yield call(AuthRepository.phoneSignIn, payload);
    yield put(loginSuccess({ user: response }));
    alert('Login  successfully!');
  } catch (err) {
    alert('Unable to Login Please Try Again !');
    yield put(authError('Unable to Login Please Try Again !'));
  }
  yield put(loading(false));
}

export default function* authSaga() {
  yield all([takeLatest(actionTypes.SIGNIN_REQUEST, signInSaga)]);
  yield all([takeLatest(actionTypes.LOGOUT, logOutSaga)]);
  yield all([takeLatest(actionTypes.REGISTER_LOCAL, registerLocalSaga)]);
  yield all([takeLatest(actionTypes.SOCIAL_LOGIN, loginSocial)]);
  yield all([takeLatest(actionTypes.PHONE_LOGIN, phoneSignIn)]);
}
