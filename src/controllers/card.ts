import { callFirebaseFunction } from './firebase'
import { getAccountId } from './account'

export interface Transaction {
  date: Date
  amount: number
}

export async function getCardValue() {
  const id = await getAccountId()
  const { value } = await callFirebaseFunction('getCardValue', {
    id,
  })

  return value
}

export async function getTransactionHistory() {
  const accountId = await getAccountId()
  const transactionDocs = await callFirebaseFunction('getTransactionHistory', {
    id: accountId,
  })

  const transactions = transactionDocs
    .map((transaction) => {
      return {
        date: new Date(transaction.date),
        amount: transaction.amount,
      }
    })
    .sort((a, b) => b.date - a.date)

  return transactions as Transaction[]
}

export async function addTransaction(amount: number) {
  const accountId = await getAccountId()
  const transaction = {
    accountId,
    date: new Date().getTime(),
    amount: amount,
  }

  return callFirebaseFunction('addTransaction', transaction)
}
