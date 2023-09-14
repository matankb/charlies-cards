/**
 * Firebase-related TypeScript definitions
 */

// Table names
export enum FirebaseTable {
  TRANSACTIONS = 'transaction-history',
  USERS = 'users',
}

// User model in firebase
export interface User {
  id: string;
  username: string;
  password: string;
  card: string;
  threshold: number;
  notificationToken: string;
}