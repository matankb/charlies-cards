import { View, Text, Pressable, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { FC, useEffect, useState } from 'react'
import { MoneyDisplay } from '../MoneyDisplay'
import { FontAwesome } from '@expo/vector-icons'
import { RefillPullableDisplay } from './RefillPullableDisplay'
import { PrimaryButton } from '../../PrimaryButton'
import { getRefillTarget } from '../../../controllers/settings'
import { LoadingSpinner } from '../../LoadingSpinner'

interface RefillModalPropsimport {
  handleDismiss: () => void
  handleRefill: (number) => void
  cardName: string
  currentAmount: number
}

const validTransactionAmounts = [5, 10, 20, 25, 50]

export const RefillModal: FC<RefillModalPropsimport> = ({
  handleDismiss,
  handleRefill,
  cardName,
  currentAmount,
}) => {
  const [loading, setLoading] = useState(true)
  const [targetAmount, setTargetAmount] = useState<number>(null)
  const [transactions, setTransactions] = useState<number[]>(null)

  useEffect(() => {
    async function setInitialTarget() {
      const target = Number(await getRefillTarget())
      setTargetAmount(Math.max(target, currentAmount + 10))
    }
    setInitialTarget()
  }, [])

  useEffect(() => {
    async function calculateTransactions() {
      setLoading(true)
      if (!targetAmount) return // stick on loading

      function findNextTransaction(delta: number) {
        return validTransactionAmounts.findLast(
          (a) => targetAmount >= currentAmount + delta + a,
        )
      }

      let delta = 0
      let tempTransactions = []
      while (findNextTransaction(delta)) {
        const next = findNextTransaction(delta)
        delta += next
        tempTransactions = tempTransactions.concat(next)
      }

      setTransactions(tempTransactions)
      setLoading(false)
    }

    calculateTransactions()
  }, [targetAmount])

  const calculatedAddition = () => {
    return transactions.reduce((partialSum, a) => partialSum + a, 0)
  }

  const telegraphedTransactions = () => {
    if (transactions.length === 0) return '$0'
    if (transactions.length === 1)
      return `$${transactions[0]} as one transaction.`
    const out = transactions
      .slice(0, -1)
      .map((x) => '$' + x.toString())
      .join(', ')

    return out + ` and then $${transactions.findLast(() => true)}`
  }

  const handleAdjustTargetAmount = (addedAmount: number) => {
    setTargetAmount(currentAmount + addedAmount)
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.dismissButton} onPress={handleDismiss}>
        <AntDesign name="close" size={16} color="gray" />
      </Pressable>
      <Text style={styles.refillTitle}>Refill {cardName}</Text>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <View className="flex flex-row justify-between align-center pt-5">
            <MoneyDisplay
              amount={currentAmount}
              dollarColor="#B8B8B8"
              shrinkCents
            />
            <FontAwesome
              name="long-arrow-right"
              size={32}
              color="#B8B8B8"
              style={styles.transactionArrow}
            />
            <MoneyDisplay
              amount={currentAmount + calculatedAddition()}
              centColor="black"
              shrinkCents
            />
          </View>
          <RefillPullableDisplay
            currentAmount={currentAmount}
            initialAddedAmount={calculatedAddition()}
            handleUpdatedAmount={handleAdjustTargetAmount}
          />
          <View style={styles.billingSummaryContainer}>
            <Text style={styles.billingSummaryText}>
              You will be billed {telegraphedTransactions()}
            </Text>
            <PrimaryButton
              text={`Pay $${calculatedAddition()}`}
              onSubmit={() => handleRefill(calculatedAddition())}
              buttonColor="#428A4E"
              pressedButtonColor="#336B3C"
              disabledButtonColor="#65B772"
              disabled={calculatedAddition() === 0}
            />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 19,
    paddingHorizontal: 16,
  },
  dismissButton: {
    borderRadius: 50,
    backgroundColor: '#EBEBEB',
    position: 'absolute',
    top: 13,
    right: 13,
    padding: 6,
  },
  refillTitle: { fontFamily: 'LatoSemibold', fontSize: 16 },
  transactionArrow: { paddingHorizontal: 12, paddingVertical: 16 },
  billingSummaryContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  billingSummaryText: {
    fontFamily: 'LatoRegular',
    fontSize: 12,
    color: '#878787',
    alignSelf: 'center',
    paddingBottom: 8,
  },
})
