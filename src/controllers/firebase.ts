import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.EXPO_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.EXPO_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)
