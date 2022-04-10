import { takeLatest, call, put, all } from 'redux-saga/effects';

import userTypes from '../actions/types';
import * as actions from '../actions/actions';
import { loginUser } from '../../api/firebase';

function* signInUserSaga({ email, password }) {
  try {
    const user = yield call(loginUser, { email, password });
    yield put(actions.signInUserSuccess(user));
    yield put(
      actions.setAlertAction({
        text: 'User Logged In!',
        color: 'success',
      })
    );
  } catch (error) {
    yield put(actions.setAlertAction({
      text: error.message,
      color: 'danger',
    }));
  }
}

function* signInSuccesSaga() {
  yield takeLatest(userTypes.SIGNIN_SUCCESS, signInUserSaga);
}

export default function* userSagas() {
  yield all([signInSuccesSaga]);
}
