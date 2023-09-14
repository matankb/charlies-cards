import { initializeApp } from "firebase-admin";
import { onSchedule } from 'firebase-functions/v2/scheduler';
import * as logger from "firebase-functions/logger";

import { fetchCardValue } from "./mbta-api";
import { sendNotifications } from "./notifications";
import { User, getUsers } from "./user";
import { filter } from './utils';

/**
 * Checks if the given account is under their threshold and should be notified
 * @returns true if the account should be notified
 */

async function shouldSendNotification(user: User) {
  const { username, password, card, threshold } = user;

  try {
    logger.log(`Checking card ${card} for user ${username}`);
    const value = await fetchCardValue(username, password, card);
    logger.log(`Card ${card} for user ${username} has value ${value}`);

    if (value < threshold) {
      logger.log(`Sending notification to user ${username}`);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    logger.error(`Error checking card ${card} for user ${username}: ${error}`)
  } finally {
    return false;
  }
}

exports.checkCardValues = onSchedule("every day 19:00", async () => {
  initializeApp();
  const users = await getUsers();
  const accountsToNotify = await filter(users, shouldSendNotification);
  sendNotifications(accountsToNotify);
})

// All functions must be exported from index
export * from './client-api';