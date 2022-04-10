import { initializeApp } from 'firebase/app';
import { getDatabase, set, ref } from 'firebase/database';
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

// const settings = {
//   timestampsInSnapshots: true,
//   experimentalForceLongPolling: true
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();
const googleProvider = new GoogleAuthProvider();

export { app, auth, db, googleProvider };

const availabelProviders = {
  google: googleProvider
};

export const socialSignIn = async (provider) => {
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

export const phoneSignIn = async (user) => {
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

export const registerWithEmailAndPassword = async ({
  name,
  email,
  password,
  dateOfBirth
}) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      dateOfBirth
    );
    // const usersCollectionRef = collection(db, 'users');
    // const data = await usersCollectionRef.add({
    //   uid: user.uid,
    //   name,
    //   authProvider: 'local',
    //   email,
    //   dateOfBirth
    // });

    // const userData = await (await data.get()).data();

    const userData = set(ref(database, 'users/' + user.uid), {
      email: email,
      password: password,
      dateOfBirth: dateOfBirth,
      authProvider: 'local',
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
