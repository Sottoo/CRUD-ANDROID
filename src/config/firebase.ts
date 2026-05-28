import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/**
 * ============================================
 *  🔥 FIREBASE CONFIGURATION — StudioKino
 * ============================================
 * 
 *  INSTRUCCIONES:
 *  1. Ve a Firebase Console → tu proyecto → ⚙️ Project Settings
 *  2. Baja a "Your apps" → selecciona tu app web
 *  3. Copia los valores de firebaseConfig y pégalos abajo
 *  4. Guarda el archivo
 * 
 * ============================================
 */

const firebaseConfig = {
  apiKey: "PEGA_TU_API_KEY_AQUI",
  authDomain: "PEGA_TU_AUTH_DOMAIN_AQUI",
  projectId: "PEGA_TU_PROJECT_ID_AQUI",
  storageBucket: "PEGA_TU_STORAGE_BUCKET_AQUI",
  messagingSenderId: "PEGA_TU_MESSAGING_SENDER_ID_AQUI",
  appId: "PEGA_TU_APP_ID_AQUI",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
