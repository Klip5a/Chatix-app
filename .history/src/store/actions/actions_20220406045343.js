import userTypes from './types';

// export const emailSignInStart = (userCredentials) => ({
//   type: userTypes.EMAIL_SIGN_IN_START,
//   payload: userCredentials,
// });

// export const signInSuccess = (user) => ({
//   type: userTypes.SIGNIN_SUCCESS,
//   payload: user,
// });

// export const signInStart = (payload) => ({
//   type: userTypes.SIGNIN_START,
//   payload,
// });

// export const signInSuccess = (payload) => ({
//   type: userTypes.SIGNIN_SUCCESS,
//   payload,
// });

// export const signInFail = (payload) => ({
//   type: userTypes.SIGNIN_ERROR,
//   payload,
// });

/**
 *
 * @param {email, password} payload
 */
export const signInUser = (payload) => {
  return {
    type: userTypes.SIGNIN_USER,
    payload,
  };
};

/**
 *
 * @param {token} user
 */
export const signInUserSuccess = (user) => {
  return {
    type: userTypes.SIGNIN_SUCCESS,
    user,
  };
};


export const setAlertAction = (error) => {
  return {
    type: userTypes.SET_ALERT,
    error
  };
};

export const resetAlertAction = () => {
  return {
    type: userTypes.RESET_ALERT,
  };
};
