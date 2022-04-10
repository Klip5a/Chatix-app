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
