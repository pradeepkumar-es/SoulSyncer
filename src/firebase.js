// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD39vIw96OEoixW1tUHMVH28HAZYv3ID4A",
  authDomain: "govt-doc-vault-84578.firebaseapp.com",
  projectId: "govt-doc-vault-84578",
  storageBucket: "govt-doc-vault-84578.appspot.com",
  messagingSenderId: "215663177313",
  appId: "1:215663177313:web:ca5a77e86cbf4226bbc420"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database =getFirestore(app);
export const storage  = getStorage(app);