import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import actionTypes from '../actions/actionTypes';
import * as actions from '../actions/actions';
import { signIn, logout, signUp, socialSignIn } from '../../api/firebase';

function* signInSaga(data) {
  try {
    yield put(actions.loading(true));
    yield put(actions.authError(null));
    const userData = yield signIn(data.payload);
    yield put(actions.signInSuccess(userData));
    toast.success('🦄 Вход выполнен!', {
      position: 'top-left',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } catch (error) {
    yield put(actions.authError(error));
  }
  yield put(actions.loading(false));
}

function* logOutSaga() {
  try {
    yield logout();
    yield put(actions.logOutSuccess());
    toast.success('🦄 Выход выполнен успешно!', {
      position: 'top-left',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } catch (error) {
    yield put(actions.authError(error.message));
  }
}

function* signUnSaga({ payload }) {
  try {
    yield put(actions.loading(true));
    yield put(actions.authError(null));
    let response = yield call(signUp, payload.data);
    yield put(actions.signInSuccess({ user: response }));
    toast.success('🦄 Учетная запись успешно создана!', {
      position: 'top-left',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    if (payload.callback) {
      payload.callback();
    }
  } catch (error) {
    yield put(actions.authError(error));
  }
  yield put(actions.loading(false));
}

// function* loginSocial({ payload }) {
//   try {
//     yield put(actions.loading(true));
//     yield put(actions.authError(null));
//     let response = yield call(socialSignIn, payload);

//     yield put(actions.signInSuccess({ user: response }));
//     toast.success('Вход выполнен!');
//   } catch (error) {
//     toast.error('Не удается войти, пожалуйста попробуйте еще раз!');
//     yield put(
//       actions.authError('Не удается войти, пожалуйста попробуйте еще раз !')
//     );
//   }
//   yield put(actions.loading(false));
// }

export default function* authSaga() {
  yield all([takeLatest(actionTypes.SIGNIN_REQUEST, signInSaga)]);
  yield all([takeLatest(actionTypes.LOGOUT, logOutSaga)]);
  yield all([takeLatest(actionTypes.SIGNUP_REQUEST, signUnSaga)]);
  // yield all([takeLatest(actionTypes.SOCIAL_LOGIN, loginSocial)]);
}
