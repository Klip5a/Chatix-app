import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { db, auth, provider } from '../../api/firebase';
import userTypes from '../actions/types';
import { signInSuccess } from '../actions/actions';

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const auth = getAuth();
    yield db.signInWithEmailAndPassword(auth, email, password);
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
