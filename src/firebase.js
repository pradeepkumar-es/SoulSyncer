// Importing the functions needed from the SDKs
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import {getFirestore} from "firebase/firestore";

// Website app's Firebase configuration
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

//initializing Cloud Firestore
export const database =getFirestore(app);

//initializing storage in firebase
export const storage  = getStorage(app);