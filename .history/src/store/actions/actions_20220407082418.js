import actionTypes from './actionTypes';

export function loading(payload) {
  return {
    type: userTypes.AUTH_LOADING,
    payload,
  };
}

export function authError(payload) {
  return { type: userTypes.AUTH_ERROR, payload };
}
