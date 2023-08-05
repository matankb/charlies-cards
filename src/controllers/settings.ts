import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * An enum of the object keys for the various objects stored in async storage.
 * @see AsyncStorage
 */
enum StorageKey {
    /**
     * The active credit card being used for billing during automatic refills.
     */
    CREDIT_CARD = "credit-card",

    /**
     * The upper limit to attempt to refill the card to when refilling. This limit will not be exceeded.
     */
    REFILL_LIMIT = "refill-limit",
}

export interface CreditCard {
  cardNumber: string;
  cardHolder: string;
  expiration: string;
  cvv: string;
}

export async function getCreditCard() {
    return AsyncStorage.getItem(StorageKey.CREDIT_CARD);
}

export async function setCreditCard(card: CreditCard) {
  return AsyncStorage.setItem(StorageKey.CREDIT_CARD, JSON.stringify(card));
}

export async function getRefillLimit() {
    return AsyncStorage.getItem(StorageKey.REFILL_LIMIT);
}

export async function setRefillLimit(limit: number) {
  return AsyncStorage.setItem(StorageKey.REFILL_LIMIT, limit.toString());
}
