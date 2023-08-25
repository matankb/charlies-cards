import { initializeApp } from 'firebase/app'
import {} from '@env' // loads the module

const firebaseConfig = {
  apiKey: process.env.EXPO_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.EXPO_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)

export enum FirebaseTable {
  TRANSACTIONS = 'transaction-history',
  USERS = 'users',
}
