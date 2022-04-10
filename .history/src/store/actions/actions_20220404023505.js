import userTypes from './types';
// import { auth, handleUserProfile, GoogleProvider } from '../../api/firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export const signInSuccess = (userCredentials) => ({
  type: userTypes.SIGNIN_SUCCESS,
  payload: userCredentials,
});
