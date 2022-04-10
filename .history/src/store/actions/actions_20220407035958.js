// import userTypes from './types';
import * as types from './types';

export const signInUser = (payload) => ({
  type: types.SIGNIN_USER,
  payload
});

export const signInUserSuccess = (payload) => ({
  type: types.SIGNIN_SUCCESS,
  payload
});

export const signInUserFail = (payload) => ({
  type: types.SIGNIN_FAIL,
  payload
});

/**
 *
 * @param {text} alertMessage
 */
export const setAlertAction = (alertMessage) => ({
  type: userTypes.SET_ALERT,
  alertMessage,
});

export const resetAlertAction = () => ({
  type: userTypes.RESET_ALERT,
});