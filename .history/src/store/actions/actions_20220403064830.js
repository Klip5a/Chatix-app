import { SET_CURRENT_USER, SIGNIN_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR } from './types';
import { auth, handleUserProfile, GoogleProvider } from '../../api/firebase';

export const signInSuccess = (userCredentials) => ({
  type: SIGNIN_SUCCESS,
  payload: userCredentials,
});
