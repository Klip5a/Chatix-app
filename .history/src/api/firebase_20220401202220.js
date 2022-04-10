import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  // authDomain: 'chat-app-b9fe1.firebaseapp.com',
  projectId: 'chat-app-b9fe1',
  storageBucket: 'chat-app-b9fe1.appspot.com',
  messagingSenderId: '448625377498',
  appId: '1:448625377498:web:566a0d3ce4bf9171c1a5e3',
  measurementId: 'G-X3NTY24X8F',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
