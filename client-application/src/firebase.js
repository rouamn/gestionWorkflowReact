
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAhveY1R1tUnLxohEEzeWc0LTdr_JXXqvk",
  authDomain: "chat-4f2b8.firebaseapp.com",
  projectId: "chat-4f2b8",
  storageBucket: "chat-4f2b8.appspot.com",
  messagingSenderId: "394201142396",
  appId: "1:394201142396:web:338f4a7dfa4f616f7a65f9",
  measurementId: "G-WNKY862HGM"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();

export { firebaseConfig, db, auth };