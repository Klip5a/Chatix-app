import { takeLatest, call, put, all } from 'redux-saga/effects';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import userTypes from '../actions/types';
import * as actions from '../actions/actions';
// import { loginUser } from '../../api/firebase';

const loginUser = ({ email, password }) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      signInUserSaga(userCredentials)
    })
    .catch((error) => {
      console.log(error);
    });
};

function* signInUserSaga({ email, password }) {
  try {
    const { user } = yield loginUser(email, password);
    yield put(actions.signInUserSuccess(user));
    yield put(actions.setAlertAction({ text: 'succes' }));
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
