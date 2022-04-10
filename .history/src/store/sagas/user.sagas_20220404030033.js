import { takeLatest, call, put, all } from 'redux-saga/effects';

import userTypes from '../actions/types';
import { signInSuccess } from '../actions/actions';

export function* emailSignIn({ payload: { email, password } }) {}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.SIGNIN_SUCCESS, emailSignIn);
}

export default function* userSagas() {
  yield all([call(onEmailSignInStart)]);
}
