import { takeLatest, call, put, all } from 'redux-saga/effects';

import userTypes from '../actions/types';
// import { signInSuccess } from '../actions/actions';
import { signInStart, signInSuccess, signInFail } from '../actions/actions';
import { loginUser } from '../../api/firebase';

// export function* emailSignIn({ payload: { email, password } }) {
//   try {
//     yield auth.signInWithEmailAndPassword(email, password);
//     console.log('success signin')
//   } catch (error) {
//     console.log(error);
//   }
// }

// export function* onEmailSignInStart() {
//   yield takeLatest(userTypes.SIGNIN_SUCCESS, emailSignIn);
// }

// export default function* userSagas() {
//   yield all([call(onEmailSignInStart)]);
// }

export default function* signIn({ email, password }) {
  try {
    const data = yield call(loginUser, { email, password });
    yield put(signInSuccess(data.user));
    return data.user.uid
  } catch (error) {
    yield put(signInFail(error.message));
  }
}

// export function* signInStart() {
//   yield takeLatest(userTypes.SIGNIN_SUCCESS, signInSuccess);
// }

// export default function* userSagas() {
//   yield all([call(signIn)]);
// }
