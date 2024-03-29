import actionTypes from './actionTypes';

export function loading(payload) {
  return { type: actionTypes.AUTH_LOADING, payload };
}

export function authError(payload) {
  return { type: actionTypes.AUTH_ERROR, payload };
}

export function signInRequest(payload) {
  return { type: actionTypes.SIGNIN_REQUEST, payload };
}

export function signInSuccess(payload) {
  return { type: actionTypes.SIGNIN_SUCCESS, payload: payload };
}

export function signUpRequest(payload) {
  return { type: actionTypes.SIGNUP_REQUEST, payload };
}
export function logOut() {
  return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS };
}

export function socialLogin(payload) {
  return { type: actionTypes.SOCIAL_LOGIN, payload };
}
