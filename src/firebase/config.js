import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCFam9mrTQQ_F_jjwodjUJIMFFIOmTUsLg",
  authDomain: "eshop-e8aca.firebaseapp.com",
  projectId: "eshop-e8aca",
  storageBucket: "eshop-e8aca.appspot.com",
  messagingSenderId: "817197684434",
  appId: "1:817197684434:web:6962e973364f1f837dbf0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app;