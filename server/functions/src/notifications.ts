import { Expo } from "expo-server-sdk";
import { User } from ".";

const expo = new Expo();

export async function sendNotifications(users: User[]) {
  const pushTokens = users.map((user) => user.notificationToken);

  // Create the messages that you want to send to clients
  let messages = [];
  for (let pushToken of pushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: pushToken,
      body: "you have no money!!!!!",
    });

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];

    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        for (let ticket of ticketChunk) {
          if (ticket.status === "error") {
            console.error(`There was an error sending a notification: ${ticket.details?.error}`);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  // TODO: handle recipets
}
