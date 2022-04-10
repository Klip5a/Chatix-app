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
