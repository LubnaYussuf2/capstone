// import firebase from 'firebase/app';
// import 'firebase/auth';
import { getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  "apiKey": "AIzaSyB2Aw9Jj5D3Iz6vFtZ9T_J5i_Klq_Q8pgM",
  "authDomain": "capstone2024-2c97b.firebaseapp.com",
  "projectId": "capstone2024-2c97b",
  "storageBucket": "capstone2024-2c97b.appspot.com",
  "messagingSenderId": "58571357943",
  "appId": "1:58571357943:web:85f9201bbf7d54a81a5df2",
  "databaseURL": "" 
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services like authentication and Firestore
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app);



