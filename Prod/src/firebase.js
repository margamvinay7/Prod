// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/databasimport';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDOJmQqQq6I0ZnzjvPwMld7WLJlhmCNI7g',
  authDomain: 'fir-project-ec62e.firebaseapp.com',
  databaseURL:
    'https://fir-project-ec62e-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'fir-project-ec62e',
  storageBucket: 'fir-project-ec62e.appspot.com',
  messagingSenderId: '200399489055',
  appId: '1:200399489055:web:fc30dbef625af4d510ed2a',
  measurementId: 'G-N6TR456P7X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
export {auth, provider, database};

export default app;
