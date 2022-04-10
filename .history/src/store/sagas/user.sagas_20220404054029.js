import { takeLatest, call, put, all } from 'redux-saga/effects';

import { auth } from '../../api/firebase';
import userTypes from '../actions/types';
import { signInSuccess } from '../actions/actions';

export function* emailSignIn({ payload: { email, password } }) {
  try {
    yield auth.signInWithEmailAndPassword(email, password);
    console.log('success signin')
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
