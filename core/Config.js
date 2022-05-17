import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDR3T-HKzy2ll98uTgfxcJvrjtfExctHF4",
    authDomain: "tasks-49d65.firebaseapp.com",
    projectId: "tasks-49d65",
    storageBucket: "tasks-49d65.appspot.com",
    messagingSenderId: "1027902450889",
    appId: "1:1027902450889:web:c04413d58abb5a9e9eb118",
    measurementId: "G-BHN4M87ZPB"
  };

export const app = initializeApp(firebaseConfig);

//firestore reference
export const db= getFirestore(app);