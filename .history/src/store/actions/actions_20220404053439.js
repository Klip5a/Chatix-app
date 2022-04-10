import userTypes from './types';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../api/firebase';

export const emailSignIn = (userCredentials) => ({
  type: userTypes.SIGNIN_SUCCESS,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGNIN_SUCCESS,
  payload: user,
});
