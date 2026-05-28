import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpevdSSKbN7t7BYTBTo1_MpPFfaiMoZk4",
  authDomain: "crud-android-5be90.firebaseapp.com",
  projectId: "crud-android-5be90",
  storageBucket: "crud-android-5be90.firebasestorage.app",
  messagingSenderId: "772525835199",
  appId: "1:772525835199:web:7ec8d84b43f9bf7f6d970a",
  measurementId: "G-M093C0CPNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
