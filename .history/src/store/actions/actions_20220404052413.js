import userTypes from './types';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { db, auth, provider } from '../../api/firebase';

export const signInSuccess = (userCredentials) => ({
  type: userTypes.SIGNIN_SUCCESS,
  payload: userCredentials,
});
