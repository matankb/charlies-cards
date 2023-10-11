import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'

/**
 * Requests permission and registers the device for push notifications
 * @returns the notification token
 */
export async function getNotificationToken() {
  // cannot register for push notifications in a simulator
  if (!Device.isDevice) {
    return null
  }

  // request permission to send notifications
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }

  if (finalStatus !== 'granted') {
    return null
  }

  const token = await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId,
  })

  return token.data
}
