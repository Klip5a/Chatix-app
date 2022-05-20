import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { GoogleAuthProvider } from 'firebase/auth';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uid } from 'uid';

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
// const database = getFirestore(app);
export const database = getDatabase(app);
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
// import { getDatabase, ref, set } from "firebase/database";

// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, 'users/' + userId), {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }
export const signUp = async ({ email, password, username, dateOfBirth }) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userData = await set(ref(database, 'operators/' + user.uid), {
      operatopId: user.uid,
      email: email,
      username: username,
      dateOfBirth: dateOfBirth
    });

    return userData;
  } catch (error) {
    throw error.message;
  }
};

export const signIn = async ({ email, password }) => {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data;
  } catch (error) {
    // console.log(error.message)

    throw toast.error('Ошибка почты или пароля', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    // throw errors.message;
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

// export const getAllDialog = () => {
//   try {
//     const starCountRef = ref(database, 'dialogs/');
//     onValue(starCountRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data !== null) {
//         Object.values(data).map((dialogs) => {

//         })
//       }
//     });
//   } catch (error) {
//     throw error.message;
//   }
// };

// const dialogId = uid();
// function writeDialog() {
//   const data = {
//     dialogId: dialogId,
//     status: 'queue',
//     lastActivity: 123,
//     lastMessage: 'qweqweqwe',
//     clientName: 'Гоша',
//     operatorId: 'dLrx3J0UZsTrwoRSY2I6O0NpeTG2',
//     themeOfTheAppeal: 'Авто',
//     subtopic: 'Porshe'
//   };
//   const reference = set(ref(database, 'dialogs/' + `${dialogId}`), data);

//   return reference;
// }
// function writeMessage() {
//   const data = {
//     0: {
//       content: 'Здравствуйте, я столкнулся с проблемой ...',
//       timestamp: '111',
//       writtenBy: 'client'
//     },
//     1: {
//       content: 'Здарова, Георгий. Сейчас вам поможем',
//       timestamp: 124,
//       writtenBy: 'operator'
//     }
//   };
//   const reference = set(ref(database, 'messages/' + `${dialogId}`), data);

//   return reference;
// }
// writeMessage();
// writeDialog();
