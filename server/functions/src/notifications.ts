import * as logger from "firebase-functions/logger";
import { Expo } from "expo-server-sdk";

import { User } from "./user";

const expo = new Expo();

export async function sendNotifications(users: User[]) {
  const pushTokens = users.map(user => user.notificationToken);

  const messages = [];

  for (const pushToken of pushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      logger.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      body: "Your MBTA card is running low",
    });
  }

  // Expo allows batching notifications
  const chunks = expo.chunkPushNotifications(messages);

  for (const chunk of chunks) {
    try {
      // Send the chunks sequentially, instead of in parallel, to avoid rate limiting
      const notificationResponses = await expo.sendPushNotificationsAsync(
        chunk
      );

      for (const response of notificationResponses) {
        if (response.status === "error") {
          logger.error(
            `There was an error sending a notification: ${response.details?.error}`
          );
        }
      }
    } catch (error) {
      logger.error(error);
    }
  }
}
