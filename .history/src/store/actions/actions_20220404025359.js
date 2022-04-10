import userTypes from './types';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { analytics } from '../../api/firebase';


export const signInSuccess = (userCredentials) => ({
  type: userTypes.SIGNIN_SUCCESS,
  payload: userCredentials,
});
