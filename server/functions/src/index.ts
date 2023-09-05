/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as logger from "firebase-functions/logger";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";
import { firestore, initializeApp } from "firebase-admin";
import { fetchCardValue } from "./mbta-api";

// User model in firebase
interface User {
  id: string;
  email: string;
  password: string;
  card: string;
  threshold: number;
}

/**
 * Check the given account and notify the user if their card value is under their threshold
 */
async function checkAccountValue(user: User) {
  const { id, email, password, card, threshold } = user;

  try {
    const value = await fetchCardValue(email, password, card);
    if (value < threshold) {
      logger.log(`Card ${card} is under threshold ${threshold}. Sending notification to user ${id}`);
    }
  } catch (error) {
    logger.error(`Error checking card ${card} for user ${id}: ${error}`)
  }
}

// todo: error handling
async function check() {
  const accounts = (await firestore().collection("users").get())
    .docs
    .map(doc => doc.data() as User);

  await Promise.all(accounts.map(checkAccountValue));
    
  // const 
  // .get().then((accounts) => {
}
// for all accounts
// get the account
// get the card
// get the current value
// if the updated date is

export const myFunction = onDocumentUpdated("test/lulm3Y8bxnbGv1umDEXR", () => {
  initializeApp();
  check();
});
