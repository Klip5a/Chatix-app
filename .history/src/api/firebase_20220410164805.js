import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const availabelProviders = {
  google: googleProvider
};

export const socialSignIn = async (provider) => {
  try {
    const res = await signInWithPopup(auth, availabelProviders[provider]);
    const user = res.user;
    const query = await database
      .collection('users')
      .where('uid', '==', user.uid)
      .get();
    let userData = query.docs[0]?.data();
    if (query.docs.length === 0) {
      const savedData = await database.collection('users').add({
        uid: user.uid,
        name: user.displayName,
        authProvider: provider,
        email: user.email
      });
      userData = (await savedData.get()).data();
    }
    return userData;
  } catch (error) {
    console.error(error);
    throw err.message;
  }
};

export const registerWithEmailAndPassword = async ({
  email,
  password,
  username,
  dateOfBirth
}) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      username,
      password,
      dateOfBirth
    );

    const userData = await addDoc(collection(database, 'users/'), {
      uid: user.uid,
      email,
      password,
      username,
      dateOfBirth
    });

    return userData;
  } catch (error) {
    throw error.message;
  }
};

export const logInWithEmailAndPassword = async ({ email, password }) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      throw error.message;
    });
};
