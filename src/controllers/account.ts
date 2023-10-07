import { callFirebaseFunction } from './firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { getNotificationToken } from './notifications'

enum StorageKey {
  /**
   * Internal UUID of the account.
   */
  ACCOUNT_ID = 'account-id',
}

export interface CharlieCard {
  number: string
  name: string
  username: string
  password: string
}

async function createAccountId() {
  const id = uuid.v4().toString()
  await AsyncStorage.setItem(StorageKey.ACCOUNT_ID, id)
  return id
}

export async function getAccountId() {
  const storedId = await AsyncStorage.getItem(StorageKey.ACCOUNT_ID)

  if (storedId) {
    return storedId
  }

  return createAccountId()
}

/**
 * Sets the user's MyCharlie credentials in Firebase, along with the internal account ID
 * and the notificationToken. If the user has not granted permission to send notifications,
 * the notificationToken will be undefined,
 */
export async function setMyCharlieCredentials(
  username: string,
  password: string,
  card: string,
  cardName: string,
) {
  const notificationToken = await getNotificationToken()
  const id = await getAccountId()

  const data = {
    id,
    username,
    password,
    card,
    cardName,
    notificationToken,
  }

  return callFirebaseFunction('setUser', data)
}

export async function getCardInfo() {
  const accountId = await getAccountId()
  const data = await callFirebaseFunction('getUser', { id: accountId })

  const card = {
    number: data.card,
    name: data.cardName,
    username: data.username,
    password: data.password,
  }

  return card as CharlieCard
}

/**
 * The refill threshold is stored on the backend, since the backend
 * needs it to calculate if a notification should be sent
 */
export async function getRefillThreshold() {
  const accountId = await getAccountId()
  const data = await callFirebaseFunction('getUser', { id: accountId })

  return data.threshold
}

export async function setRefillThreshold(threshold: number) {
  const accountId = await getAccountId()

  const data = {
    id: accountId,
    threshold,
  }

  return callFirebaseFunction('setUser', data)
}
