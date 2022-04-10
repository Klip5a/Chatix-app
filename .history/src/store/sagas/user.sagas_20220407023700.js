import { takeLatest, call, put, all, take } from 'redux-saga/effects';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import userTypes from '../actions/types';
import * as actions from '../actions/actions';

function* signInUserSaga({ payload: { email, password } }) {
  const actions = yield take(userTypes.SIGNIN_USER);
  console.log(actions);
  // try {
  //   const { user } = yield actions.signInUser(email, password);
  //   yield put(actions.signInUserSuccess(user));
  //   yield put(actions.setAlertAction({ text: 'success' }));
  // } catch (error) {
  //   yield put(
  //     actions.setAlertAction({
  //       text: error.message,
  //     })
  //   );
  // }
}

function* watchSignInUserSaga() {
  yield takeLatest(userTypes.SIGNIN_USER, signInUserSaga);
}

export default function* userSagas() {
  yield all([signInUserSaga]);
  // yield all([watchSignInUserSaga]);
}
