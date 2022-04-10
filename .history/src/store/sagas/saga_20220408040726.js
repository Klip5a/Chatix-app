import { all, takeLatest, put } from 'redux-saga/effects';

import actionTypes from './actionTypes';
import * as actions from '../actions/actions';

function* signInSaga(data) {
  try {
    yield put(actions.loading(true));
  } catch (error) {}
}

export default function* authSaga() {
  yield all([takeLatest(actionTypes.SIGNIN_REQUEST, signInSaga)]);
}
