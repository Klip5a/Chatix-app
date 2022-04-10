import actionTypes from './actionTypes';

export function loading(payload) {
  return {
    type: actionTypes.AUTH_LOADING,
    payload,
  };
}

export function authError(payload) {
  return { type: actionTypes.AUTH_ERROR, payload };
}

export function login(payload) {
  return { type: actionTypes.SIGNIN_REQUEST, payload };
}

export function loginSuccess(payload) {
  return { type: actionTypes.SIGNIN_SUCCESS, payload: payload };
}

export function logOut() {
  return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
  return { type: actionTypes.LOGOUT_SUCCESS };
}

export function registerLocal(payload) {
  return { type: actionTypes.REGISTER_LOCAL, payload };
}

export function socialLogin(payload) {
  return { type: actionTypes.SOCIAL_LOGIN, payload };
}

export function phoneLogin(payload) {
  re