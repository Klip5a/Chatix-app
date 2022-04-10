import userTypes from './types';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../api/firebase';

export const emailSignInStart = (userCredentials) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = (user) => ({
  type: userTypes.SIGNIN_SUCCESS,
  payload: user,
});
