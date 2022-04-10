import userTypes from './types';
import { auth, handleUserProfile, GoogleProvider } from '../../api/firebase';

export const signInSuccess = (userCredentials) => ({
  type: userTypes.SIGNIN_SUCCESS,
  payload: userCredentials,
});
