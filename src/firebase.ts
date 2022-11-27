import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBpBouqTd9eNq5UTwfWXBUxMk9UDkvQvp8',
  authDomain: 'poudlard-82812.firebaseapp.com',
  databaseURL: 'https://poudlard-82812-default-rtdb.firebaseio.com',
  projectId: 'poudlard-82812',
  storageBucket: 'poudlard-82812.appspot.com',
  messagingSenderId: '381916250243',
  appId: '1:381916250243:web:8bf885b454cf0838935bb6',
  measurementId: 'G-G10WJ3D8BB',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
