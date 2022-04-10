import { takeLatest, call, put, all } from 'redux-saga/effects';

import userTypes from '../actions/types';
import * as actions from '../actions/actions';
import { loginUser } from '../../api/firebase';

function* signInStartSaga({ email, password }) {
  try {
    const user = yield call(loginUser, { email, password });
    yield put(actions.signInUserSuccess(user));
  } catch (error) {
    yield put(signInFail(error.message));
  }
}

function* signInSuccesSaga() {
  yield takeLatest(userTypes.SIGNIN_SUCCESS, signInStartSaga);
}

export default function* userSagas() {
  yield all([(signInSuccesSaga)]);
}
