import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
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
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// const settings = {
//   timestampsInSnapshots: true,
//   experimentalForceLongPolling: true
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };

const availabelProviders = {
  google: googleProvider
};

socialSignIn = async (provider) => {
  try {
    const res = await signInWithPopup(auth, availabelProviders[provider]);
    const user = res.user;
    const query = await db
      .collection('users')
      .where('uid', '==', user.uid)
      .get();
    let userData = query.docs[0]?.data();
    if (query.docs.length === 0) {
      const savedData = await db.collection('users').add({
        uid: user.uid,
        name: user.displayName,
        authProvider: provider,
        email: user.email
      });
      userData = (await savedData.get()).data();
    }
    return userData;
  } catch (err) {
    console.error(err);
    throw err.message;
  }
};

phoneSignIn = async (user) => {
  try {
    const query = await db
      .collection('users')
      .where('phone', '==', user.phone)
      .get();

    let userData = query.docs[0]?.data();
    if (query.docs.length === 0) {
      const savedData = await db.collection('users').add({
        name: user.name,
        authProvider: 'phone',
        phone: user.phone
      });

      userData = (await savedData.get()).data();
    }

    return userData;
  } catch (err) {
    console.error(err);
    throw err.message;
  }
};

registerWithEmailAndPassword = async ({ name, email, password }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(email, password);
    const data = await db.collection('users').add({
      uid: user.uid,
      name,
      authProvider: 'local',
      email
    });

    const userData = await (await data.get()).data();

    return userData;
  } catch (err) {
    throw err.message;
  }
};

logInWithEmailAndPassword = async ({ email, password }) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data;
  } catch (error) {
    throw error.message;
  }
};

logout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      throw error.message;
    });
};
