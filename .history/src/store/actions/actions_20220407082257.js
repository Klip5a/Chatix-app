import userTypes from './types';

export function loading(payload) {
  return {
    type: userTypes.AUTH_LOADING,
    payload,
  };
}
