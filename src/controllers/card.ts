import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

import { FirebaseTable, app } from './firebase'
import { getAccountId } from './account'

export interface Transaction {
  date: Date
  amount: number
}

export async function getTransactionHistory() {
  const accountId = await getAccountId()

  const db = getFirestore(app)
  const transactionQuery = query(
    collection(db, FirebaseTable.TRANSACTIONS),
    where('accountId', '==', accountId),
  )
  const transactionDocs = await getDocs(transactionQuery)

  const transactions = transactionDocs.docs.map((transaction) => {
    const data = transaction.data()
    return {
      date: data.date.toDate(),
      amount: data.amount,
    }
  })

  return transactions as Transaction[]
}

export async function addTransaction(transaction: Transaction) {
  const accountId = await getAccountId()

  const db = getFirestore(app)
  const transactionsRef = collection(db, FirebaseTable.TRANSACTIONS)
  await setDoc(doc(transactionsRef), {
    ...transaction,
    user: accountId,
  })
}
