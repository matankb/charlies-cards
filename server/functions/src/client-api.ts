/**
 * API for the mobile app
 * Implements basic security by only permitting access to the individual user's data by ID
 * All methods are minimal getters and setters. Sorting or filtering is performed client-side.
 * As of Sept. 14, none of these have been tested :))))) they will be before being merged in
 */

import { firestore } from "firebase-admin";
import { onCall } from "firebase-functions/v2/https";
import { FirebaseTable } from "./firebase";

export const getUser = onCall((request) => {
  const id = request.data.id;
  return `User ${id} requested`;
});

export const setUser = onCall((request) => {
  const { data } = request;

  if (!data.id) {
    return;
  }

  const users = firestore().collection(FirebaseTable.USERS);
  const user = users.doc(data.id);

  return user.set(data);
});

export const getTransactionHistory = onCall(async (request) => {
  const allTransactions = firestore().collection(FirebaseTable.TRANSACTIONS);
  const userTransactions = allTransactions.where("accountId", "==", request.data.id);
  const userDocs = (await userTransactions.get()).docs;
  return userDocs.map((doc) => doc.data());
});

export const addTransaction = onCall((request) => {
  return firestore().collection(FirebaseTable.TRANSACTIONS).add(request.data);
});
