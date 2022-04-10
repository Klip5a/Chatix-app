import userTypes from './types';

// export const emailSignInStart = (userCredentials) => ({
//   type: userTypes.EMAIL_SIGN_IN_START,
//   payload: userCredentials,
// });

// export const signInSuccess = (user) => ({
//   type: userTypes.SIGNIN_SUCCESS,
//   payload: user,
// });

export const signInStart = (payload) => ({
  type: userTypes.SIGNIN_START,
  payload,
});

export const signInSuccess = (payload) => ({
  type: userTypes.SIGNIN_SUCCESS,
  payload,
});

export const signInFail = (payload) => ({
  type: userTypes.SIGNIN_ERROR,
  payload,
});
