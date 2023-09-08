import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCsRP8bLIqejNVFs5vqUB_9GrHoGjLs7mQ',
  authDomain: 'digital-zone-840b8.firebaseapp.com',
  projectId: 'digital-zone-840b8',
  storageBucket: 'digital-zone-840b8.appspot.com',
  messagingSenderId: '96580420561',
  appId: '1:96580420561:web:15e235d2c79b9d08cfd6f0',
  measurementId: 'G-0X5CX8L31F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const googlAuthProvider = new GoogleAuthProvider();
