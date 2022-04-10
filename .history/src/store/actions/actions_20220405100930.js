import userTypes from './types';

// export const emailSignInStart = (userCredentials) => ({
//   type: userTypes.EMAIL_SIGN_IN_START,
//   payload: userCredentials,
// });

// export const signInSuccess = (user) => ({
//   type: userTypes.SIGNIN_SUCCESS,
//   payload: user,
// });

export const signInStart = (userCredentials) => ({
  type: 'SIGNIN_START',
  payload: userCredentials
})

export const signInSuccess = (userCredentials) => ({
  type: 'SIGNIN_SUCCESS',
  payload: userCredentials
})

export const signInFail = (userCredentials) => ({
  type: 'SIGNIN_ERROR',
  payload: userCredentials
})