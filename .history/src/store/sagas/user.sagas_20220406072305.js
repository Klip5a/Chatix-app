import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import userTypes from '../actions/types';
import * as actions from '../actions/actions';
// import { loginUser } from '../../api/firebase';

// import { useDispatch } from 'react-redux';

const signInStart = (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Singed in user: ', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('An error occured: ', errorCode, errorMessage);
    });
};

function* signInUserSaga({ payload: { email, password } }) {
  try {
    const { user } = yield signInStart(email, password);
    yield put(actions.signInUserSuccess(user));
    yield put(actions.setAlertAction({ text: 'success' }));
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
