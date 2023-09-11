import { firestore } from "firebase-admin";

// User model in firebase
export interface User {
  id: string;
  username: string;
  password: string;
  card: string;
  threshold: number;
  notificationToken: string;
}

export async function getUsers() {
  const userCollection = await firestore().collection("users").get();
  const userDocs = userCollection.docs;

  return userDocs.map(doc => doc.data() as User);
}

