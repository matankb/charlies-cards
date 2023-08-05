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

/**
 * An interface for a credit card to be used internally by this application.
 */
export interface CreditCard {
  cardNumber: string;
  cardHolder: string;
  expiration: string;
  cvv: string;
}

/**
 * @returns the {@link CreditCard} held in async storage.
 */
export async function getCreditCard() {
    return AsyncStorage.getItem(StorageKey.CREDIT_CARD);
}

/**
 * Handles setting/updating of the credit card being used for charging automatic refills.
 * @param card the new {@link CreditCard} to set in async storage.
 */
export async function setCreditCard(card: CreditCard) {
  return AsyncStorage.setItem(StorageKey.CREDIT_CARD, JSON.stringify(card));
}

/**
 * @returns the refill limit value held in async storage.
 */
export async function getRefillLimit() {
    return AsyncStorage.getItem(StorageKey.REFILL_LIMIT);
}

/**
 * Handles setting/updating of the refill limit value.
 * @param limit the new threshold to store in async storage.
 */
export async function setRefillLimit(limit: number) {
  return AsyncStorage.setItem(StorageKey.REFILL_LIMIT, limit.toString());
}
