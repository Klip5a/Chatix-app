import userTypes from './types';

export const signInUser = (userCredentials) => ({
  type: userTypes.SIGNIN_USER,
  payload: userCredentials,
});

export const signInUserSuccess = (user) => ({
  type: userTypes.SIGNIN_SUCCESS,
  payload: user,
});

export const signInUserFail = (error) => ({
  type: userTypes.SIGNIN_SUCCESS,
  payload: error,
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
