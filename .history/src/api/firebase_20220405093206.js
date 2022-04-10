// import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// import 'firebase/database';
// import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
// const database = getDatabase();

// export const registerUser = ({ email, password }) => {
//   return firebase
//     .auth()
//     .createUserWithEmailAndPassword(email, password)
//     .then((user) => user)
//     .catch((error) => Promise.reject(error));
// };

export const loginUser = ({ email, password }) => {
  // return firebase
  //   .auth()
  //   .signInWithEmailAndPassword(email, password)
  //   .then((user) => user)
  //   .catch((error) => Promise.reject(error));

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
    });
};

// export const logoutUser = () => {
//   return firebase
//     .auth()
//     .signOut()
//     .then(function () {
//       // Sign-out successful.
//     })
//     .catch((error) => Promise.reject(error));
// };
