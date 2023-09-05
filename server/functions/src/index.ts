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
import { sendNotifications } from "./notifications";

// User model in firebase
export interface User {
  id: string;
  username: string;
  password: string;
  card: string;
  threshold: number;
  notificationToken: string;
}

/**
 * Check the given account and notify the user if their card value is under their threshold
 */

// TODO: chunk this, also

async function shouldSendNotification(user: User) {
  const { id, username, password, card, threshold } = user;

  try {
    console.log(`Checking card ${card} for user ${username}`);
    const value = await fetchCardValue(username, password, card);
    console.log(``)
    if (value < threshold) {
      logger.log(`User ${username} is under threshold ${threshold} (value: ${value}). Sending notification to user ${id}`);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    logger.error(`Error checking card ${card} for user ${username}: ${error}`)
  }

  return false;
}

async function filter<T>(arr: T[], callback: (element: T) => Promise<boolean>): Promise<T[]> {
  const fail = Symbol()
  return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail) as T[];
}

// todo: error handling
async function check() {
  const accounts = (await firestore().collection("users").get())
    .docs
    .map(doc => doc.data() as User);

  const accountsToNotify = await filter(accounts, shouldSendNotification);

  sendNotifications(accountsToNotify);
}

export const myFunction = onDocumentUpdated("test/lulm3Y8bxnbGv1umDEXR", () => {
  initializeApp();
  check();
});
