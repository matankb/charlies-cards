import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

import { app } from "./firebase";
import { getAccountId } from "./account";

export interface Transaction {
  date: Date;
  amount: number;
}

export async function getTransactionHistory() {
  const accountId = await getAccountId();

  const db = getFirestore(app);
  const transactionQuery = query(
    collection(db, 'transactions'),
    where('accountId', '==', accountId)
  );
  const transactionDocs = await getDocs(transactionQuery);

  const transactions = transactionDocs.docs.map((transaction) => {
    const data = transaction.data();
    return {
      date: data.date.toDate(),
      amount: data.amount,
    }
  });

  return transactions as Transaction[];
}