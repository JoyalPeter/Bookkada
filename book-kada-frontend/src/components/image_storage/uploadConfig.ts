import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: proccess.env.apiKey,
  authDomain: proccess.env.authDomain,
  projectId: proccess.env.projectId,
  storageBucket: proccess.env.storageBucket,
  messagingSenderId: proccess.env.messagingSenderId,
  appId: proccess.env.appId,
};

const firebaseapp=initializeApp(firebaseConfig);
const storage = getStorage(firebaseapp);
export {storage}