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
}

export interface CreditCard {
  cardNumber: string
  cardHolder: string
  expiration: string
  cvv: string
}

export async function getCreditCard() {
  return AsyncStorage.getItem(StorageKey.CREDIT_CARD)
}

export async function setCreditCard(card: CreditCard) {
  return AsyncStorage.setItem(StorageKey.CREDIT_CARD, JSON.stringify(card))
}

export async function getRefillLimit() {
  return AsyncStorage.getItem(StorageKey.REFILL_TARGET)
}

export async function setRefillLimit(limit: number) {
  return AsyncStorage.setItem(StorageKey.REFILL_TARGET, limit.toString())
}
