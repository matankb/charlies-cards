import { app } from './firebase'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { getNotificationToken } from './notifications'

enum StorageKey {
  /**
   * Internal UUID of the account.
   */
  ACCOUNT_ID = 'account-id',
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
) {
  const notificationToken = await getNotificationToken()
  const id = await getAccountId()

  const db = getFirestore(app)
  const userDoc = doc(db, 'users', id)

  return setDoc(userDoc, {
    id,
    username,
    password,
    card,
    notificationToken,
  })
}
