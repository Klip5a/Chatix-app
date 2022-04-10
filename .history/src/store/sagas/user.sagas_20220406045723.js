import { takeLatest, call, put, all } from 'redux-saga/effects';

import userTypes from '../actions/types';
import * as actions from '../actions/actions';
import { loginUser } from '../../api/firebase';

function* signInUserSaga({ payload }) {
  try {
    const user = yield call(loginUser, payload);
    yield put(actions.signInUserSuccess(user));
    yield put(
      actions.setAlertAction(console.log('signin success'))
    );
  } catch (error) {
    yield put(
      actions.setAlertAction({
        text: error.message,
        color: 'danger',
      })
    );
  }
}

function* watchSignInUserSaga() {
  yield takeLatest(userTypes.SIGNIN_SUCCESS, signInUserSaga);
}

export default function* userSagas() {
  yield all([watchSignInUserSaga]);
}
