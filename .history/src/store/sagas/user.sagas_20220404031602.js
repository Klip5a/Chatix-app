import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { analytics } from '../../api/firebase';
import userTypes from '../actions/types';
import { signInSuccess } from '../actions/actions';

export function* emailSignIn({ payload: { email, password } }) {
  const auth = getAuth();
  yield analytics.signInWithEmailAndPassword(auth, email, password);
  try {
  } catch (error) {
    console.log(error);
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.SIGNIN_SUCCESS, emailSignIn);
}

export default function* userSagas() {
  yield all([call(onEmailSignInStart)]);
}
