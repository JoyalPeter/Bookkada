import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDbhG4pK9INPMa6fDSJtmJ18Oy67QwNPpE",
  authDomain: "bookkada-756c6.firebaseapp.com",
  projectId: "bookkada-756c6",
  storageBucket: "bookkada-756c6.appspot.com",
  messagingSenderId: "2450616118",
  appId: "1:2450616118:web:b94ba03514ff553a6e4d97",
};

const firebaseapp=initializeApp(firebaseConfig);
const storage = getStorage(firebaseapp);
export {storage}