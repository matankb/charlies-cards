/**
 * API for the mobile app
 * Implements basic security by only permitting access to the individual user's data by ID
 * All methods are minimal getters and setters. Sorting or filtering is performed client-side.
 */

import { firestore } from 'firebase-admin'
import { Timestamp } from 'firebase-admin/firestore'
import { onCall } from 'firebase-functions/v2/https'
import { FirebaseTable, User } from './firebase'
import { fetchCardValue } from './mbta-api'

export const getUser = onCall(async (request) => {
  const { id } = request.data

  if (!id) {
    return
  }

  const userReference = firestore().collection(FirebaseTable.USERS).doc(id)
  const user = await userReference.get()
  return user.data()
})

export const setUser = onCall((request) => {
  const { data } = request

  if (!data.id) {
    return
  }

  const users = firestore().collection(FirebaseTable.USERS)
  const user = users.doc(data.id)

  return user.set(data, {
    merge: true,
  })
})

export const getTransactionHistory = onCall(async (request) => {
  const allTransactions = firestore().collection(FirebaseTable.TRANSACTIONS)
  const userTransactions = allTransactions.where(
    'accountId',
    '==',
    request.data.id,
  )
  const userDocs = (await userTransactions.get()).docs
  return userDocs.map((doc) => {
    const data = doc.data()
    return {
      ...data,
      // transform to epoch date backend, because serializing removes .toDate method
      date: data.date.toDate().getTime(),
    }
  })
})

export const addTransaction = onCall((request) => {
  const data = {
    ...request.data,
    // transforms to date manually, because serializing removes Timestamp markers
    date: Timestamp.fromDate(new Date(request.data.date)),
  }
  firestore().collection(FirebaseTable.TRANSACTIONS).add(data)
})

export const getCardValue = onCall(async (request) => {
  const { id } = request.data

  const userReference = firestore().collection(FirebaseTable.USERS).doc(id)
  const user = (await userReference.get()).data() as User
  const { username, password, card } = user

  const value = await fetchCardValue(username, password, card)
  return { value }
})
