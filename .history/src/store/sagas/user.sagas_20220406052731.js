import { takeLatest, call, put, all } from 'redux-saga/effects';

import userTypes from '../actions/types';
import * as actions from '../actions/actions';
import { loginUser } from '../../api/firebase';

function* signInUserSaga({ email, password }) {
  try {
    const user = yield call(loginUser, email, password);
    yield put(actions.signInUserSuccess(user));
    yield put(actions.setAlertAction(console.log('signin success')));
    console.log('signInUserSaga succes')
  } catch (error) {
    yield put(
      actions.setAlertAction({
        text: error.message,
      })
    );
  }
}

function* watchSignInUserSaga() {
  yield takeLatest(userTypes.SIGNIN_USER, signInUserSaga);
}

export default function* userSagas() {
  yield all([watchSignInUserSaga]);
}
