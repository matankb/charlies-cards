import AsyncStorage from '@react-native-async-storage/async-storage'

enum StorageKey {
  /**
   * The active credit card being used for billing during automatic refills.
   */
  CREDIT_CARD = 'credit-card',

  /**
   * The targetted upper limit to attempt to refill the card to when refilling. When refilling, the smallest value that will take the
   * Charlie Card over this value will be added. If a card is at $20 with a $40 limit, $25 will be added. The available values to add
   * to a card online are $5, $10, $20, $25, $50.
   */
  REFILL_TARGET = 'refill-target',

  /**
   * The monetary threshold to notify once the card's value goes below.
   */
  REFILL_THRESHOLD = 'refill-threshold',

  /**
   * A boolean value indicating if the user has registered for the app yet.
   */
  IS_REGISTERED = 'is-registered',
}

export interface CreditCardModel {
  cardNumber: string
  cardHolder: string
  expiration: string
  cvv: string
}

export async function getCreditCard() {
  return JSON.parse(await AsyncStorage.getItem(StorageKey.CREDIT_CARD))
}

export async function setCreditCard(card: CreditCardModel) {
  return AsyncStorage.setItem(StorageKey.CREDIT_CARD, JSON.stringify(card))
}

export async function getRefillTarget() {
  return AsyncStorage.getItem(StorageKey.REFILL_TARGET)
}

export async function setRefillTarget(limit: number) {
  return AsyncStorage.setItem(StorageKey.REFILL_TARGET, limit.toString())
}

export async function getRefillThreshold() {
  return AsyncStorage.getItem(StorageKey.REFILL_THRESHOLD)
}

export async function setRefillThreshold(threshold: number) {
  return AsyncStorage.setItem(StorageKey.REFILL_THRESHOLD, threshold.toString())
}

export async function getIsRegistered() {
  const value = await AsyncStorage.getItem(StorageKey.IS_REGISTERED)
  return value || false
}

export async function setIsRegistered(isRegistered: boolean) {
  return AsyncStorage.setItem(StorageKey.IS_REGISTERED, isRegistered.toString())
}

export async function clear() {
  AsyncStorage.clear()
}
