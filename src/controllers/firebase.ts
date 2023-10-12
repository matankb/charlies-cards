import { initializeApp } from 'firebase/app'
import { getFunctions, httpsCallable } from 'firebase/functions'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)

export enum FirebaseTable {
  TRANSACTIONS = 'transaction-history',
  USERS = 'users',
}

export async function callFirebaseFunction<T>(
  name: string,
  data?: T,
): Promise<T> {
  const functions = getFunctions()
  const firebaseFunction = httpsCallable(functions, name)
  const response = await firebaseFunction(data)

  return response.data as T
}
